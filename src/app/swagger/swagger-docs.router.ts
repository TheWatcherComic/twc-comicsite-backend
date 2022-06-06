import { Router } from 'express';
import { SWAGGER_DOCS_ENDPOINT } from '../../constants/endpoint';

export const router: Router = Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json');

router.use(SWAGGER_DOCS_ENDPOINT + "/", swaggerUi.serve);
router.get(SWAGGER_DOCS_ENDPOINT + "/", swaggerUi.setup(swaggerDocument));