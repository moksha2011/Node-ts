import express from 'express';
import Logger from './lib/Logger';

const app = express();
const PORT = 30301;

app.get('/logger', (_, res) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');

  res.send('Hello world');
});

app.listen(PORT, () => {
  Logger.error(`Server is up and running http://localhost:${PORT}`);
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');
});
