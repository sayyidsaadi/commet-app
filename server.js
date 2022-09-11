const express = require('express');
const dotenv = require('dotenv');
const ejsLayout = require('express-ejs-layouts')
const studentsRoutes = require('./routes/students')

// Init Express
const app = express();


// data manage
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Environmenet Variable
dotenv.config();
const PORT = process.env.PORT || 4040;


// Ejs Config
app.set('view engine', 'ejs');
app.use(ejsLayout);
app.set('layout', 'layouts/app')

// Static Folder
app.use(express.static('public'));

// Init Router
app.use( studentsRoutes);

// Listen Server
app.listen(PORT, ()=>{
    console.log(`
        Server is Running On Port ${PORT}
    `)
})

