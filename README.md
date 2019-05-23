# Monitora API



#### Pacientes

##### Tipificaciones:

* Agregar
  * id: id del cliente
  * tipo: id de la tipificacion
  * Method: POST
  * PATH: /patient/type/:id/:type
* Eliminar
  * Method: POST
  * PATH: * PATH: /patient/type/:id/:type
 
* Ejemplo : /patient/type/5bbd7743fd252f0013ab24aa/type1
#### Models


#### Tipificacion:
```
{
id: ObjectId,
name: String
}
```

#### Clasificacion:
```
{
id: ObjectId,
name: String,
description: String,
tipificaciones:[String]
}
```
#### Paciente

 {
    idMedic: {type: mongoose.Schema.Types.ObjectId, index: true, require: true},
    firstNames : { type: 'String'},
    lastNames : { type: 'String'},
    document: {
      identification :{ type: 'String', unique: true},
      type: {type: 'String'}
    },
    date: {type: Date},
    description:{type: 'String'},
    profile_image:{type: 'String', default: null},
    images:{type: 'String',default: null},
    sesion: {type: Boolean, default: false},
    lastSesion: { type: Date, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    pathologys: [mongoose.Schema.Types.ObjectId],
    clasificacion:[mongoose.Schema.Types.ObjectId]
  } 






[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)
Api backend de monitora.
##### Dependencias principales
  - NPM 5.6.0+
  - NODE JS 8.9.4++
  - FIREBASE
  - MOONGOSE
  - JWT
#### Estructura del proyecto
 - routes: se definen los endpoints
 - model: se definen las collectiones
 - message: esto es para notificaciones push
 - database: controladores de las colecciones e iniciador de base de datos (general/MongoinitBasic.js)
 - controllers: es el intermediario entre database y routes
#### ENDPOINTS
   - USUARIOS: https://web.postman.co/collections/2203040-1cb6759a-a2af-448b-a95e-84d67237f461?workspace=9b2d424f-2ee4-48ff-8f42-e8f8e057f8ff
    - PACIENTES: https://web.postman.co/collections/2203040-fd664704-0a18-4d53-89e2-6e7c2187b72f?workspace=9b2d424f-2ee4-48ff-8f42-e8f8e057f8ff
    - TRIAGE: https://web.postman.co/collections/2203040-656846a8-32df-4ac4-85e7-1f8e56d7ff08?workspace=9b2d424f-2ee4-48ff-8f42-e8f8e057f8ff

#### URLS:
-PRUEBAS: https://monitora-pro.herokuapp.com/

### LOCAL

> npm install
> npm start
> probar sobre el puerto 3000 (127.0.0.1:3000)

### DESNCRIPTAR:
-Para conocer el valor encriptado de algo en la base de datos ver el arhivo (security/apiUtils.js)
>node security/apiUtils.js


