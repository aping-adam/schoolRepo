import express from 'express';
import mysql from 'mysql2/promise';

const app = express(); //vytvori instanci webove aplikace
app.use(express.json()); //automaticky prevod na JS objekt, output: req.body

app.use((req, res, next) => { //CORS hlavicky, jelikoz je front-end a back-end na jinych ip adresach, tak to browser blokuje
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'musarDrop'
});

//login
app.post('/api/login', async (req, res) => { //pokud prohlizec posle GET na localhost:3000/api/users, tak to spusti funkci
    const {name, pass} = req.body;
    const [rows] = await db.execute(`SELECT id, name FROM users WHERE name = "${name}" AND pass = "${pass}"`); //posle SQL request do databaze

    if(rows.length > 0){
        return res.status(200).json({
            success: true,
            userId: rows[0].id,
            user: rows[0]
        });
    }

    return res.status(401).json({
        success: false,
        error: "Špatné přihlašovací údaje"
    });
});

//POST | ulozeni noveho uzivatele
app.post('/api/users', async (req, res) => {
    try{
        const { name, pass } = req.body;

        if(!name || !pass){
            return res.status(400).json({error: 'Name or password is empty'});
        }

        const [result] = await db.execute( //execute commandu v MySQL
            'INSERT INTO users (name, pass) VALUES (?, ?)',
            [name, pass]
        )

        res.status(201).json({
            message: 'user was created',
            id: result.insertId,
            name,
            pass
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'error while loading database'});
    }
});

app.listen(3000, () => console.log("active on http://localhost:3000"));