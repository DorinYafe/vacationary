const vacationsDao = require('../dao/vacationsDao');
const { isVacationFollowedByUser, isFollowersAmountValid, } = require('../utils/validations');

async function getAllVacations() {
    const vacations = await vacationsDao.getAllVacations();
    // console.log(vacations);
    return vacations;
};
// getAllVacations();

async function addVacation(vacation) {
    await vacationsDao.addVacation(vacation);
};
// addVacation({destination: 'USA', description: 'Dreamy vacation in the USA', image: 'aaa', startDate: '2021-09-01', endDate: '2021-10-01', price: 30000});

module.exports = {
    getAllVacations,
    addVacation,
};