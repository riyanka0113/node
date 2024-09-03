const express = reuire("express");
const User = require("../model/user");
const router = new express.Router();

router.post("/users", async(req,res) => {
    const user = new User(req.body);

    try{
        await user.save();
        return res.status(201);
    }catch(e){
        return res.status(400);
    }
})