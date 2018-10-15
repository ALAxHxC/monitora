const mycrypto=require('../security/apiUtils');

async function decryptInternalPatient(user){
    user.firstNames = await mycrypto.decryptInternal(user.firstNames);
    user.lastNames = await mycrypto.decryptInternal(user.lastNames);
    user.document.identification=await mycrypto.decryptInternal(user.document.identification);
    user.document.type=await mycrypto.decryptInternal(user.document.type);
    return 	user;
}

async function decryptInternalUser(user){
    user.username = await mycrypto.decryptInternal(user.username);
    user.password = await mycrypto.decryptInternal(user.password);
    return 	user;
}
async function encryptUpdateInternalUser(user){
    user.firstNames = await mycrypto.encryptInternal(user.firstNames);
    user.lastNames = await mycrypto.encryptInternal(user.lastNames);
    return 	user;
}
async function encryptInternalUser(user){
    user.firstNames = await mycrypto.encryptInternal(user.firstNames);
    user.lastNames = await mycrypto.encryptInternal(user.lastNames);
    user.document.identification=await mycrypto.encryptInternal(user.document.identification);
    user.document.type=await mycrypto.encryptInternal(user.document.type);
    return 	user;
}
async function encryptItem(data){
    let new_data = await mycrypto.encryptInternal(data);
    return new_data;
}
module.exports ={
    decryptInternalPatient,
    encryptInternalUser,
    encryptUpdateInternalUser,
    encryptItem,
    decryptInternalUser
}