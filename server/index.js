const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'listenomargoreact',
    password: 'listenomargoreact',
    database: 'listenomargoreact',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res)=>{
    const sqlSelect = "SELECT * FROM name";
    db.query(sqlSelect, (err, result)=>{
        // console.log(result);
        res.send(result);
    });
});

app.delete('/api/delete/:name', (req, res)=>{
    const name = req.params.name
    const sqlDelete = "DELETE FROM name WHERE name = ?";

    db.query(sqlDelete, name, (err, result)=>{
     if(err) console.log(err)
    });
});

//fonction pour modifier
app.put('/api/update', (req, res)=>{
    const name =  req.body.name;
    
    const sqlUpdate = "UPDATE name SET name = ? WHERE name = ?";

    db.query(sqlUpdate,[name], (err, result)=>{
       if (err) console.log(err);
    });
});

app.post("/api/insert", (req, res)=>{
    const name = req.body.name;

    const sqlInsert = "INSERT INTO name (name) VALUES (?);"
    db.query(sqlInsert, [name], (err, result)=>{
        console.log(err);
    });
});
// app.get('/', (req, res)=>{
    
//     // ceci est une ligne de test
//     // const sqlInsert = "INSERT INTO name (name) VALUES ('Delphine');"
//     // db.query(sqlInsert, (err, result)=>{
//     //     res.send("hello soleil");
//     // });
    
// });

app.listen(3001, () => {
    console.log("cela fonctionne sur le port 30001");
});