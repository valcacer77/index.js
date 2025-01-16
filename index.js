// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [
    { id: 1, nome: "João Silva", email: "joao@gmail.com", telefone: "123456789", senha: "1234" },
    { id: 2, nome: "Maria Oliveira", email: "maria@gmail.com", telefone: "987654321", senha: "4321" }
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    usuario ? res.json(usuario) : res.status(404).json({ message: "Usuário não encontrado" });
});

app.post('/usuarios', (req, res) => {
    const { nome, email, telefone, senha } = req.body;
    const novoUsuario = { id: usuarios.length + 1, nome, email, telefone, senha };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        Object.assign(usuario, req.body);
        res.json(usuario);
    } else {
        res.status(404).json({ message: "Usuário não encontrado" });
    }
});

app.delete('/usuarios/:id', (req, res) => {
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        usuarios.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Usuário não encontrado" });
    }
});

app.listen(port, () => console.log(Servidor rodando em http://localhost:${port}));
