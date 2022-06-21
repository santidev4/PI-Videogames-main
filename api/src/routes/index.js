const { Router } = require('express');
const { getApiVideogames, getVideogamesByName, getVideoGameDetailById, getGenres, postGame, dbInfo } = require('../controllers/index')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal

// GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

router.get('/videogames', async (req, res) => {
    let apiVideogames = await getApiVideogames();
    const dbVideogames = await dbInfo();
    const allVideogames = apiVideogames.concat(dbVideogames);
    
    const name = req.query.name;
    if(name){
        const filteredVideogames = await getVideogamesByName(allVideogames, name);
        filteredVideogames.length ? res.send(filteredVideogames) : res.status(404).send(['No se encontro ningun videojuego con ese nombre'])

    }
    else{
        res.send(allVideogames);
        console.log(dbVideogames)       
        }
})


// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    let response = await getVideoGameDetailById(id);

    res.send(response)
})

// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/genres', async (req, res) => {
    const response = await getGenres();
    res.send(response);
})

// POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

router.post('/videogame', async (req, res) => {
    let { name, description, platforms, genres, rating, img, released } = req.body;
    const videogameCreated = await postGame(name, description, platforms, genres, rating, img, released);

    res.send(videogameCreated);
})

module.exports = router;
