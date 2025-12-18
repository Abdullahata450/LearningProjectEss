// swagger.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My Learning API',
        description: 'Auto-generated via swagger-autogen'
    },
    host: 'localhost:5000',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Format: Bearer <token>'
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts']; // This will scan your routes through app.ts

/* The autogen function returns a promise.
   In ESM, we can use top-level await.
*/
await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);