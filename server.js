const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando!');
    });

let users = [];
let idCounter = 1;

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
    }
    const newUser = { id: idCounter++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Rota para atualizar um usuário pelo ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    
    res.json(user);
});

// Rota para deletar um usuário pelo ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== parseInt(id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});