const signRepository = require("../repository/signIn.repository");

const getSigns = async () => {
  return await signRepository.getSigns();
};

const getSign = async (id) => {
  return await signRepository.getSign(id);
};

const addSign = async (Sign) => {
  return await signRepository.addSign(Sign);
};

const updateSign = async (id, body) => {
  return await signRepository.updateSign(id, body);
};

const deleteSign = async (id) => {
  return await signRepository.deleteSign(id);
};

module.exports = {
  getSigns,
  getSign,
  updateSign,
  deleteSign,
  addSign,
};