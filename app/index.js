const express = require('express');
require('dotenv').config();
const db = require('./utils/database')
const PORT = process.env.PORT;




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST','PUT','DELETE');
    next();
})

app.use('/users', require('./routes/users'))





//DB Testing


db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

try {
    app.listen(PORT, console.log(`Server listening on ${PORT}`));
} catch (error) {
    console.error(error);
}