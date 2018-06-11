var crypto2 = require('crypto2');

const password_external=process.env.SECRET || "e4b749e81288302501f897996a364797";
const iv_external=process.env.IVI || "ed82a7c7b7a202dc";
const iv_internal=process.env.IVE ||  "547375022f58e14e";
const password_internal=process.env.SECRET || "54487333233e1b2b0f76f437d70b60cc";

///Encriptation In
module.exports.encryptInternal = async function(text)
{
	let encrypt = await crypto2.encrypt(text,password_internal,iv_internal);
	return encrypt;
}

module.exports.decryptInternal = async function(text)
{
	let decrypt = await crypto2.decrypt(text,password_internal,iv_internal);
	return decrypt;
}



///Encriptation out
module.exports.encryptExternal = async function(text)
{
	let encrypt = await crypto2.encrypt(text,password_external,iv_external);
	return encrypt;
}

module.exports.decryptExternal = async function(text)
{
	let decrypt = await crypto2.decrypt(text,password_external,iv_external);
	return decrypt;
}

async function test()
{
	// Create a password from a secret key.
	 // const password = await crypto2.createPassword('secret');

	  // Create a one-time valid initialization vector.
	  //const iv =await crypto2.createIv('secret');

	  // Encrypt your plain text, in this case 'the native web'.
	 // const encrypted = await crypto2.encrypt("elianadreanniñopedrazza",password_external,iv_external);
	  //await crypto2.encrypt('the native web', password_internal, iv_internal);
	const descryo = await crypto2.decrypt("ae14c248d995d325bbfe64daa16dd85a",password_external,iv_external);
	const descryo2 = await crypto2.decrypt("9999b778bfaf1d24c7c5a444c647fddb",password_external,iv_external);

	//await crypto2.decrypt(encrypted, password_internal, iv_internal);
	 // console.log(`Password: ${password}`);
	//  console.log(`Iv: ${iv}`);
	 	console.log(`Encrypted: ${descryo2}`);
	   	console.log(`Encrypted: ${descryo}`);	
}
test();
