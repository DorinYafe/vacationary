const express = require('express');
const router = express.Router();
const vacationsLogic = require('../logic/vacationsLogic');
const map = require('../middleware/map');
const fs = require('fs');
const uuid = require('uuid');

router.get('/', async (req, res) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        res.send(vacations);
    }
    catch (e) {
        res.status(500).send(e);
    };
});

module.exports = router;