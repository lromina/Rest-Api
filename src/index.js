import express from "express";

//para mostrar por consola la solicitud de los clientes usamos morgan
import morgan from "morgan";

import {router} from "./routes.js";

const app = express(); // esto crea el servidor de la api rest

app.set('port' , 3000);// el puerto por donde se va a escuchar la solicitud

app.use(morgan('dev')); //para poder ver las solicitudes de los clientes

app.use(express.json());// este metodo permite interpretar las solicitudes de los clientes

app.use(router);

app.listen(app.get('port'), ()=> { // se le envia por parametros a la consola por donde se va a estar escuchando
    console.log (`Server on port ${app.get('port')}`);//en este caso es el puerto 3000


})