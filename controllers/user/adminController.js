var AdminEntity=require('mongoose').model('Admin');
const UserAdmin=require('../../database/user/UserAdminCollection.js');
var adminController=new UserAdmin(AdminEntity);
exports.createAdmin=async function(user)
{
	try{
	let admin=generateAdmin(user);
	console.log(admin);
	let new_admin=await adminController.create(admin);
	console.log("Termino de crear");
	return new_admin;
}catch(err)
	{
		throw(err);
	}
}
function generateAdmin(user){
	let admin={
	 
	 	firstNames: user.userData.firstNames,
	 	lastNames: user.userData.lastNames,
	 	document:
	 	{
	 		identification:user.userData.document.identification,
	 		type: user.userData.document.type,
	 	},
	 	sesion: false
 	};
return admin;
}