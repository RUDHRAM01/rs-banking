const signService = require("../service/signIn.service");

exports.getSigns = async (req, res) => {
  signService.getSigns().then((data) => res.json(data));
};

exports.getSign = async (req, res) => {
  const id = req.params.id;
  signService.getSign(id).then((data) => res.json(data));
};

exports.addSign = async (req, res) => {
  const body = req.body;
  signService.addSign(body).then((data) => res.json(data));
};

exports.updateSign = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  signService.updateSign(id, body).then((data) => res.json(data));
};

exports.deleteSign = async (req, res) => {
  const id = req.params.id;
  signService.deleteSign(id).then((data) => res.json(data));
};