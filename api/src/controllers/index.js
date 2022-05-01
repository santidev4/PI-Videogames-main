const {default: axios} = require('axios');
const { Videogames, Genres } = require('../db') 

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}

const { API_KEY } = process.env

const getApiVideogames =  () => {

    // ASYNC / AWAIT

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

    // PROMESAS


    const cantidad = 15;
    let videogames = [];

    for (let i = 1; i <= cantidad; i++) {
        let request = axios(`https://api.rawg.io/api/games/${i}?key=${API_KEY}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        videogames.push(request);
    }

    return Promise.all(videogames).then(
        values =>{  
           return values.map(el => {
                return{
                    name: el.name,
                    id: el.id,
                    img: el.background_image,
                    description: el.description,
                    released: el.released,
                    rating: el.rating,
                    platforms: el.platforms.map(el => el.platform.name)
                }
            })
        },
        reason => {
            console.log('reason', reason);
        }
    )
};


module.exports = {
    getApiVideogames
}