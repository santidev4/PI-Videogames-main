const { Router } = require('express');
const { getApiVideogames, getVideogamesByName, getVideoGameDetailById, getGenres, postGame, dbInfo, deleteGame } = require('../controllers/index')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/videogames', async (req, res) => {
    const apiVideogames = await getApiVideogames();
    const dbVideogames = await dbInfo();
    const allVideogames = apiVideogames.concat(dbVideogames);
    
    const name = req.query.name;
    if(name){
        const filteredVideogames = await getVideogamesByName(allVideogames, name);
        res.send(filteredVideogames);

    }
    else{
        res.send(allVideogames);
        // console.log(dbVideogames)       
        }
});

////////////////////////

router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    let response = await getVideoGameDetailById(id);

    res.send(response)
});

///////////////////////

router.get('/genres', async (req, res) => {
    const response = await getGenres();
    res.send(response);
});

///////////////////////

router.post('/videogame', async (req, res) => {
    let { name, description, platforms, genres, rating, img, released } = req.body;
    const videogameCreated = await postGame(name, description, platforms, genres, rating, img, released);

    res.send(videogameCreated);
});

///////////////////////

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const deletedGame = await deleteGame(id);
    return deletedGame
} )


module.exports = router;
