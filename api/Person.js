const router = require('express').Router();

const Person = require("../models/Person");

//-Incluir
router.post('/', async (req, res) => {
    try {
        let validationMessage = "";
        let hasError = false;

        //- { name: "Alex", salary: 1200, approved: true }
        const { name, salary, approved } = req.body;

        const person = { name, salary, approved };

        if (!name) {
            hasError = true;
            validationMessage += '#O campo "Nome" é Obrigatório';
        }

        if (!salary) {
            hasError = true;
            validationMessage += '#O campo "Salário" é Obrigatório';
        }

        if (!approved) {
            hasError = true;
            validationMessage += '#O campo "Aprovado" é Obrigatório';
        }

        if (!hasError) {
            await Person.create(person);
            res.status(201).json({ message: `Usuário "${name}" criado com Sucesso` });
        }
        else {
            res.status(422).json({ message: validationMessage });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//-Consultar
router.get('/', async (req, res) => {

    let people = await Person.find();
    res.status(200).json({ people: people ?? [] });
});

//-Detalhar
router.get('/:id', async (req, res) => {

    const id = req.params.id;

    let person = await Person.findOne({ _id: id });
    res.status(200).json({ person: person ?? {} });
});

//-Deletar
router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: `Usuário de ID: "${id}" excluído com Sucesso` });
});

//-Alterar
router.put('/:id', async (req, res) => {
    try {
        let validationMessage = "";
        let hasError = false;

        //- { name: "Alex", salary: 1200, approved: true }
        const { name, salary, approved } = req.body;

        const _id = req.params.id;

        const person = { _id, name, salary, approved };

        if (!id || id.length <= 0) {
            hasError = true;
            validationMessage += '#O campo "Id" é Obrigatório';
        }

        if (!name && !salary && !approved) {
            hasError = true;
            validationMessage += '#É necessário informar pelo menos um dos parêtros para alterar a pessoa';
        }

        if (!hasError) {
            await Person.create(person);
            res.status(201).json({ message: `Usuário de ID: "${Id}" alterado com Sucesso` });
        }
        else {
            res.status(422).json({ message: validationMessage });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;