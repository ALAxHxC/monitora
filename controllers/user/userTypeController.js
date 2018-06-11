var user_typeController=require('mongoose').model('UserType');
var errors=require('../../model/alert/errorMessagesAPI');
const User_Type=require('../../database/user/UserTypeCollection');
let user_type=new User_Type(user_typeController);

module.exports.findType= async function(id)
{
	try
	{
		var types=await user_type.getUserTypeById(id);
		return types;
		
	}
	catch(err)
	{
		console.log(Date.now(),err);
		return null;
	}
}

module.exports.findTypeId= async function(req,res)
{
	try
	{	let id=req.params.id;
		var types=await user_type.getUserTypeById(id);
		console.log(types);
		res.status(200).json(types);
	}
	catch(err)
	{
		console.log(Date.now(),err);
		res.status(400).json({error: errors.noUserTypeGet,cause: err.message});
	}
}

module.exports.getAllTypes= async function(req,res)
{
	try
	{
		let types=await user_type.getAll();
		res.status(200).json(types);
	}
	catch(err)
	{
		res.status(400).json({error: errors.noUserTypeGet,cause: err.message});
	}
}

module.exports.AddPermissions=async function(req,res)
{
	try
	{
		let types=await AddPermissions(req.body.permission,req.params.id);
		res.status(200).json(types);
	}
	catch(err)
	{
		res.status(400).json({error: errors.noUserTypeUpdate,cause: err.message});
	}
}

module.exports.DeletePermission=async function(req,res)
{
	try
	{
		let types =await DeletePermission(req.body.permission,req.params.id);
		res.status(200).json(types);
	}
	catch(err)
	{
		res.status(400).json({error: errors.noUserTypeUpdate,cause: err.message});
	}
}

async function AddPermissions(permission,id)
{
	try
	{
		var types=await user_type.getUserTypeById(id);
		let newPermissions=searchPermision(types.permissions,permission.id);
		newPermissions.push(permission);
		types.permissions=newPermissions;

		let new_types= await user_type.updateDocument(types);
		return types;
	}
	catch(err)
	{
		console.log(Date.now(),err);
		return null;
	}
}

async function DeletePermission(permission,id)
{user_type.getUserTypeById(id);
	try
	{
		var types=await user_type.getUserTypeById(id);
		let newPermissions=searchPermision(types.permissions,permission.id);
		console.log(permission.id,permission,newPermissions);
		types.permissions=newPermissions;
		let new_types= await user_type.updateDocument(types);
		return types;
	}
	catch(err)
	{
		console.log(Date.now(),err);
		return null;
    }

}

function searchPermision(array,id)
{
	const filteredItems = array.filter(array =>array.id != id);
	return filteredItems;
}

module.exports.entitys=function()
{
	
	return {
		admin: 1,
		patient: 2,
		medic: 3
	};
	;
}
