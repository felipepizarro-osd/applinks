const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');

const flash = require('connect-flash')
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');
//init//
const app = express(); // esta es mi aplicacion 
require('./lib/passport');
//settings

app.set('port',process.env.PORT || 4000); //este es el puerto donde se va a ejecutar la app
// se selecciona un puerto 
// y se aplica la resolucion del pc con procces.env.port
//si  no hay ninguno le ejecuta en  el 4000 localhost 
app.set('views',path.join(__dirname,'views'));

app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout : 'main',
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs');


//Middlewares

app.use(morgan('dev')); //este modulo se usa cuando una user manda una peticion al servidor de backend  
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret:'pipeapp',
    resave:false,
    saveUninitialized:false,
    store: new MySqlStore(database)

}))
app.use(flash());
//global variables
app.use((req,res,next) => {
    //vamos a usar esta variable para poder definirlas a medida que las vamos necesitando
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});


//rutas 
//definir las url de la app
app.use(require('./routes'));
app.use(require('./routes/authentication.js'));
app.use('/links', require('./routes/links.js'));

//public 
//todos los archivos que estaran disponibles para el server
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'),() => {
    console.log('server on port :',app.get('port'));
});