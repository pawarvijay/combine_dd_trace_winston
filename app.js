const tracer = require('dd-trace').init({
    logInjection: true,
    analytics: true,
    service: '/datadog_spans',
    hostname: 'localhost',
    port: '8126'
});

const { createLogger, format, transports } = require('winston');
const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.File({ filename: `${process.cwd()}/logs/datadog_spans.log` }),
    ],
});

let payload = 77
const span = tracer.startSpan('first span ' + payload);
span.setTag('event', 'input_data_for_shopping_cart')
span.setTag('customer.id', payload)
logger.log('info', { "name": payload, age: payload, address: payload }, { http: { status_code: 200, method: 'GET' } });
span.finish();
