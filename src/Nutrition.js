import React, { Component } from 'react';
import { capitalize } from 'lodash';
import { access } from 'fs';
class Nutrition extends Component {
    state = {
        loading: true,
        nutrients: {}
    }
    // componentDidMount() {
    //     let { amount, feg } = this.props
    //     console.log(amount, 'mount')
    //     let name_format = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').join(' ') : feg.feg_name;
    //     fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'x-app-id': process.env.REACT_APP_NUTRITION_ID,
    //             'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
    //             'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
    //         },
    //         body: JSON.stringify({
    //             'query': `${amount} ${name_format}`,
    //             'timezone': "US/Eastern"
    //         })
    //     })
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(({ foods }) => {
    //             let [food] = foods;
    //             let { nf_calories, nf_cholesterol, nf_dietary_fiber, nf_potassium, nf_protein, nf_saturated_fat, nf_sodium, nf_sugars, nf_total_carbohydrate, nf_total_fat, serving_weight_grams } = food;
    //             const nutrients = {
    //                 calories: nf_calories,
    //                 cholesterol: nf_cholesterol,
    //                 dietary_fiber: nf_dietary_fiber,
    //                 potassium: nf_potassium,
    //                 protein: nf_protein,
    //                 saturated_fat: nf_saturated_fat,
    //                 sodium: nf_sodium,
    //                 sugars: nf_sugars,
    //                 total_carbohydrate: nf_total_carbohydrate,
    //                 total_fat: nf_total_fat,
    //                 weight_grams: serving_weight_grams

    //             }
    //             this.setState({
    //                 nutrients,
    //                 loading: false,
    //                 feg_amount: amount,
    //                 feg_name: name_format
    //             })
    //         })

    // }

    // componentDidUpdate(prevProps, prevState) {
    //     let { amount } = this.props;
    //     let { feg_name } = this.state;
    //     if (prevProps.amount !== amount && this.state.feg_name) {
    //         fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //                 'x-app-id': process.env.REACT_APP_NUTRITION_ID,
    //                 'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
    //                 'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
    //             },
    //             body: JSON.stringify({
    //                 'query': `${amount} ${feg_name}`,
    //                 'timezone': "US/Eastern"
    //             })
    //         })
    //             .then(res => {
    //                 return res.json()
    //             })
    //             .then(({ foods }) => {
    //                 let [food] = foods;
    //                 let { nf_calories, nf_cholesterol, nf_dietary_fiber, nf_potassium, nf_protein, nf_saturated_fat, nf_sodium, nf_sugars, nf_total_carbohydrate, nf_total_fat, serving_weight_grams } = food;
    //                 const nutrients = {
    //                     calories: nf_calories,
    //                     cholesterol: nf_cholesterol,
    //                     dietary_fiber: nf_dietary_fiber,
    //                     potassium: nf_potassium,
    //                     protein: nf_protein,
    //                     saturated_fat: nf_saturated_fat,
    //                     sodium: nf_sodium,
    //                     sugars: nf_sugars,
    //                     total_carbohydrate: nf_total_carbohydrate,
    //                     total_fat: nf_total_fat,
    //                     weight_grams: serving_weight_grams
    //                 }
    //                 this.setState({nutrients})
    //             })
    //     }
    // }

    render() {
        let { loading } = this.state;
        let { feg_nutrition } = this.props
        return (
            <div id="total_nutrition">
                {Object.values(feg_nutrition).reduce((acc, curr, i) => {
                    if (curr.length > 0) {
                        if (i == 0) {
                            return acc = curr
                        }
                        else if (i > 0) {
                            acc = curr.map((nutrient, i) => {
                                return [acc[i][0], acc[i][1] + nutrient[1]]
                            })
                        }
                    }
                    return acc
                }, []).map((nutrients, i) => {
                    return (
                        <div key={i}>
                            <p>Basket {nutrients[0]}: {Number(nutrients[1].toFixed(4))}</p>
                        </div>
                    )

                })}
            </div>
            // <div>
            //     Nutrition
            //     {
            //         loading ? <h1>Loading</h1> :
            //             <div>
            //                 <div>
            //                     {
            //                         Object.entries(this.state.nutrients).map(([key, value]) => `${key.split("_").map(words => capitalize(words)).join(" ")}: ${value}`).map((data, i) => {
            //                             return (
            //                                 <div key={i}>
            //                                 <p>{data.replace('_', ' ')}</p>
            //                                 </div>
            //                             )
            //                         })

            //                     }
            //                 </div>
            //             </div>
            //     }
            // </div>
        )
    }
}

export default Nutrition