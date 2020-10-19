const vacationsDao = require('../dao/vacationsDao');
const { isVacationFollowedByUser, isFollowersAmountValid, } = require('../utils/validations');

async function getAllVacations() {
    const vacations = await vacationsDao.getAllVacations();
    // console.log(vacations);
    return vacations;
};
// getAllVacations();

module.exports = {
    getAllVacations,
};