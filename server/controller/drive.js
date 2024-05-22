const { google } = require('googleapis');
const express = require('express');
const userModel = require('../model/user.model');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Google OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
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

        const url = `${process.env.CLIENT_URL}/dashboard/${user._id}`
        res.redirect(url); 
    } catch (error) {
        res.status(500).json(error)
    }
    
});

router.post('/revoke', async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user) {
            await oauth2Client.revokeToken(user.token.access_token);
            await userModel.deleteOne({ _id: user._id});
            res.status(200).json({success:true, data:{message:'Access revoked'}});
        } else {
            res.status(400).json({ success: false, data:{message: 'No token found'} });
        }
    } catch (error) {
        res.status(500).json({success:false, data:error.message})
    }

});

router.get('/analytics/:id', async (req, res) => {
    const {id} = req.params;

    const user = await userModel.findById(id);

    if (!user.token) {
        return res.status(400).send({success:false,data:{message:'No token found'}});
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
        const uniquePeople = new Set();

        files.forEach(file => {
            const type = file.mimeType.split('/')[0];
            fileTypes[type] = (fileTypes[type] || 0) + 1;
            totalSize += parseInt(file.size || 0);

            file.permissions?.forEach(permission => {
                if (permission.type === 'user' && permission.emailAddress) {
                    uniquePeople.add(permission.emailAddress);
                }
            });
        });

        res.status(200).json({
            success: true,
            data: {
                totalSize,
                fileTypes,
                files,
                peopleCount: uniquePeople.size
            } 
        });
    } catch (error) {
        res.status(500).json({success:false, data:error.message})
    }
});

module.exports = router;