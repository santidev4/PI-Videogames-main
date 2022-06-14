import React, { useState } from "react";

// class Rating extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             stars: [],
//             rating: 0,
//             hovered: 0,
//             selectedIcon: "★",
//             deselectedIcon: "☆"
//         };

//         let outOf = props.outOf ? props.outOf : 5;

//         for (var i = 0; i < outOf; i++) {
//             this.state.stars.push(i + 1);
//         }
//     }

//     changeRating(newRating) {
//         this.setState({
//             rating: newRating
//         });

//         if (this.props.onChange)
//             this.props.onChange(newRating);
//     }

//     hoverRating(rating) {
//         this.setState({
//             hovered: rating
//         });
//     }

//     render() {

//         const { stars, rating, hovered, deselectedIcon, selectedIcon } = this.state;

//         return (
//             <div>
//                 <div className="rating" style={{ fontSize: '3em', color: "#FFD700" }}>

//                     {stars.map(star => {
//                         return (
//                             <span
//                                 style={{ cursor: 'pointer' }}
//                                 onClick={() => { this.changeRating(star); }}
//                                 onMouseEnter={() => { this.hoverRating(star); }}
//                                 onMouseLeave={() => { this.hoverRating(0); }}
//                             >
//                                 {rating < star ?
//                                     hovered < star ? deselectedIcon : selectedIcon
//                                     :
//                                     selectedIcon
//                                 }
//                             </span>
//                         );
//                     })}

//                 </div>
//             </div>
//         );
//     }
// }

// export default Rating;

export default function Rating(){

    const [ starState, setStarState ] = useState({
        stars: [1, 2, 3, 4, 5],
        rating: 0,
        hovered: 0,
        selectedIcon: "★",
        deselectedIcon: "☆"
    })
    const changeRating = (newRating) => {
        setStarState({
            ...starState,
            rating: newRating
        });
    }
    const hoverRating = (rating) => {
        setStarState({
            ...starState,
            hovered: rating
        });
    };
    const { stars, rating, hovered, deselectedIcon, selectedIcon } = starState;

    return(


        <div>
                <div className="rating" style={{ fontSize: '3em', color: "#FFD700" }}>

                    {stars.map(star => {
                        return (
                            <span
                                key={star}
                                style={{ cursor: 'pointer' }}
                                onClick={() => { changeRating(star); }}
                                onMouseEnter={() => { hoverRating(star); }}
                                onMouseLeave={() => { hoverRating(0); }}
                            >
                                {rating < star ?
                                    hovered < star ? deselectedIcon : selectedIcon
                                    :
                                    selectedIcon
                                }
                            </span>
                        );
                    })}

                </div>
            </div>
    )
}