import React from 'react';
import AddToBasket from './AddToBasket';

const CurrentFeg = ({ feggies, feg_data, posted, best }) => {
    return (
        <div>
            {
                feggies ? feggies.map(feg => {
                    let lower = /_/g.test(feg.name) ? feg.name.split('_').join(' ') : feg.name
                    let upper = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)
                    let [food] = feg_data ? feg_data.filter(feg => feg.food_name === lower) : null
                    let image = food ? food.photo.highres : feg.img_src
                    let feg_key = best ? feg.at_best_id : feg.coming_in_id
                    let entries = food ? Object.entries(food).filter(key => key[0].match(/nf_/g)) : null
                    let nutrients = entries === null ? `${[["nf_calories", 0], ["nf_total_fat", 0], ["nf_saturated_fat", 0], ["nf_cholesterol", 0], ["nf_sodium", 0], ["nf_total_carbohydrate", 0], ["nf_dietary_fiber", 0], ["nf_sugars", 0], ["nf_protein", 0], ["nf_potassium", 0], ["nf_p", 0]]}` : `${entries}`
                    return (
                        <div id='smallerBox' style={{ padding: "0px" }} key={feg_key}>
                            <div id="feg">
                                <h1 style={{ height: "3em" }}>{upper}</h1>
                                <div>{
                                    best ?
                                        <AddToBasket feggie_id={`${feg.feggie_id}`} feg_name={feg.name} img_src={image} nutrients={nutrients} posted={posted} />
                                        :
                                        <div >
                                            <img id="feg_img" alt={feg.name} src={image} />
                                        </div>
                                }
                                </div>
                            </div>
                        </div>
                    )
                }) : <div></div>
            }
        </div>
    )
}

export default CurrentFeg