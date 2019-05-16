# Monitora API

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
description: String
}
```

#### Examen
 * params contiene la informacion y parametros del examen, ejemplo SPO2, PULOS, ETC...
 * name: Nombre del examen
 * description: Descripccion del examen
 * medics: array de medicos que estan en capacidad de realizar este
```
{
 id: ObjectId,
 name: String,
 categories: [String],
 description:String,
 params:{
 },
 medics:[ObjectId]

}
```

##### Cita medica
```
{
 id: ObjectId,
 name: String,
 categories: [String],
 description:String,
 params:{
 },
 results:[ObjectId]
 medics:[ObjectId]

}
```



##### Resultado Examen Paciente
```
{
id: ObjectId,
patient: ObjectId,
medic: ObjectId,
type: ObjectId,
result:{}
}
```

##### Resultado Cita Medica Paciente
```
{
id: ObjectId,
patient: ObjectId,
medic: ObjectId,
type: ObjectId,
schudule:{
date:Date,
day: int,
month: int,
yearh: int,
hour: String,
 }
}
```





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


