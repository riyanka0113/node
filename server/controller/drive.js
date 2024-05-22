const { google } = require('googleapis');
const express = require('express');
const userModel = require('../model/user.model');

const router = express.Router();

// Google OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
    "72165529139-lnjl4g81uqqqfadflk39ifa0v8pj04ko.apps.googleusercontent.com",
    "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",
    "http://localhost:5000/auth/google/callback"
);

router.get('/auth/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive.readonly'],
    });
    res.redirect(url);
});

// callback function
router.get('/auth/google/callback', async (req, res) => {
    try {
        const { code } = req.query;

        // get token
        const { tokens } = await oauth2Client.getToken(code);
    
        oauth2Client.setCredentials(tokens);
    
        // get user profile info
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });
    
        const userInfo = await oauth2.userinfo.get();
    
        const { id, email, name, picture } = userInfo.data;

        // Upadte the user and token in the database
        const user = await userModel.findOneAndUpdate({ googleId: id },
            { googleId: id, email, name, picture, token: tokens },
            { upsert: true, new: true }
        );

        res.redirect(`http://localhost:3000/dashboard/${user._id}`); 
    } catch (error) {
        console.log(error.response,"err call");
        res.status(500).json(error)
    }
    
});

router.post('/revoke', async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user) {
            await oauth2Client.revokeToken(user.token.token.access_token);
            await userModel.deleteOne({ _id: user._id});
            res.send('Access revoked');
        } else {
            res.send('No token found');
        }
    } catch (error) {
        res.status(500).json(error)
    }

});

router.get('/analytics/:id', async (req, res) => {
    const {id} = req.params;

    const user = await userModel.findById(id);

    if (!user.token) {
        res.status(400).send('No token found');
        return;
    }

    oauth2Client.setCredentials(user.token);

    try {
        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        const response = await drive.files.list({
            pageSize: 1000,
            fields: 'files( name, mimeType, size, owners, permissions, shared, webViewLink)',
        });

        const files = response.data.files;
        const fileTypes = {};
        let totalSize = 0;
        let publicFilesCount = 0;
        let peopleCount = 0;
        let sharedFilesCount = 0;

        files.forEach(file => {
            const type = file.mimeType.split('/')[0];
            fileTypes[type] = (fileTypes[type] || 0) + 1;
            totalSize += parseInt(file.size || 0);

            // Count files publicly accesible
            const publicPermissions = file.permissions?.filter(permission => permission.type === 'anyone');
            if (publicPermissions?.length > 0) {
                publicFilesCount++;
            }

            // Count people who have access to the files
            peopleCount += file.permissions?.filter(permission => permission.type === 'user').length || 0;

            // Count files shared directly with other people
            if (file.permissions?.length > 1) {
                sharedFilesCount++;
            }
        });

        res.json({
            totalFiles: files.length,
            totalSize,
            fileTypes,
            files,
            publicFilesCount,
            peopleCount,
            sharedFilesCount,
        });
    } catch (error) {
        console.log(error, "err an");
        res.status(500).send(error.message);
    }
});

module.exports = router;