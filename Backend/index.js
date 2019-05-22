
if( process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); // dotenv. Es un módulo de dependencia que carga variables de entorno desde un .env archivo en process.env
}

const express = require('express'); //Express framework para crear servidor con node.
const morgan = require('morgan'); //Morgan sirve para ver por consola las peticiones que hace el cliente al server.
const multer = require('multer'); //Multer sirve para procesar imagenes.
const path = require('path'); // Path modulo de node, sirve para capturar la ruta actual del proyecto.
const cors =  require('cors');


//Inicializaciones
const app = express();
require('./database');



//Configuraciones
app.set('port',process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); //Para poder interpretar los datos del form como un Json
app.use(express.json());
app.use(cors());


//Routes
app.use('/api/books', require('./routes/books'));


//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));


//Empezar el servidor
app.listen(app.get('port'), ()=> {
    console.log("Servidor iniciado en el port", app.get('port'));
});