import express from "express";
import bodyParser from 'body-parser';
import routes from './routers';
import cors from 'cors'
import errorHandler from 'errorhandler'
import project from '../config/config.json'
import customErrorHandler from './middleware/errorHandler'

const app = express()

const expressSwagger = require('express-swagger-generator')(app)

if (process.env.NODE_ENV === 'development') {
   console.log('Generate Swagger Docs')
   let options = {
      swaggerDefinition: {
         info: {
            description: 'Documentation',
            title: 'API Documentation',
            version: '0.0.1'
         },
         host: project.docs_host,
         basePath: project.docs_path,
         produces: [
            'application/json'
         ],
         schemes: ['http', 'https'],
         securityDefinitions: {
            JWT: {
               type: 'apiKey',
               in: 'header',
               name: 'Authorization',
               description: ''
            }
         }
      },
      basedir: __dirname, // app absolute path
      files: [
         '../src/swagger/**/*.js',
         '../src/swagger/**/*.js',
         '../src/controllers/**/*.js',
         '../src/app.js'
      ] // Path to the API handle folder
   }
   expressSwagger(options)
}

// app.use(responseLongger)

if (project.env === 'development') {
   app.use(errorHandler({
      dumpException: true,
      showStack: true
   }))
}
app.use(cors()) // use cors

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

routes(app);

app.use(customErrorHandler)

export default app