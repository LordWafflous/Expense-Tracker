import express from 'express'

//import controller and middlewres here
import { transactionMake } from '../controller/transaction.controller.js';
import { authCheck } from '../middleware/auth.mw.js';


const router = express.Router();

router.post('/',  authCheck, transactionMake);

export default router;