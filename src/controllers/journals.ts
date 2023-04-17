/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from 'express';

const client = require('../data/db');

export const getAll = async(req: Request, res: Response) => {
  const allContacts = await client.query(`SELECT *
    FROM journals 
    ORDER BY id ASC`);

  res.statusCode = 200;
  res.send(allContacts.rows);
};

export const addJournal = async(req: Request, res: Response) => {
  const { newJournal } = req.body;

  if (!newJournal) {
    res.sendStatus(400);

    return;
  }

  const {
    id,
    imgUrl,
    name,
    date,
  } = newJournal;

  const resposeData = await client.query(
    `INSERT INTO journals (id, imgUrl, name, date)
    values ($1, $2, $3, $4) RETURNING *`,
    [id, imgUrl, name, date],
  );

  res.statusCode = 201;
  res.send(resposeData.rows[0]);
};

export const removeJournal = async(req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const resposeData = await client.query(
    'DELETE FROM journals WHERE id = $1 RETURNING *',
    [id],
  );

  res.statusCode = 200;
  res.send(resposeData.rows[0]);
};
