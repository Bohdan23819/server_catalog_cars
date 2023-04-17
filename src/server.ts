/* eslint-disable @typescript-eslint/no-var-requires */
import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';
import { router } from './routers/router';

const client = require('./data/db');

const BASE_URL = '/.netlify/functions/server';

const app = express();

app.use(cors());
app.use(express.json());

client.connect();

router.get('/', (req, res) => {
  res.send(`
  <h1>Phone Book Api</h1>
  <h2>GET: /journals</h2> <p>to get all journals</p>
  <br>
  <h2>GET: /orders</h2> <p>to get all orders</p>
  <br>
  <h2>POST: /journals</h2> <p>to add journal (returns new journal)</p>
  <br>
  <h2>POST: /orders</h2> <p>to add order (returns new order)</p>
  <br>
  <h2>DELETE: /journals/:id</h2> <p>to remove journal (returns deleted journal)</p>
  <br>
  <h2>DELETE: /orders/:id</h2> <p>to remove order (returns deleted order)</p>
  <br>
  `);
});

app.use(BASE_URL, router);

export const handler = serverless(app);
