const multer = require('multer');
const path = require('path');

// Config Multer
const storage = multer.diskStorage({

    destination: (req, file, cb)=>{

        cb(null, path.join(__dirname, '../public/images/students/'))

    },
    filename: (req, file, cb)=>{

        cb(null, file.originalname)

    }

});
const studentMulter = multer({
    storage: storage
}).single('student_photo');

module.exports ={
    storage,
    studentMulter
}