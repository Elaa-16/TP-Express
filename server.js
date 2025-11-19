
const express = require('express');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let tasks = [
  { id: 1, title: 'Apprendre Express', done: false },
  { id: 2, title: 'Créer une application de démonstration', done: false },
];


// Page d'accueil
app.get('/', (req, res) => {
  res.render('index', { user: 'Elaa' });
});

// Page des tâches
app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks, total: tasks.length });
});

// Page À propos
app.get('/about', (req, res) => {
  res.render('about');
});

// Page Contact
app.get('/contact', (req, res) => {
  res.render('contact');
});


// Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Ajouter une tâche
app.post('/api/tasks', (req, res) => {
  if (!req.body.title || req.body.title.trim() === "") {
    return res.status(400).json({ error: "Le titre est obligatoire" });
  }

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () =>
  console.log(`Serveur en cours d’exécution sur http://localhost:${PORT}`)
);
