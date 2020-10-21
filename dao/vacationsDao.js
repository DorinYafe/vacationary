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

module.exports = {
    getAllVacations,
    addVacation,
    updateVacation,
};