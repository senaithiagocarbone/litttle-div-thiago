const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let reservas = [];

// Criar reserva
app.post("/reservas", (req, res) => {
  reservas.push(req.body);
  res.json({ sucesso: true, reservas });
});

// Listar reservas
app.get("/reservas", (req, res) => {
  res.json(reservas);
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
