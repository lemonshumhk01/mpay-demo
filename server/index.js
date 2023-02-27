import express from 'express';
import cors from 'cors';
import bp from 'body-parser';
import axios from 'axios';

const logger = {
  info: (...msg) => {
    console.log(new Date(), '-', ...msg);
  },
};

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const server = express();
server.use(cors());
server.use(bp.json());

server.post('/payment', async (req, res) => {
  try {
    logger.info('POST /payment', req.body);
    const response = await httpClient.post('https://demo.mobiletech.com.hk/MPayMobi/PayRequest.jsp', req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    res.status(200).end();
  } catch (e) {
    res.status(500).json(e);
  }
});

server.listen(3001, () => console.log('on 3001'));
