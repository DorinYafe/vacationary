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

async function updateVacation(vacation) {
    const updatedV = await vacationsDao.updateVacation(vacation);
    // console.log(updatedV);
    return updatedV;
};
// updateVacation(
//     {
//         description: 'Dreamy vacation in Vietnam',
//         image: 'image',
//         startDate: '2020-12-1',
//         endDate: '2020-12-27',
//         price: '10000',
//         id: 49
//     }
// );

async function addVacationToFV(userID, vacationID) {
    const isFollowed = await isVacationFollowedByUser(userID, vacationID);
    if (!isFollowed) {
        const favoriteV = await vacationsDao.addVacationToFV(userID, vacationID);
        // console.log(favoriteV);
        return favoriteV;
    };
};
// addVacationToFV(44, 48);

async function removeVacationFromFV(userID, vacationID) {
    const followersAmount = await isFollowersAmountValid(vacationID);
    const isFollowed = await isVacationFollowedByUser(userID, vacationID);
    if (followersAmount && isFollowed) {
        const unfavoriteV = await vacationsDao.removeVacationFromFV(userID, vacationID);
        // console.log(unfavoriteV);
        return unfavoriteV;
    };
};
// removeVacationFromFV(44, 34);

async function deleteVacation(vacationID) {
    await vacationsDao.deleteVacation(vacationID);
};
// deleteVacation(4);

async function getUserFavoriesVacations(userID) {
    const userFavoritesVacations = await vacationsDao.getUserFavoriesVacations(userID);
    // console.log(userFavoritesVacations);
    return userFavoritesVacations;
};
// getUserFavoriesVacations(44);

module.exports = {
    getAllVacations,
    addVacation,
    updateVacation,
    addVacationToFV,
    removeVacationFromFV,
    deleteVacation,
    getUserFavoriesVacations,
};