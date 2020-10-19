const connection = require('./connection-wrapper');

async function getAllVacations() {
    const sql = `select * from vacations`;
    const vacations = await connection.execute(sql);
    // console.log(vacations);
    return vacations;
};
// getAllVacations();

module.exports = {
    getAllVacations,
};