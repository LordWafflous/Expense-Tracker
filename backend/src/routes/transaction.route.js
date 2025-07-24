import express from 'express'

//import controller and middlewres here
import { transactionMake, transactionDelete, transactionGet, transactionSummary } from '../controller/transaction.controller.js';
import { authCheck } from '../middleware/auth.mw.js';


const router = express.Router();

router.get('/:userId',  authCheck, transactionGet);
router.get('/summary/:userId',  authCheck, transactionSummary);
router.post('/',  authCheck, transactionMake);
router.delete('/:userId',  authCheck, transactionDelete);

export default router;