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

router.post('/make-favorite', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userID = map.checkMapForUserId(token);
        let vacation = req.body;
        let vacationID = vacation.id;
        const favoriteV = await vacationsLogic.addVacationToFV(userID, vacationID);
        // global.socketServer.sockets.emit('make-fv', favoriteV);
        res.send(favoriteV);
    }
    catch (e) {
        res.status(500).send(e);
    };
});

router.delete('/remove-vacation-from-fv/:id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userID = map.checkMapForUserId(token);
        const vacationID = +req.params.id;
        const unfaforiteV = await vacationsLogic.removeVacationFromFV(userID, vacationID);
        res.send(unfaforiteV);
    }
    catch (e) {
        res.status(500).send(e);
    };
});

router.delete('/:id', async (req, res) => {
    try {
        req.files = req.body;
        const image = req.files;
        const vacationID = +req.params.id;
        await vacationsLogic.deleteVacation(vacationID);
        fs.unlinkSync(`./uploads/${image.image}`);
        res.send('Vacation deleted successfuly!');
    }
    catch (e) {
        res.status(500).send(e);
    };
});

router.get('/user-favorites-vacations', async (req, res) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        const userID = map.checkMapForUserId(token);
        console.log(userID);
        const userFavoritesVacations = await vacationsLogic.getUserFavoriesVacations(userID);
        // console.log(userFavoritesVacations);
        res.status(200).send(userFavoritesVacations);
    }
    catch (e) {
        res.status(500).send(e.message);
    };
});

module.exports = router;