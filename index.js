import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import {join,dirname} from 'path';
import {fileURLToPath} from "url";

import clientesRoutes from './src/routes/clientesRoutes.js'
import productosRoutes from './src/routes/productosRoutes.js'

//INITIALIZATION
const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));

//SETTINGS

app.set('port',process.env.POT || 5000);
        //CONFIGURANDO CARPETA PARA VISTAS
app.set('views',join(__dirname,'views'));

        //CONFIGURAR MOTOR DE PLANTILLAS
app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir:join(app.get('views'),'layouts'),
    partialsDir:join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set("view engine", "hbs")

//To get or post

//MIDDLEWARES
app.use(morgan('dev'));
        //WE'LL USE EXPRESS TO WORK WITH INTERFACES AND FORMS
        //WE'LL USE EXPRESS TO WORK WITH JSON FILES
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//ROUTES
app.get('/',(req,res)=>{
    res.render('index')
})

app.use(clientesRoutes)
app.use(productosRoutes)

//PUBLIC FILES
        //FUNCTION JOIN, PUBLIC THE USERS CAN USE THE CONTENTS THAT ARE IN THE PUBLIC FILE
app.use(express.static(join(__dirname,'public')));

//RUNSERVER
app.listen(app.get('port'),()=>
    console.log("loading port",app.get('port'))
);