const { Router } = require('express');
const { getApiVideogames, getVideogamesByName, getVideoGameDetailById, getGenres, postGame, dbInfo } = require('../controllers/index')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/videogames', async (req, res) => {
    let apiVideogames = await getApiVideogames();
    const dbVideogames = await dbInfo();
    const allVideogames = await apiVideogames.concat(dbVideogames);
    
    const name = req.query.name;
    if(name){
        const filteredVideogames = await getVideogamesByName(allVideogames, name);
        filteredVideogames.length ? res.send(filteredVideogames) : res.send('No se encontro ningun videojuego con ese nombre')

    }
    else{
        res.send(allVideogames);
        console.log(dbVideogames)       
        }
});

router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    let response = await getVideoGameDetailById(id);

    res.send(response)
})

router.get('/genres', async (req, res) => {
    const response = await getGenres();
    res.send(response);
})

router.post('/videogame', async (req, res) => {
    let { name, description, platforms, genres, rating, img, released } = req.body;
    const videogameCreated = await postGame(name, description, platforms, genres, rating, img, released);

    res.send(videogameCreated);
})

module.exports = router;
