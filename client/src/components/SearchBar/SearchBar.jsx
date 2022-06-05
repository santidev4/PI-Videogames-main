import React from "react";
import style from "../SearchBar/SearchBar.module.css"
import { filterByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
 
export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = React.useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value.toLowerCase())
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(filterByName(name));
        setName('');        
    }

    return(
        <div className={style.box}>
            <form>
                <input type="text" placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
                <input type="submit" value="Search" onSubmit={(e) => handleSubmit(e)}/>
            </form>
        </div>
    )
}