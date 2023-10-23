const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { firebaseConfig } = require("../../config/vars");
const { initializeApp } = require("firebase/app");
const { uploadFileToFireBase } = require("./upload-file.controller");
const Group = require("../models/group-chat.model");

//Initialize a firebase application
initializeApp(firebaseConfig);

exports.get = async (req, res) => {
  try {
    const group = await Group.get(req.params.id);
    return res.send(group);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.create = async (req, res) => {
  try {
    let fileData;
    if (req.file) {
      fileData = await uploadFileToFireBase(req.file);
    }

    const group = await Group.create({
      ...req.body,
      avatar: fileData ? fileData.downloadURL : "",
    });
    return res.send(group);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.update = async (req, res) => {
  console.log(req.body);
  const { _id, members, admins, title, description, avatar } = req.body;
  console.log(_id);
  // only admins can update members of group chat
  // members of group chat can leave group chat if use /leave-group

  // only admins can set a member to admin
  // admin can not kick out one user is admins
  try {
    let fileData;
    if (req.file) {
      fileData = await uploadFileToFireBase(req.file);
    }

    const group = await Group.findOneAndUpdate(
      { _id: _id },
      {
        ...req.body,
        avatar: fileData ? fileData.downloadURL : avatar,
      }
    );
    return res.send(group);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.leave = async (req, res) => {
  console.log(req.body);

  try {
    const group = await Group.create(req.body);
    return res.send({ fileData, group });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.list = async (req, res) => {
  console.log(req.user["_id"]);
  try {
    const group = await Group.find({ $or:[
       { members: { $in: [req.user["_id"]] }},
        {admins: { $in: [req.user["_id"]] }},
    ] });
    return res.send(group);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
