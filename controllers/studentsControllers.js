const path = require('path');
const {readFileSync, writeFileSync} = require('fs');



// Controllers

// Show All Students Data
const getAllStudents = (req, res) =>{

    // Get Old Data From DB
    const allStudentsData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')))

    // Send Data
    res.render('index', {
        allStudentsData
    })
}

// Create New Students
const createStudents = (req, res) =>{
    res.render('create')
}


// Show Single Student Data
const showSingleStudents = (req, res) =>{

     // Get Old Data From DB
    const allStudentsData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')))

    // Get Data From Url
    const {id} = req.params;

     // Get Data From DB
    const student = allStudentsData.find(data => data.id == id)
    res.render('show', {student})
    
}


// Edit 
const editStudents = (req, res) =>{

    // Get Old Data From DB
    const allStudentsData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')))

      // Get Data From Url
    const { id} = req.params;
    const edit_data = allStudentsData.find(data=> data.id == id);

    res.render('edit', {
        edit_data
    })
}


// Data Store
const studentsDataStore = (req, res) =>{

    // Get Old Data From DB
    const allStudentsData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')))

    let last_index = 1;
    if(allStudentsData.length >0){

        last_index = allStudentsData[allStudentsData.length -1].id +1;
    }
    const {name, email, cell, location} = req.body;
    
    allStudentsData.push({

        id: last_index,
        name: name,
        email: email,
        cell: cell,
        location: location,
        photo: req.file ? req.file.filename :'avatar.jpeg'
        
    })

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(allStudentsData))
    res.redirect('/')
   
}



// Delete Student Data
const deleteStudent = (req, res) =>{

    const allStudentsData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')))
    const { id } = req.params;

    const student_info = allStudentsData.filter(data => data.id != id)
    
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(student_info));
    res.redirect('/')
}


// Update Students
const updateStudents = (req, res) =>{

    // Get Old Json Data
    const allStudentsData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')))

    // Get data from url
    const {id} = req.params;

    // Get data from DB
    allStudentsData[allStudentsData.findIndex(data => data.id == id)] ={

        ...allStudentsData[allStudentsData.findIndex(data => data.id == id)],
        name: req.body.name,
        cell: req.body.cell,
        location: req.body.location,
        email: req.body.email,

    }

    // Now Update Data
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(allStudentsData));

    // Back Home Page
    res.redirect('/')

}


// Module Exports
module.exports ={
    getAllStudents,
    showSingleStudents,
    editStudents,
    createStudents,
    studentsDataStore,
    deleteStudent,
    updateStudents
}