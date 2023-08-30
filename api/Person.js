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

    try {
        const id = req.params.id;

        const person = await Person.findOne({ _id: id });

        if (person)
            res.status(200).json({ person: person });
        else
            res.status(422).json({ message: "Usuário não encontrado" });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao buscar Usuário" });
    }
});

//-Deletar
router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const deletedPerson = await Person.deleteOne({ _id: id });

        if (deletedPerson.deletedCount === 1)
            res.status(200).json({ message: `Usuário de ID: "${id}" excluído com Sucesso` });
        else
            res.status(422).json({ message: `Usuário de ID: "${id}" não encontrado` });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao tentar excluir Usuário" });
    }
});

//-Alterar
router.put('/:id', async (req, res) => {
    try {
        let validationMessage = "";
        let hasError = false;

        //- { name: "Alex", salary: 1200, approved: true }
        const { name, salary, approved } = req.body;

        const id = req.params.id;
        
        const person = { name, salary, approved };
        
        //console.log(person);

        if (!id || id.length <= 0) {
            hasError = true;
            validationMessage += '#O campo "Id" é Obrigatório';
        }

        if (!name && !salary && !approved) {
            hasError = true;
            validationMessage += '#É necessário informar pelo menos um dos parêtros para alterar a pessoa';
        }

        if (!hasError) {
            const updatedPerson = await Person.updateOne({_id: id}, person);

            if (updatedPerson.matchedCount === 1)
                res.status(201).json({ message: `Usuário de ID: "${id}" alterado com Sucesso` });
            else
                res.status(201).json({ message: `Usuário de ID: "${id}" não encontrado` });

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