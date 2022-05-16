import React from "react";

export default function Card({name, img, genres}){

    console.log('genres', genres)
    
    return(
        <div>
            <img src={img} alt=""  width='250px'/>
            <h3> {name} </h3>
            <span> {
                    genres?.map(el=> {
                        return `${el} `
                    })
                    } </span>           
        </div> 
    )
}