const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3333;

app.use(cors());

app.use(bodyParser.json());

let tema = {
  id: 1,
  nome: "Dragon Balls",
  descricao:
    "Coleção das sete esferas do dragão, capazes de invocar Shenlong e realizar desejos.",
};

let categorias = [
  { id: 1, nome: "Z Fighters" },
  { id: 2, nome: "Dragon Balls" },
  { id: 3, nome: "Villains" },
];

app.get("/autor", (request, response) => {
  if (request.headers.accept === "application/json") {
    response.json(tema);
  } else {
    response.send(`
      <html>
        <body>
          <h1>Autor: Dragon Balls</h1>
          <p>Descrição: Coleção das sete esferas do dragão, capazes de invocar Shenlong e realizar desejos.</p>
        </body>
      </html>
    `);
  }
});

app.get("/tema", (request, response) => {
  response.json(tema);
});

app.post("/tema", (request, response) => {
  tema = request.body;

  response.status(201).json(tema);
});

app.put("/tema", (request, response) => {
  tema = { ...tema, ...request.body };

  response.json(tema);
});

app.delete("/tema", (request, response) => {
  tema = {};

  response.status(204).end();
});

app.get("/categorias", (request, response) => {
  response.json(categorias);
});

app.post("/categorias", (request, response) => {
  const categoria = request.body;
  categoria.id = categorias.length + 1;
  categorias.push(categoria);

  response.status(201).json(categoria);
});

app.put("/categorias/:id", (request, response) => {
  const categoria = categorias.find(
    (c) => c.id === parseInt(request.params.id)
  );

  if (categoria) {
    Object.assign(categoria, request.body);
    response.json(categoria);
  } else {
    response.status(404).json({ message: "Categoria não encontrada" });
  }
});

app.delete("/categorias/:id", (request, response) => {
  categorias = categorias.filter((c) => c.id !== parseInt(request.params.id));
  response.status(204).end();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
