var userEntity=require('mongoose').model('User');
var User=require('../../database/user/UserCollection');
//var adminController=require('mongoose').model('admin');
//var medicController=require('mongoose').model('medic');
var medicController=require('./medicController');
var patientController=require('./patientController');
var adminController=require('./adminController')
var userTypeController=require('./userTypeController');
var errors=require('../../model/alert/errorMessagesAPI');
var mycrypto=require('../../security/apiUtils');
var session=require('../../security/apiController');
let userController=new User(userEntity);

module.exports.getUsers= async function(req,res)
{
	try
	{
		let users=await userController.find();
		let array=new Array();
		//res.status(200).json(users);
		for (let value of users) 
		{
			let newUser=await transformUserInternalExternal(value);
			array.push(newUser);
  		//	console.log(value);
        }
       	res.status(200).json(array);
	}
	catch(err)
	{
		res.status(400).json({error: errors.noUserGet,cause: err.message});
	}
}

module.exports.getAdmins=async function(req,res)
{   try
	{
		let users=await userController.findUsersByType(userTypeController.entitys().admin,"admins");
		let array=new Array();
		//res.status(200).json(users);
		for (let value of users) 
		{
			let newUser=await transformUserInternalExternal(value);
			array.push(newUser);
  		//	console.log(value);
        }
       res.status(200).json(array);
	}
	catch(err)
	{
		console.log(err.message);
		res.status(400).json({error: errors.noUserGet,cause: err.message});
	}
}

module.exports.getMedics=async function(req,res)
{
	 try
	{
		let users=await userController.findUsersByType(userTypeController.entitys().medic,"medics");
		let array=new Array();
		console.log(users);
		//res.status(200).json(users);
		for (let value of users) 
		{	
			console.log(value.userData);
			let newUser=await transformUserInternalExternal(value);
			array.push(newUser);
  		//	console.log(value);
        }
       res.status(200).json(users);
	}
	catch(err)
	{
		console.log(err.message);
		res.status(400).json({error: errors.noUserGet,cause: err.message});
	}
}

module.exports.getPatients=async function(req,res)
{
	try
	{
		let users=await userController.findUsersByType(userTypeController.entitys().patient,"patients");
		let array=new Array();
		//res.status(200).json(users);
		for (let value of users) 
		{
			let newUser=await transformUserInternalExternal(value);
			array.push(newUser);
  		//	console.log(value);
        }
       res.status(200).json(array);
	}
	catch(err)
	{
		console.log(err.message);
		res.status(400).json({error: errors.noUserGet,cause: err.message});
	}
}

module.exports.getUserById= async function(req,res)
{
	userController.findById(req.params.id).then
	(
		async (entity)=>
		{
			let username=await mycrypto.decryptInternal(entity.username);
			let password=await mycrypto.decryptInternal(entity.password);
			console.log(username,password);
			entity.username=await mycrypto.encryptExternal(username);
			entity.password=await mycrypto.encryptExternal(password);
			res.status(201).json(entity);
		}
	).catch(onRejected =>{res.status(400).json(onRejected);});
}

module.exports.updateMedic= async function(req,res)
{
	res.json({status:200,estado:"Estado"});
   // medicController.updateMedic(req,res);
}

module.exports.updateFirebase= async function(req,res)
{
	try{
	let updated=await userController.updateFirebaseId(req.params.id,req.params.fb);
	res.status(201).json(updated);
}catch(err){
		res.status(400).json({error: errors.noFirebaseIdUpdate,cause: err.message});

}
}

//create user admin
module.exports.createUserAdmin= async function(req,res)
{
	try{
 const username= await mycrypto.encryptExternal(req.body.username);
 const password= await mycrypto.encryptExternal(req.body.password);	
 var user=await getUser(req,res);
 	if(user)
	{
		//res.json({us:us,pass:pass});
	 	let admin= await adminController.createAdmin(user);
	 	console.log("Admin");
	 	user.userDetails=admin._id;
	 	user.userTypeDescription=userTypeController.entitys().admin;
	 	
	 	createUser(req,res,user,username,password);
	 	return;
	 }
	}catch(err){
		console.log(err.stack);
 	res.status(400).send({error: errors.noUserCreate,cause: err.message});
 }
}

//crea usuario medico
module.exports.createUserMedic= async function(req,res){
	try{
 const username= await mycrypto.encryptExternal(req.body.username);
 const password= await mycrypto.encryptExternal(req.body.password);	

 var user=await getUser(req,res);
	 if(user)
	 {
	   	let medic=await medicController.createMedic(user);
	 	user.userDetails=medic._id;
	 	user.userTypeDescription=userTypeController.entitys().medic;
	 	//res.json({user: user});
	 	createUser(req,res,user,username,password);
	 	return;
	 }
 	res.status(400).send({error: errors.noUserCreate,cause: err.message});
 }catch(err){
		console.log(err.stack);
 	res.status(400).send({error: errors.noUserCreate,cause: err.message});
 }

}

module.exports.createUserAsPatient= async function(req,res)
{
	try{
	
	let user=req.body;

	const username=await mycrypto.encryptExternal(req.body.username);
	const password=await mycrypto.encryptExternal(req.body.password);	
	
    user.username=await mycrypto.encryptInternal(req.body.username);
	user.password=await mycrypto.encryptInternal(req.body.password);

	let patient=await patientController.searchPatientByIdInternal(req.body.userData);
	console.log(patient)
	user.userTypeDescription=userTypeController.entitys().patient;
	if(!patient)
	{
		res.status(400).send({error: errors.noUserCreate,cause: "No patient Found"});
		return;
	}
	user.userDetails=patient._id;
	
		   //res.json({user: user, patient: patient});
		 console.log(user);
		createUser(req,res,user,username,password);
	 	return;
	}catch(err){
	console.log(err.stack);
 	res.status(400).send({error: errors.noUserCreate,cause: err.message});
	}
  
}

/*

*/


module.exports.createUser= async function(req,res)
{
	 try
	 {
	 	let newUser=req.body;
	 	
	 	let pass= await mycrypto.encryptExternal(req.body.password);
	 	let us= await mycrypto.encryptExternal(req.body.username);
	    
	    let user_type=await userTypeController.findType(newUser.user_type);
	    
	    if(user_type)
	    { 	
	     	//console.log("Encontro usuario");
	     	newUser=await generateUser(newUser,req);
	     	//generateUser(newUser,pass,user,first_names, last_names, identification, type);
	     	userController.create(newUser).then(entity=>{
	     	  res.status(201).json(
	     	  {
	     	  	status: 201,
	     	  	response:"User create",
	     	  	entity: entity,
	     	  	username:us,
	     	  	password:pass

	     	  });
	     	}).catch(onRejected=>{
				res.json(onRejected);
	     		return;
	     	});
	     	return;
	     }
	     res.json(errors.noUserType);
	     console.log(user_type);
	 }
	 catch(err)
	 {
	 	console.log("Error",err);
	 	res.status(400).send({error: errors.noUserCreate,cause: err.message});
	 }
}

module.exports.getUserById=async function(req,res)
{	try{
	let user=await userController.getDocumentById(req.params.id);
	res.status(200).json(user);
}catch(err){
	res.status(400).send({error: errors.noUserSearch,cause: err.message});
}
}

async function getUser(req,res)
{
	try
	{
		var user=req.body;
		user=await generateUser(user,req);
		return user;
 	}
 	catch(err)
 	{
	 	//res.status(400).send({error: errors.noUserCreate,cause: err.message});
	 	throw(err);
	}
}

async function createUser(req,res,user,username,password)
{
	try
	{	let new_user=await userController.create(user);
    	console.log(new_user);
     	res.status(201).json(
     	  {
     	  	status: 201,
     	  	response:"User create",
     	  	entity: new_user,
     	  	username:username,
     	  	password:password,
     	  	//decus: usdec,
     	  	//passdec: passdec
     	  });
     	
     }
     catch(err)
     {
   		res.status(400).send({error: errors.noUserCreate,cause: err.message});
 		return null;
     }
}
//Genera encriptacion
async function generateUser(user,req)
{
	try
	{
	    user.password= await mycrypto.encryptInternal(req.body.password);
	    user.username= await mycrypto.encryptInternal(req.body.username);
		user.userData.firstNames=await mycrypto.encryptInternal(req.body.userData.firstNames);
		user.userData.lastNames=await mycrypto.encryptInternal(req.body.userData.lastNames);
		user.userData.document.identification=await mycrypto.encryptInternal(req.body.userData.document.identification);
		user.userData.document.type=await mycrypto.encryptInternal(req.body.userData.document.type);
		//console.log(entity);
		return user;
	}
	catch(err)
	{
		console.log(err.stack);
		throw(err);
	}
}


///Login
module.exports.loginUser=async function(req,res)
{
	try
	{
		//let user=await mycrypto.decryptExternal(req.body.username);
		//let pass=await mycrypto.decryptExternal(req.body.password);
		//console.log(user,pass);
		//res.json({status:400,user:user,pass:pass});
		let dbuser=await mycrypto.encryptInternal(req.body.username);
		let dbpass=await mycrypto.encryptInternal(req.body.password);
		//console.log(dbuser,dbpass);
		let request_user=await userController.loginUser(dbuser,dbpass);
		let data_user=await getUserData(request_user);
		if(request_user)
		{
			let login=session.initUser(request_user,res);
		    data_user=await transformUserInternalExternal(data_user[0]);
			res.status(200).send({login:login,user:data_user});
			return;
		}
	res.status(400).send({error:errors.noUserFound});
	return;
	}
	catch(err)
	{
		console.log(Date.now(),err);
		res.status(400).send({error:errors.noUserSearch,cause: err.message});
	}

}

async function getUserData(user){
	let from=userTypeController.type(user.userTypeDescription);
	let data=await userController.findUserData(from,user._id);
	return data;
}
async function descryptInteralUserData(userData){
	userData.firstNames=await mycrypto.decryptInternal(userData.firstNames);
	userData.lastNames=await mycrypto.decryptInternal(userData.lastNames);
	userData.document.identification=await mycrypto.decryptInternal(userData.document.identification);
	userData.document.type=await mycrypto.decryptInternal(userData.document.type);
	return userData;
}
async function encryptExternalUserData(userData){
	/*userData.firstNames=await mycrypto.encryptExternal(userData.firstNames);
	userData.lastNames=await mycrypto.encryptExternal(userData.lastNames);
	userData.document.identification=await mycrypto.encryptExternal(userData.document.identification);
	userData.document.type=await mycrypto.encryptExternal(userData.document.type);*/
	return userData;
}

async function transformUserInternalExternal(user)
{
	console.log(user);
	   let purepass= await mycrypto.decryptInternal(user.password);
	   let pureuser= await mycrypto.decryptInternal(user.username); 
	   console.log(purepass,pureuser); 
	   user.password= await mycrypto.encryptExternal(purepass);
	   user.username= await mycrypto.encryptExternal(pureuser);  
	   console.log( user.password,user.username); 
    	user.userData=await descryptInteralUserData(user.userData[0]);
	    //user.userData=await encryptExternalUserData(user.userData);
	   console.log(user.userData);
	return user;
}