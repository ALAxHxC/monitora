const mongoose = require('mongoose');

var url="mongodb://admin:bc3ASAMb4W8N0ac0@cluster0-shard-00-00-hy2jd.mongodb.net:27017,cluster0-shard-00-01-hy2jd.mongodb.net:27017,cluster0-shard-00-02-hy2jd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoose.connect(url);
mongoose.Promise = global.Promise;
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
console.log("Cargo base de datos");
});

//Method that inialize the objects for database 
function initDatabase(app){
	const apiSchema = require('../../model/security/apiSchema')(app, mongoose);
	const user = require('../../model/users/User')(app, mongoose);
	const Patient = require('../../model/users/Patient')(app, mongoose);
	const Medic = require('../../model/users/Medic')(app, mongoose);
	const Admin = require('../../model/users/Admin')(app, mongoose);
	const user_type = require('../../model/users/UserType')(app, mongoose);
	const pathology=require('../../model/triage/Pathology')(app,mongoose);
	const traige=require('../../model/triage/Triage')(app,mongoose);
	const notify=require('../../model/notification/Notify')(app,mongoose);
	const message=require('../../model/messages/MessageCollection')(app,mongoose);
	const places = require('../../model/places/places')(app,mongoose);
	const messagesTriages = require('../../model/triage/MessageTriage')(app,mongoose);
	const inboxMessages = require('../../model/messages/InboxMessage')(app,mongoose);
	cargaDedatos();
}

///Method permit load data 
function cargaDedatos(){
//  cargaDeUserType();
}

function cargaDeUserType(){
	const userTypeController=require('mongoose').model('UserType');
	userTypeController.insertMany(initUserTypes())
    .then(function(mongooseDocuments) {
         /* ... */
         console.log(Date.now(),"Cargaron Documentos cargaDeUserType")
    })
    .catch(function(err) {
        /* Error handling */
        console.log(Date.now(),"No cargaron cargaDeUserType")
    });
}

function initUserTypes(){
	return [
	{
		description: "Medico",
		name:"Medico",
		idType: 1,
		permissions:[]
	},
	{
		description: "Paciente",
		name:"Paciente",
		idType: 2,
		permissions:[]
	},
	{
		description: "Administrador",
		name:"Administrador",
		idType: 3,
		permissions:[]
	}
	];
}

module.exports = {
  mongo: mongoose,
  initDataBase: initDatabase
};

