import style from "../FilterAndSorts/FilterAndSorts.module.css"

export default function FilterAndSorts({genres, handleFilterByGenre, handleSortByName, handleSortByRating}){


    return(
        <div className={style.filtros}>
                 <select onChange={(e) => handleSortByName(e)}>
                    <option  value='ASC' >A - Z ↑</option>
                    <option  value='DESC' >Z - A ↓</option>
                </select> 

                <select onChange={(e) => handleFilterByGenre(e)}>
                    <option value="All">All</option>
                    {
                        genres?.map(el => (
                            <option value={el.name} key={el.id}> {el.name} </option>
                        ))
                    }
                </select>

                <select onClick={(e) => handleSortByRating(e)}>
                    <option  value="ASC"  >Rating ↑</option>
                    <option  value="DESC" >Rating ↓</option>
                </select>

                <select onClick={(e) => handleSortByRating(e)}>
                    <option  value="Created"  >Creados</option>
                    <option  value="API" >API</option>
                </select>
        </div>
    )
}