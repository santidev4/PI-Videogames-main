const {default: axios} = require('axios');
const { Videogame, Genre } = require('../db') 

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}

const { API_KEY } = process.env
const url = 'https://api.rawg.io/api/games';

const getApiVideogames = async () => {

    // ASYNC / AWAIT CON ID

    // try {
    //     const cantidad = 15;
    //     let videogames = []
    
    //     for (let i = 1; i <= cantidad; i++) {
    //         let request = await axios(`https://api.rawg.io/api/games/${i}?key=${API_KEY}`)
    //             .then(res => res.data)
    //         videogames.push(request);
    //     }
        
    //     let videogamesObj = videogames.map(el =>{
    //         return{
    //             name: el.name,
    //             id: el.id,
    //             img: el.background_image,
    //             description: el.description,
    //             released: el.released,
    //             rating: el.rating,
    //             platforms: el.platforms.map(el=> el.platform.name)
    //         }
    //     })
    //     return videogamesObj
        
    // } catch (error) {
    //     console.log(error);
    // }

    // PROMESAS CON ID


    // const cantidad = 15;    // tal vez 100!
    // let videogames = [];

    // for (let i = 1; i <= cantidad; i++) {
    //     let request = axios(`https://api.rawg.io/api/games/${i}?key=${API_KEY}`)
    //         .then(res => res.data)
    //         .catch(err => console.log(err))
    //     videogames.push(request);
    // };

    // return Promise.all(videogames).then(
    //     values =>{  
    //        return values.map(el => {
    //             return{
    //                 name: el.name,
    //                 id: el.id,
    //                 img: el.background_image,
    //                 description: el.description,
    //                 released: el.released,
    //                 rating: el.rating,
    //                 platforms: el.platforms.map(el => el.platform.name)
    //             }
    //         })
    //     },
    //     reason => {
    //         console.log('reason', reason);
    //     }
    // );

    //  PROMISES CON PAGES

    // const videogames = [];
    // const url = 'https://api.rawg.io/api/games?key=79d4844fcfec46a0b1a2be9f7b9a19dd&page=';
    // const pages = 2;

    // for (let i = 1; i <= pages; i++) {
    //     let request = axios(`${url+i}`)
    //         .then(res=> res.data)
    //         .then(res => res.results)
    //         .catch(err => console.log(err))
    //     videogames.push(request)
    // }

    // const response = []
    // return Promise.all(videogames).then(
    //         values =>{  
    //             // console.log('values[0]' ,values[0])

    //         //    return values[0].map(el => {
    //         //         return{
    //         //             name: el.name,
    //         //             id: el.id,
    //         //             img: el.background_image,
    //         //             description: el.description,
    //         //             released: el.released,
    //         //             rating: el.rating,
    //         //             platforms: el.platforms.map(el => el.platform.name)
    //         //         }
    //         //     })
    //             values.forEach(arr => {
    //                 arr.map(el => {
    //                     return response.push({
    //                         name: el.name
    //                     })
    //                 })
    //             })
    //             console.log(response);
    //         },
    //         reason => {
    //             console.log('reason', reason);
    //         }
    //     );
    

        //  ASYNC   /   AWAIT       con pages


        try {
            const pages = 5;
            const response = [];
            const url = 'https://api.rawg.io/api/games?key=79d4844fcfec46a0b1a2be9f7b9a19dd&page=';

            for (let i = 1; i <= pages; i++) {
                let request = await axios(`${url+i}`)
                    .then(res=> res.data)
                    .then(res => res.results)
                    .catch(err => console.log(err))
                response.push(request);
            }

            //Imagen
            // Nombre
            // Géneros
            const videogames = [];
            response.map(arr => {
                arr.map(el => {
                    videogames.push({
                        id: el.id,
                        name: el.name,
                        img: el.background_image,
                        genres: el.genres.map(el => el.name),
                        rating: el.rating
                    })
                })
            })

            return videogames
            
        } catch (error) {
            console.log(error);
        }
};



// GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
const getVideogamesByName = (arr, name) => {
    return arr.filter(el => el.name.toLowerCase().split(' ').includes(name.toLowerCase())).slice(0, 15)
};

// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas

const getVideoGameDetailById = async (id) => {
    try {
        let request = await axios(`${url}/${id}?key=${API_KEY}`)
            
        console.log(request.data)
        const { img,name, genres, description, released, rating, platforms } = request.data;

        return {
            img,
            name,
            genres: genres.map( el => el.name),
            description,
            released,
            rating,
            platforms: platforms.map(el => el.platform.name)
        }
    } catch (error) {
        console.log(error);
    }
};

// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

const getGenres = async () => {
    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
    let dbGenres = await Genre.findAll();

    if(!dbGenres.length){
        try {
            let request = await axios(url).then(res => res.data.results);

            request.forEach( async el => {
                await Genre.findOrCreate({
                    where: {
                        name: el.name
                    }
                })
            });
            return await Genre.findAll()
        } catch (error) {
            console.log(error);
        }
    }
    else return dbGenres;
};

const postGame = async (name, description, platforms) => {
    let videogameCreated = await Videogame.create({
        name,
        description,
        platforms
    })

    return videogameCreated;
}

module.exports = {
    getApiVideogames,
    getVideogamesByName,
    getVideoGameDetailById,
    getGenres,
    postGame
}