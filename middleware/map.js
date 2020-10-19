let mapArray = new Array()

//incharge of adding object to the array
function saveUserInfo(token, succesfolLoginDetails) {
    // console.log('hi')
    // console.log(succesfolLoginDetails)
    let userInformatiom = {
        key: token,
        value: succesfolLoginDetails
    };
    mapArray.push(userInformatiom);
    // console.log(mapArray)
    return mapArray;
};

//serching the map array for the token and getting the user id
function checkMapForUserId(token) {
    // console.log(token)
    let userId;
    for (let index = 0; index < mapArray.length; index++) {
        if (token == "Bearer" + " " + mapArray[index].key) {
            userId = mapArray[index].value.id;
        };
    };
    // console.log(userId)
    return userId;
};

//serching the map array for the token and getting the user information
function getUserInfo(token) {
    let userInfo;
    for (let index = 0; index < mapArray.length; index++) {
        if (token == "Bearer" + " " + mapArray[index].key) {
            userInfo = mapArray[index].value;
        };
    };
    return userInfo;
};

module.exports = {
    saveUserInfo,
    checkMapForUserId,
    getUserInfo,
};