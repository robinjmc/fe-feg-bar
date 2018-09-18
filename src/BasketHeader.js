import React, { Component } from 'react';
import { capitalize } from 'lodash';
import numeral from 'numeral';


class BasketHeader extends Component {
    state = {
        status: '',
        calories: 0,
        cholesterol: 0,
        dietary_fiber: 0,
        potassium: 0,
        protein: 0,
        saturated_fat: 0,
        sodium: 0,
        sugars: 0,
        total_carbohydrate: 0,
        total_fat: 0
    }

    render() {
        let { feggie_nut } = this.props
        let total = [...feggie_nut].reduce((acc, curr, i) => {
            i % 11 ? acc.push(curr) : console.log(curr)
            return acc
        }, [])
        let nutrients = ['calories', 'cholesterol', 'dietary_fiber', 'potassium', 'protein', 'saturated_fat', 'sodium', 'sugars', 'total_carbohydrate', 'total_fat']
        return (
            <div id="total_nutrition">
                {
                    nutrients.map(nutrient => {
                        let nutrient_total = total.filter(feg => feg[0] === nutrient).reduce((acc, curr) => {
                            return acc + curr[1]
                        }, 0)
                        return (
                            <div id="nutrient">
                            <div id="nutrients">
                            {nutrient.split("_").map(words => capitalize(words)).join(" ")}: 
                            </div>
                            <div id="nutrients">
                            {numeral(nutrient_total).format()} (g)
                            </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}
export default BasketHeader