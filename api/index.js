const express = require("express");
const { engine } = require("express-handlebars")  
const routes = require("./routes");
const cors = require("cors");
const path = require('path');

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler.js");

const app = express();
const port = 3000;


//midddlewares

//lectura de json
app.use(express.json())

//motor de vistas  handlebars
// app.engine('.hbs',engine(
// 	{
// 		defaultLayout: 'main', 
//   		layoutsDir: path.join(app.get('views'), 'layouts'),
//   		partialsDir: path.join(app.get('views'), 'partials'),
// 		extname: '.hbs',
// 		helpers: './schemas/handlebars'
// 	}
	
// 	));
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'views'));


//de esta manra poddemos bloquear otros lugares de acceso
// const whitelist  = ['http://localhost:3000'];
// const options =  {
// 	origin:(origin, callback) => {
// 		if(whitelist.includes(origin)){
// 			callback(null,true);
// 		} else {
// 			callback(new Error('No permitido'))
// 		}
// 	}
// }
// app.use(cors(options));


//rutas
routes.appRoutes(app);

//middlewares de error
app.use(logErrors);
app.use(boomErrorHandler); 
app.use(errorHandler);


//Subida de servidor
app.listen(port,(req, res)=>{
	console.log("Aplicación corriendo en el puerto 3000")
});

