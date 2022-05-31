import style from "../Loader/Loader.module.css"

export function Loader(){

    return(
        <div className={style.container}>
            <svg
            class={style.ring}
            viewBox="25 25 50 50"
            stroke-width="5"
            >
                <circle cx="50" cy="50" r="20" />
            </svg>
        </div>
    )
}