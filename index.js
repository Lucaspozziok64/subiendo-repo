import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with nodejs!");
});

app.get("/alumnos", (req, res) => {
    const data = readData();
    res.json(data.alumnos);
});

app.get("/alumnos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const alumno = data.alumnos.find((alumno) => alumno.id === id);
    res.json(alumno);
});

app.post("/alumnos", (req, res) => {
    const data = readData();
    const body = req.body;
    const newalumno = {
        id: data.alumnos.length + 1,
        ...body,
    }
    data.alumnos.push(newalumno);
    writeData(data);
    res.json(newalumno); 
});

app.put("/alumnos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const alumnoIndex = data.alumnos.findIndex((alumno) => alumno.id === id);
    data.alumnos[alumnoIndex] = {
        ...data.alumnos[alumnoIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Alumnos updated sucessfuly" });
});

app.delete("/alumnos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const alumnoIndex = data.alumnos.findIndex((alumno) => alumno.id === id);
    data.alumnos.splice(alumnoIndex, 1);
    writeData(data);
    res.json({ message: "Alumno borrado correctamente" });
});

app.listen(3000, () => {
    console.log('server listening on port 3000');
});

