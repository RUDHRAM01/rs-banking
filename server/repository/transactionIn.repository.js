const { TransactionIn } = require("../model/transactionIn.model");

const getTransactions = async () => {
  const Transactions = await TransactionIn.find({archive: {$eq: false}}).lean();
  return Transactions;
};

const getTransaction = async (id) => {
  return await TransactionIn.findOne({ _id: id });
};

const addTransaction = async (transaction) => {
  const data = new TransactionIn(transaction);

  try {
    return await data.save();
  } catch (err) {
    return { error: `Error occured while saving : ${err}` };
  }
};

const updateTransaction = async (id, body) => {
  return await TransactionIn.findByIdAndUpdate(id, body, { useFindAndModify: false });
};

const deleteTransaction = async (_id) => {
  return await TransactionIn.findByIdAndUpdate(_id, {archive:true},{useFindAndModify:false});
};

module.exports = {
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  addTransaction,
};