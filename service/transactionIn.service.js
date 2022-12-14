const transactionRepository = require("../repository/transactionIn.repository");

const getTransactions = async () => {
  return await transactionRepository.getTransactions();
};

const getTransaction = async (id) => {
  return await transactionRepository.getTransaction(id);
};

const addTransaction = async (Transaction) => {
  return await transactionRepository.addTransaction(Transaction);
};

const updateTransaction = async (id, body) => {
  return await transactionRepository.updateTransaction(id, body);
};

const deleteTransaction = async (id) => {
  return await transactionRepository.deleteTransaction(id);
};

module.exports = {
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  addTransaction,
};