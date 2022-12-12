const { SignIn } = require("../model/siginIn.model");

const getSigns = async () => {
  const Signs = await SignIn.find({archive: {$eq: false}}).lean();
  return Signs;
};

const getSign = async (id) => {
  return await SignIn.findOne({ _id: id });
};

const addSign = async (sign) => {
  const data = new SignIn(sign);

  try {
    return await data.save();
  } catch (err) {
    return { error: `Error occured while saving : ${err}` };
  }
};

const updateSign = async (id, body) => {
  return await SignIn.findByIdAndUpdate(id, body, { useFindAndModify: false });
};

const deleteSign = async (_id) => {
  return await SignIn.findByIdAndUpdate(_id, {archive:true},{useFindAndModify:false});
};

module.exports = {
  getSigns,
  getSign,
  updateSign,
  deleteSign,
  addSign,
};