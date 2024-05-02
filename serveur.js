const express = require('express');
const { Sequelize } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const cors = require ("cors");
const swaggerDocument = require('./swagger/swagger.json');
const app = express();
const port = 3000;
const version = "v1";
const router = require('./routes/routes');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
    storage: './db/database.sqlite',
    database: './db/database.sqlite',
});

(async function dbconnect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const Musique = require("./models/music.js");

(async () => {
    try {
        // Synchronisez le modèle avec la base de données
        await Musique.sync({ force: true }); // Utilisez { force: true } pour supprimer et recréer la table à chaque fois
        console.log('All models were synchronized successfully.');

        // Ajoutez des données dans la base de données
        const playlist = [
            {
                "title": "L.E.J - SUMMER 2015",
                "src": "uploads/musics/lef2015.mp4",
                "image": "uploads/covers/lef2015.jpg"
            },
            {
                "title": "mozinor Romanian Boy",
                "src": "uploads/musics/Romanian-Boy.mp4",
                "image": "uploads/covers/mozinor.jpg"
            },
            {
                "title": "Nelly-Furtado-Promiscuous",
                "src": "uploads/musics/Nelly-Furtado-Promiscuous.mp4",
                "image": "uploads/covers/Nelly-Furtado-Promiscuous.jpg"
            }
        ];

        for (const item of playlist) {
            try {
                await Musique.create(item);
                console.log(`Musique "${item.title}" ajoutée avec succès.`);
            } catch (error) {
                console.error(`Erreur lors de l'ajout de la musique "${item.title}" :`, error);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la synchronisation des modèles avec la base de données :', error);
    }
})();

// Utilisation du middleware pour parser les requêtes JSON et les données encodées dans l'URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Utilisation du middleware cors

// Utilisation du routeur pour gérer les différentes routes de l'API
app.use(`/api/${version}/`, router);

// Utilisation de Swagger UI pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});