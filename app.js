const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition.json');
const multer = require('multer');
const { 
  developmentErrorHandler, 
  testErrorHandler, 
  productionErrorHandler, 
  defaultErrorHandler,
} = require('./functions/errorHandler');

require('dotenv').config();
const swaggerSpec = require('./config/swagger-config')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users-routes');
const activitiesRouter = require('./routes/activities-routes');
const testimonialRouter = require('./routes/testimonial-routes');
const organizationRouter = require('./routes/organizations-routes');
const categoriesRouter = require('./routes/categories');
const membersRouter = require('./routes/members-routes');
const slidesRouter = require('./routes/slides-router');
const contactRouter = require('./routes/contact-routes');


const app = express();
app.use(cors());

//DOCUMENTATION//
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', require('./routes/news-routes'));// TODO (roleValidations ready) agregar el middleware para validar si es admin
app.use('/commentary', require('./routes/commentary-routes'));

app.use('/news', require('./routes/news-routes'))//TODO (roleValidations ready) agregar el middleware para validar si es admin

app.use('/auth', require('./routes/auth-route'));

app.use('/activities', activitiesRouter);
app.use('/testimonials', testimonialRouter);
app.use('/organizations', organizationRouter);
app.use('/members', membersRouter);
app.use('/slides', slidesRouter);



app.use('/categories', categoriesRouter);
app.use('/contacts', contactRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const {NODE_ENV} = process.env;

  switch(NODE_ENV) {
    case "development":
      developmentErrorHandler(err, req, res);
      break;

    case "production":
      productionErrorHandler(err, req, res);
      break;

    case "test":
      testErrorHandler(err, req, res);
      break;

    default:
      defaultErrorHandler(err, req, res);
      break;
  }
});
module.exports = app;
