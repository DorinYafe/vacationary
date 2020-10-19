const usersLogic = require('../logic/usersLogic');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret, } = require('../keys/app-keys');
const map = require('../middleware/map');

router.post('/login', async (req, res) => {
    try {
        let user = req.body;
        let token = jwt.sign({ sub: user }, secret);
        let loginResult = await usersLogic.login(user);
        let loginResponse = {
            token: token,
            type: loginResult.type,
        };
        res.json(loginResponse);
        map.saveUserInfo(token, loginResult);
    }
    catch (e) {
        res.status(500).send(e);
    };
});

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        await usersLogic.addUser(user);
        res.send('Rgistered Successfuly!');
    }
    catch (e) {
        res.status(500).send(e);
    };
});

module.exports = router;