import express from 'express';

import * as journalsController from '../controllers/journals';
import * as ordersController from '../controllers/orders';

export const router = express.Router();

router.get('/journals', journalsController.getAll);
router.post('/journals', journalsController.addJournal);
router.delete('/journals/:id', journalsController.removeJournal);

router.get('/orders', ordersController.getAll);
router.post('/orders', ordersController.addOrder);
router.delete('/orders/:id', ordersController.removeOrder);
