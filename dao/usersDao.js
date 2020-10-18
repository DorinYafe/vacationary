const connection = require('./connection-wrapper');

async function login(user) {
    const sql = `select * from users where username = ? and password = ?`;
    const params = [user.username, user.password];
    const loginResult = await connection.executeWithParams(sql, params);
    if (loginResult.length === 0) {
        return;
    };
    // console.log(loginResult[0]);
    return loginResult[0];
};
// login({username: 'dorinyafe', password: '1234'});


async function addUser(user) {
    const sql = `insert into users (firstName, lastName, username, password) values (?, ?, ?, ?)`;
    const params = [user.firstName, user.lastName, user.username, user.password];
    const newUser = await connection.executeWithParams(sql, params);
    // console.log(newUser);
    return newUser;
};
// addUser({firstName: 'Jen', lastName: 'Yafe', username: 'jenyafe', password: '1234'});

async function getUsername(username) {
    const sql = `select username from users where username = ?`;
    const params = [username];
    username = await connection.executeWithParams(sql, params);
    // console.log(username[0].username);
    return username;
};
// getUsername('dorinyafe');

module.exports = {
    login,
    addUser,
    getUsername,
};