const connection = require('./connection-wrapper');

async function getAllVacations() {
    const sql = `select * from vacations`;
    const vacations = await connection.execute(sql);
    // console.log(vacations);
    return vacations;
};
// getAllVacations();

async function addVacation(vacation) {
    const sql = `insert into vacations (destination, description, image, startDate, endDate, price) values (?, ?, ?, ?, ?, ?)`;
    const params = [vacation.destination, vacation.description, vacation.image, vacation.startDate, vacation.endDate, vacation.price];
    const newVacation = await connection.executeWithParams(sql, params);
    // console.log(newVacation);
    return newVacation;
};
// addVacation({destination: 'Rome', description: 'x', image: 'aaa', startDate: '2021-12-08', endDate: '2022-12-08', price: 12});

async function updateVacation(vacation) {
    const sql = `update vacations set description = ?, image = ?, startDate = ?, endDate = ?, price = ? where id = ?`;
    const params = [
        vacation.description,
        vacation.image,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.id
    ];
    const updatedV = await connection.executeWithParams(sql, params);
    // console.log(updatedV);
    return updatedV;
};
// updateVacation(
//     {
//         description: 'Dreamy vacation in Vietnam',
//         image: 'image',
//         startDate: '2020-12-1',
//         endDate: '2020-12-27',
//         price: '30000',
//         id: 49
//     }
// );

async function addVacationToFV(userID, vacationID) {
    const sql = `insert into followed_vacations (userID, vacationID) values (?, ?)`;
    const params = [userID, vacationID];
    await connection.executeWithParams(sql, params);
    await updateFollowedVacation(vacationID);
    const v = await getVacationByID(vacationID);
    // console.log(v);
    return v;
};
// addVacationToFV(44, 44);

async function updateFollowedVacation(vacationID) {
    const sql = `update vacations set followersAmount = followersAmount+1 where id = ?`;
    const params = [vacationID];
    const updatedFV = await connection.executeWithParams(sql, params);
    // console.log(updatedFV);
    return updatedFV;
};
// updateFollowedVacation(2);

async function getVacationByID(vacationID) {
    const sql = `select * from vacations where id = ?`;
    const params = [vacationID];
    const vacation = await connection.executeWithParams(sql, params);
    // console.log(vacation[0]);
    return vacation[0];
};
// getVacationByID(2);

async function removeVacationFromFV(userID, vacationID) {
    const sql = `delete from followed_vacations where userID = ? and vacationID = ?`;
    const params = [userID, vacationID];
    await connection.executeWithParams(sql, params);
    await updateUnfolloedVacation(vacationID);
    const v = await getVacationByID(vacationID);
    // console.log(v);
    return v;
};
// removeVacationFromFV(44, 33);

async function updateUnfolloedVacation(vacationID) {
    const sql = `update vacations set followersAmount = followersAmount-1 where id = ?`;
    const params = [vacationID];
    const updatedFV = await connection.executeWithParams(sql, params);
    // console.log(updatedFV);
    return updatedFV;
};
// updateUnfolloedVacation(2);

async function getVacationFollowersAmount(vacationID) {
    const sql = `select followersAmount from vacations where id = ?`;
    const params = [vacationID];
    const followersAmount = await connection.executeWithParams(sql, params);
    // console.log(followersAmount[0].followersAmount);
    return followersAmount[0].followersAmount;
};
// getVacationFollowersAmount(2);

async function getFollowedVacation(userID, vacationID) {
    const sql = `select * from followed_vacations where userID = ? and vacationID = ?`;
    const params = [userID, vacationID];
    const followedVacation = await connection.executeWithParams(sql, params);
    // console.log(followedVacation);
    return followedVacation[0];
};
// getFollowedVacation(44, 2);

async function deleteFavoriteVacation(vacationID) {
    const sql = `delete from followed_vacations where vacationID = ?`;
    const params = [vacationID];
    await connection.executeWithParams(sql, params);
};

async function deleteVacation(vacationID) {
    await deleteFavoriteVacation(vacationID);
    const sql = `delete from vacations where id = ?`;
    const params = [vacationID];
    await connection.executeWithParams(sql, params);
    // const deletedV = await connection.executeWithParams(sql, params);
    // console.log(deletedV);
};
// deleteVacation(5);

async function getUserFavoriesVacations(userID) {
    const sql = `select V.id as id, V.destination as destination, V.description as description, V.image as image, 
    V.startDate as startDate, V.endDate as endDate, V.price as price, V.followersAmount as followersAmount   
    from vacations V left join followed_vacations FV 
    on V.id = FV.vacationID and FV.userID = 44 
    order by FV.userID desc`;
    const params = [userID];
    const userFavoritesVacations = await connection.executeWithParams(sql, params);
    // console.log(userFavoritesVacations);
    return userFavoritesVacations;
};
// getUserFavoriesVacations(43);

module.exports = {
    getAllVacations,
    addVacation,
    updateVacation,
    addVacationToFV,
    removeVacationFromFV,
    getVacationFollowersAmount,
    getFollowedVacation,
    deleteVacation,
    getUserFavoriesVacations,
};