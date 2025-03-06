const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "felveteli"
})

db.connect((err) =>{
    if(err){
        console.error("baj van")
    }
    else{
        console.log("Sikeresen csatlakozott az adatbázishoz")
    }
})

app.get("/diakok",(req,res) => {
    db.query('select oktazon, nev, (hozott*2)+kpmagy+kpmat as "osszpont", agazat from diakok inner join jelentkezesek on oktazon = jelentkezesek.diak inner join tagozatok on akod = jelentkezesek.tag order by nev asc', (err,results) =>{
        if(err) return res.status(500).json(err)
        res.json(results)
    })
})

app.listen(5000, () =>{
    console.log("A szerver fut a(z) 5000-es porton!")
})