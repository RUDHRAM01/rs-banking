const express = require('express');
const router = express.Router();
const transaction = require('../controller/transactionIn.controller');

//Write APIs here

router.get('/transactions',transaction.getTransactions);
router.get('/transaction/:id',transaction.getTransaction);
router.put('/transaction/:id',transaction.updateTransaction);
router.delete('/transaction/:id',transaction.deleteTransaction);
router.post('/transaction',transaction.addTransaction);

module.exports = router;