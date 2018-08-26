var admin = require('firebase-admin');
var serviceAccount = require("./firebase.json");
//var medicController=require('../medicController');
admin.initializeApp
(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://telemed-f679a.firebaseio.com"
  }
);

console.log(admin.apps.length);
module.exports.sendMessage= async function(notification){
  try
  {
	//	let medic=await medicController.getMedicById(notification.idMedic);
		var message=
    {
            notification: 
            {
            	title: notification.subject,
            	body: notification.description
            },
            data:
            {
            	id:notification._id,
            	triage: notification.idTriage,
            }
		}
    let response_message=await sendMessage(message);
    return response_message;
	}
	catch(err)
  { 
    console.log("Error Firebase",err.stack);
    throw(err);
	}
}
module.exports.sendMessagesNotification= async function(notification)
{
	try
  {
	//	let medic=await medicController.getMedicById(notification.idMedic);
		var message=
    {
            notification: 
            {
            	title: notification.subject,
            	body: notification.description
            },
            data:
            {
            	id:notification._id,
            	triage: notification.idTriage,
            }
		}
    let response_message=await sendMessage(message);
    return response_message;
	}
	catch(err)
  { 
    console.log("Error Firebase",err.stack);
    throw(err);
	}
}

async function sendMessage(message)
{
	try
  {
  	let fcm= await admin.messaging().send(message);
  	console.log(fcm);
  	return fcm;
  }
  catch(err)
  { 
    console.log( err,err.stack);
  	throw(err);
  }
}

async function  testMessage()
{
	let registrationToken ='f8mNlJq4VOY:APA91bF5_8ldOZEm34ajCfNx7hZ9_LhjUBQFDwZbtSnCNEzb1bEtMsXKlM8upyicvmnJ92xELZzDSxTMaeZrCrrau-S0mmNdMC18Mp3rwLnUGy-cXM8caoiCJQjEpDDy6FChDwtmO3n2';
	let message={		
 	notification: {
    title: "Portugal vs. Denmark",
    body: "5 to 1"
     },
 		data: {
    score: '850',
    time: '2:45'
  		},
  token: registrationToken

};
let response= await sendMessage(message);
}
 //testMessage();
module.exports = admin;