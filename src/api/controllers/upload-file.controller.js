const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { firebaseConfig } = require("../../config/vars");
const { initializeApp } = require('firebase/app');

//Initialize a firebase application
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads

exports.create = async (req, res) => {
    console.log('files',req.file)
    const file = req.file
    try {
       
    const fileInfo = await uploadFileToFireBase(file)
    return res.json(fileInfo)
       
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}


const uploadFileToFireBase = async (file) => {

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `files/${file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
        message: 'file uploaded to firebase storage',
        name: file.originalname,
        type: file.mimetype,
        downloadURL: downloadURL
    }

}

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

exports.uploadFileToFireBase = uploadFileToFireBase