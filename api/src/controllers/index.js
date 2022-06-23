const {default: axios} = require('axios');
const { Videogame, Genre } = require('../db') 

const { API_KEY } = process.env
const url = 'https://api.rawg.io/api/games';


const getApiVideogames = async () => {

    //  PROMISES CON PAGES

    const response = [];
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=`;
    const pages = 5;

    for (let i = 1; i <= pages; i++) {
        let request = axios(`${url+i}`)
            .then(res=> res.data)
            .then(res => res.results)
            .catch(err => console.log(err))
        response.push(request)
    }
    
    return Promise.all(response).then(
               arr => {
                return arr.flatMap(el => {
                    return el.map(e => {
                        console.log('e', e)
                       return {
                        name: e.name,
                        id: e.id,
                        img: e.background_image,
                        description: e.description,
                        genres: e.genres.map(el => el.name),
                        released: e.released,
                        rating: e.rating,
                        platforms: e.platforms.map(el => el.platform.name)
                       }
                    })
                })
               },
            reason => {
                console.log('reason', reason);
            }
        );

        //  ASYNC   /   AWAIT       con pages

        // try {
        //     const pages = 5;
        //     const response = [];
        //     const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=`;

        //     for (let i = 1; i <= pages; i++) {
        //         let request = await axios(`${url+i}`)
        //             .then(res=> res.data)
        //             .then(res => res.results)
        //             .catch(err => console.log(err))
        //         response.push(request);
        //     }   
    
        //     const videogames = [];

        //     response.map(arr => {
        //         arr.map(el => {
        //             videogames.push({
        //                 id: el.id,
        //                 name: el.name,
        //                 img: el.background_image,
        //                 genres: el.genres.map(el => el.name),
        //                 rating: el.rating,
        //                 platforms: el.platforms.map(el => el.platform.name)
        //             })
        //         })
        //     })

        //     return videogames
            
        // } catch (error) {
        //     console.log(error);
        // };
};

///////////////////////////////////////

const dbInfo = async () => {

    try {
        let dbVideogame = await Videogame.findAll({
        attributes:{
          exclude: ["updatedAt", "createdAt"]
        },
        include: {
        model: Genre,
        as: "genres",
        attributes:["name", "id"],
        through: { attributes: [] },
        }
      });
    //   console.log('dbVideogame', dbVideogame)
      return [].concat(dbVideogame).map(el => {
        const {name, id, description, released, rating, platforms, img, fromDb, genres} = el
        return{
          name,
          id, 
          description, 
          released, 
          rating, 
          platforms, 
          img, 
          fromDb, 
          genres,
          genres: genres.map(e => e.name)
          
        }
      })
        
    } catch (error) {
        console.log('error', error)
    }
};

///////////////////////////////////////

const getVideogamesByName = (arr, name) => {

    let filteredVideogame = arr.filter(el => el.name.toLowerCase().split(' ').includes(name.toLowerCase())).slice(0, 15);
    let err = 'error'

    if(filteredVideogame.length) return filteredVideogame;
    else return err
};

///////////////////////////////////////

const getVideoGameDetailById = async (id) => {
    try {

        if (typeof id === 'string' && id.includes('-')) {
            let dbVideogame = await Videogame.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: {
                    model: Genre,
                    as: 'genres',
                    attributes: ['id', 'name'],
                    through: { attributes:[]}
                }
            });

            console.log('dbVideogame', dbVideogame);

            return [].concat(dbVideogame).map(el => {
                return{
                  name: el.name,
                  id:  el.id,
                  description: el.description,
                  released: el.released,
                  rating: el.rating,
                  platforms: el.platforms,
                  img: el.img,
                  fromDb: el.fromDb,
                  genres: el.genres.map(e => e.name)
                };
              });
        } else {
            let request = await axios(`${url}/${id}?key=${API_KEY}`);
                
            console.log('request', request)
            const { background_image ,name, genres, description_raw, released, rating, platforms } = request.data;
            
            return [{
                name,
                description: description_raw,
                img: background_image,
                genres: genres.map( el => el.name),
                released,
                rating,
                platforms: platforms.map(el => el.platform.name)
            }]
            
        }

    } catch (error) {
        console.log(error);
    }
};

///////////////////////////////////////

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

///////////////////////////////////////

const postGame = async (name, description, platforms, genres, rating, img, released) => {

    try {
        let videogameCreated = await Videogame.create({
            name,
            description,
            platforms, 
            // genres, 
            rating, 
            img, 
            released
        });
    
        let genresInDb = await Genre.findAll({
            where: {name: genres},
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          })

        await videogameCreated.addGenres(genresInDb);
    
        console.log('videogameCreated', videogameCreated)
        return videogameCreated;
        
    } catch (error) {
        console.log('error', error)
    };
};

///////////////////////////////////////

const deleteGame = async (id) => {

    try {
        const row = await Videogame.findOne({
            where: {
                id: id
            }
        });
        if(row) await row.destroy();
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = {
    getApiVideogames,
    getVideogamesByName,
    getVideoGameDetailById,
    getGenres,
    postGame,
    dbInfo,
    deleteGame
}