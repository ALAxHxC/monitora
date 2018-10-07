const mycrypto=require('../security/apiUtils');

async function decryptInternalPatient(user){
    user.firstNames = await mycrypto.decryptInternal(user.firstNames);
    user.lastNames = await mycrypto.decryptInternal(user.lastNames);
    user.document.identification=await mycrypto.decryptInternal(user.document.identification);
    user.document.type=await mycrypto.decryptInternal(user.document.type);
    return 	user;
}
module.exports ={
    decryptInternalPatient
}