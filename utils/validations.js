const usersDao = require('../dao/usersDao');
const vacationsDao = require('../dao/vacationsDao');

async function isExists(username) {
    username = await usersDao.getUsername(username);
    if (username.length !== 0) {
        throw new Error('Username already exists!');
    };
    return;
};

async function isFollowersAmountValid(vacationID) {
    const followersAmount = await vacationsDao.getVacationFollowersAmount(vacationID);
    if (followersAmount <= 0) {
        // console.log(false);
        return false;
    };
    // console.log(true);
    return true;
};
// isFollowersAmountValid(4);

async function isVacationFollowedByUser(userID, vacationID) {
    const followedVacation = await vacationsDao.getFollowedVacation(userID, vacationID);
    if (followedVacation) {
        // console.log(true);
        return true;
    };
    // console.log(false);
    return false;
};
// isVacationFollowedByUser(44, 2);

module.exports = {
    isExists,
    isFollowersAmountValid,
    isVacationFollowedByUser,
};