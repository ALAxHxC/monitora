const ApiSchema=require('../database/security/apiSchemaCollection');
const errors=require('../model/alert/errorMessagesAPI');	

var apiController=require('mongoose').model('apiSchema');
let apiSchemaEntity=new ApiSchema(apiController);

var password =String(global.password);
var expires= global.expires;
var jwt = require('jsonwebtoken');
var mycrypto=require('./apiUtils');

module.exports.login= async function(req,res)
{
	try
	{
	var user=await mycrypto.encryptExternal( req.body.username);
	var pass=await mycrypto.encryptExternal( req.body.password);
	//Search
	var searchuser=await mycrypto.decryptExternal(user);
	var searchpass=await mycrypto.decryptExternal(pass);
	console.log(user,pass,searchuser,searchpass);
	apiController.findOne
	(
		{'username': searchuser, 'password':searchpass},
		function(err,api)
		{
			if(err)
			{
				res.status(204 ).json(err)
			}
			res.json(api);
		}
	);
	}
	catch(err)
	{
		res.status(400).send({error: errors.noUserSearch,cause: err.message});
	}
}

module.exports.register= async function(req,res)
{
	try{

	let exuser=await mycrypto.encryptExternal(req.body.username);
	let expass=await mycrypto.encryptExternal(req.body.password);
	let apiSchema=await generateUser(req);
	console.log(apiSchema);
//res.json(apiSchema);
	
	let new_apiSchema=await apiSchemaEntity.create(apiSchema);
	res.status(201).json({
		username: exuser,
		password: expass,
		apiSchema: new_apiSchema._id
	});
}catch(err){
	res.status(400).send({error: errors.noUserSearch,cause: err.message});
	}
}
async function generateUser(req){
	try{
 	let usr=await mycrypto.encryptInternal(req.body.username);
	let pass=await mycrypto.encryptInternal(req.body.password);
	let apiSchema=new apiSchemaEntity.entity({
			username: usr,
			password : pass,
			type: 
			{
				description: req.body.type.description,
				name: req.body.type.name
			}
		});
	console.log(apiSchema);
	return apiSchema;
}catch(err){
	console.log(err.message,err.stack);
	throw(err);
}
}

module.exports.sign= async function(req,res)
{
	try{
	let user=await mycrypto.decryptExternal(req.body.username);
	let pass=await mycrypto.decryptExternal(req.body.password);
    console.log(user,pass);
    let username = await mycrypto.encryptInternal( user);
	let password = await mycrypto.encryptInternal( pass);
    let apiSchema = await apiSchemaEntity.findUser(username,password);
    console.log(apiSchema);
	loginJwt(apiSchema,res);
	}catch(err){
		res.status(400).send({error: errors.noApiFounds,cause: err.message});
	
	}
}

module.exports.login= async function(req,res,next)
{
	jwt.verify
	(req.headers['token'], password, function(err, decoded) 
		{
	    	if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', error: err }); 
	    	next();
		}
	);
}

exports.initUser=function(user,res)
{
	var token= jwt.sign({id: user._id, 
						username: user.username,
						password: user.password
						},password,
						 {
      					expiresIn: parseInt(expires) // expires in 24 hours
   						 });
	return {token:token,expires:expires};
	//res.status(200).send({ auth: true, token: token , expiresIn: expires});
}

function loginJwt(api,res)
{
	 var token = jwt.sign
	 (
	 	{ id: api._id }, password, 
		 	{
	      		expiresIn: parseInt(expires) // expires in 24 hours
	    	}
    	);
	  res.status(200).send({ auth: true, token: token,id: api._id , expiresIn: expires});
}


