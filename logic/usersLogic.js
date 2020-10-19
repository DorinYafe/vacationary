const usersDao = require('../dao/usersDao');
const { isExists, } = require('../utils/validations');
const crypto = require('crypto');

async function login(user) {
    const hashedPassword = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = hashedPassword;
    const loginResult = await usersDao.login(user);
    // console.log(loginResult);
    return loginResult;
};
// login({ username: 'mickeyyafe', password: '1111' });

async function addUser(user) {
    await isExists(user.username);
    const hashedPassword = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = hashedPassword;
    const newUser = await usersDao.addUser(user);
    // console.log(newUser);
    return newUser;
};
// addUser({firstName: 'Mickey', lastName: 'Yafe', username: 'mickeyafe', password: '1234'});

module.exports = {
    login,
    addUser,
};