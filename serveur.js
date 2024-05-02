
const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors')
const app = express()
const port = 3000
const version = "v1"
const router = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = require('./swagger.json');
const specs = swaggerJsdoc(options);

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
  });

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(`/api/${version}`, router);
app.use( `/api/${version}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs, { explorer : true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
