const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = YAML.load('./swagger.yaml');

module.exports = () => [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
