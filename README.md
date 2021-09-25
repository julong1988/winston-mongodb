### Guide
```js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new MongoTransport({ url: 'mongodb://localhost:27017/test_log', collection: 'error_log' }),
  ],
});
```

##### options 
- url(default mongodb://localhost:27017/test_log)
- collection(default error_log)