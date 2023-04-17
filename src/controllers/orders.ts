/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from 'express';

const client = require('../data/db');

export const getAll = async(req: Request, res: Response) => {
  const allCompanies = await client.query(`SELECT *
    FROM orders 
    ORDER BY id ASC`);

  res.statusCode = 200;
  res.send(allCompanies.rows);
};

export const addOrder = async(req: Request, res: Response) => {
  const { newOrder } = req.body;

  if (!newOrder) {
    res.sendStatus(400);

    return;
  }

  const { id, productName, name, adress, phone } = newOrder;

  const resposeData = await client.query(
    `INSERT INTO orders (id, productName, name, adress, phone)
    values ($1, $2, $3, $4, $5) RETURNING *`,
    [id, productName, name, adress, phone],
  );

  res.statusCode = 201;
  res.send(resposeData.rows[0]);
};

export const removeOrder = async(req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const resposeData = await client.query(
    'DELETE FROM orders WHERE id = $1 RETURNING *',
    [id],
  );

  res.statusCode = 200;
  res.send(resposeData.rows[0]);
};
