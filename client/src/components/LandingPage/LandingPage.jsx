import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

// export default function LandingPage() {
//     return(
//             <div className={style.container}>
//                 <img src="https://images.pexels.com/photos/6686141/pexels-photo-6686141.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className={style.bg_img} />
//                 <div className={style.container_data}>
//                     <div className={style.data}>
//                         <h1 className={style.titulo}>Bienvenidos</h1>
//                         <p className={style.description}>Acá podrás buscar tus juegos favoritos</p>
//                         <Link to='/home' className={style.link}>
//                             <span className={style.btn}>Ingresar</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//     )
// };

class LandingPage extends React.Component {
    render() {
        return <div className={style.container}>
                <img src="https://images.pexels.com/photos/6686141/pexels-photo-6686141.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className={style.bg_img} />
                <div className={style.container_data}>
                    <div className={style.data}>
                        <h1 className={style.titulo}>Bienvenidos</h1>
                        <p className={style.description}>Acá podrás buscar tus juegos favoritos</p>
                        <Link to='/home' className={style.link}>
                            <span className={style.btn}>Ingresar</span>
                        </Link>
                    </div>
                </div>
            </div>
    }
}

export default LandingPage;