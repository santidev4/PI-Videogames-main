const {default: axios} = require('axios');
const { Videogames, Genres } = require('../db') 

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}

const { API_KEY } = process.env

const getApiVideogames =  () => {

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
            const pages = 2;
            const response = [];
            const url = 'https://api.rawg.io/api/games?key=79d4844fcfec46a0b1a2be9f7b9a19dd&page=';

            for (let i = 1; i <= pages; i++) {
                let request = axios(`${url+i}`)
                    .then(res=> res.data)
                    .then(res => res.results)
                    .catch(err => console.log(err))
                    response.push(request)
            }

            return response.map(arr => {
                console.log(arr);
                
            })

        } catch (error) {
            console.log(error);
        }

};


module.exports = {
    getApiVideogames
}