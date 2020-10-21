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

router.post('/add-vacation', async (req, res) => {
    try {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        };
        const vacation = req.body;
        const image = req.files.image;
        const extension = image.name.substring(image.name.lastIndexOf('.'), image.length);
        const newUuid = uuid.v4();
        // const imgName = newUuid + extension;
        image.mv(`./uploads/${newUuid}${extension}`);
        vacation.image = newUuid + extension;
        await vacationsLogic.addVacation(vacation);
        const vacations = await vacationsLogic.getAllVacations();
        global.socketServer.sockets.emit('add-vacation', vacations);
        res.status(201).send(vacations);
    }
    catch (e) {
        res.status(500).send(e);
    };
});

router.put('/update-vacation/:id', async (req, res) => {
    try {
        const vacation = req.body;
        const image = req.files.image;
        const extension = image.name.substring(image.name.lastIndexOf('.'), image.length);
        const newUuid = uuid.v4();
        vacation.id = +req.params.id;
        image.mv(`./uploads/${newUuid}${extension}`);
        vacation.image = newUuid + extension;
        // console.log(vacation);
        const updatedV = await vacationsLogic.updateVacation(vacation);
        // console.log(updatedV);
        res.status(210).send(updatedV);
    }
    catch (e) {
        res.status(500).send(e.message);
    };
});

module.exports = router;