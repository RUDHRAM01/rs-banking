const transactionService = require("../service/transactionIn.service");

exports.getTransactions = async (req, res) => {
  transactionService.getTransactions().then((data) => res.json(data));
};

exports.getTransaction = async (req, res) => {
  const id = req.params.id;
  transactionService.getTransaction(id).then((data) => res.json(data));
};

exports.addTransaction = async (req, res) => {
  const body = req.body;
  transactionService.addTransaction(body).then((data) => res.json(data));
};

exports.updateTransaction = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  transactionService.updateTransaction(id, body).then((data) => res.json(data));
};

exports.deleteTransaction = async (req, res) => {
  const id = req.params.id;
  transactionService.deleteTransaction(id).then((data) => res.json(data));
};