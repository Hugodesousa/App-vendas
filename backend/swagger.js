/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.ts']

swaggerAutogen(outputFile, endpointsFiles)