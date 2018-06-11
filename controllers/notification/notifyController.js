const Notify=require('mongoose').model('Notify');
const Notification = require('../../database/triage/NotificationCollection.js');
const fcmController=require('../../message/firebase');
let notifyEntity=new Notification(Notify);

module.exports.createNotification=async function(triage,subject,description){
	try{

	let notify=notifyEntity.initNotification(triage,description,subject);
   //notify.response=await fcmController.sendMessagesNotification(notify);
	let new_notify=await notifyEntity.create(notify);
	return new_notify;
	}catch(err){
		console.log(err.stack);
		throw(err);
	}
}