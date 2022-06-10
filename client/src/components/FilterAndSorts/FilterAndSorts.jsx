import style from "../FilterAndSorts/FilterAndSorts.module.css"

export default function FilterAndSorts({genres, handleFilterByGenre, handleSortByName, handleSortByRating}){


    return(
        <div className={style.filtros}>
                 <select onChange={(e) => handleSortByName(e)} className={style.select_filterAndSort}>
                    <option selected disabled>Alfabeticamente</option>
                    <option  value='ASC' >A - Z ↑</option>
                    <option  value='DESC' >Z - A ↓</option>
                </select> 

                <select onChange={(e) => handleFilterByGenre(e)} className={style.select_filterAndSort}>
                    <option selected disabled>Generos</option>
                    <option value="All">All</option>
                    {
                        genres?.map(el => (
                            <option value={el.name} key={el.id}> {el.name} </option>
                        ))
                    }
                </select>

                <select onClick={(e) => handleSortByRating(e)} className={style.select_filterAndSort}>
                <option selected disabled>Rating</option>
                    <option  value="ASC"  >Rating ↑</option>
                    <option  value="DESC" >Rating ↓</option>
                </select>

                <select onClick={(e) => handleSortByRating(e)} className={style.select_filterAndSort}>
                    <option selected disabled>Creados</option>
                    <option  value="All"  >All</option>
                    <option  value="Created"  >Creados</option>
                    <option  value="API" >API</option>
                </select>
        </div>
    )
}