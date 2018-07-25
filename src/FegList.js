import React, { Component } from 'react';
import { Link } from "react-router-dom";

import FegAmount from './FegAmount';
import numeral from 'numeral';

class FegList extends Component {
    state = {
        loading: true,
        feg_list: [],
        fegRemoved: false,
        reset: false,
        add_feg: [],
        total_nutrition: {
            nf_calories: 0,
            nf_cholesterol: 0,
            nf_dietary_fiber: 0,
            nf_potassium: 0,
            nf_protein: 0,
            nf_saturated_fat: 0,
            nf_sodium: 0,
            nf_sugars: 0,
            nf_total_carbohydrate: 0,
            nf_total_fat: 0
        }
    }

    componentDidMount() {
        fetch('https://feg-bar.herokuapp.com/api/feg_list')
            .then(res => {
                return res.json()
            })
            .then(({ feg_list }) => {
                console.log(feg_list)
                this.setState({
                    loading: false,
                    feg_list: feg_list,
                    reset: false
                })
            })
    }

    // componentDidMount() {
    //     fetch('https://feg-bar.herokuapp.com/api/feg_list')
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(({ feg_list }) => {
    //             this.setState({
    //                 loading: false,
    //                 feg_list: feg_list,
    //                 reset: false
    //             })
    //             let query = feg_list.reduce((acc, curr, i, list) => {
    //                 const name = curr.feg_name.split("_") ? curr.feg_name.split("_").join(' ') : curr.feg_name
    //                 console.log(name, curr.amount, i, list.length)
    //                 if(i === list.length - 1){
    //                     acc += curr.amount+ ' ' + name;
    //                 } else {
    //                     acc += curr.amount+ ' ' + name+ ' ';
    //                 }
    //                 return acc
    //             }, '')
    //             return query
    //         })
    //         .then(query => {
    //             console.log(query)
    //             return fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json',
    //                     'x-app-id': process.env.REACT_APP_NUTRITION_ID,
    //                     'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
    //                     'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
    //                 },
    //                 body: JSON.stringify({
    //                     'query': `${query}`,
    //                     'timezone': "US/Eastern"
    //                 })
    //             })
    //         })
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(({foods}) => {
    //             console.log(foods)
    //             foods.map(food => this.calc_total(food))
    //         })
    // }

    componentDidUpdate(prevProps, prevState) {
        let { fegRemoved, reset } = this.state
        if (fegRemoved) {
            fetch('https://feg-bar.herokuapp.com/api/feg_list')
                .then(res => {
                    return res.json()
                })
                .then(({ feg_list }) => {
                    this.setState({
                        loading: false,
                        feg_list: feg_list,
                        fegRemoved: false
                    })
                })
        }
    }
    //     if (reset) {
    //         fetch('https://feg-bar.herokuapp.com/api/feg_list')
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(({ feg_list }) => {
    //             this.setState({
    //                 loading: false,
    //                 feg_list: feg_list,
    //                 reset: false
    //             })
    //             let query = feg_list.reduce((acc, curr, i, list) => {
    //                 const name = curr.feg_name.split("_") ? curr.feg_name.split("_").join(' ') : curr.feg_name
    //                 if(i === list.length - 1){
    //                     acc += curr.amount + ' ' + name;
    //                 } else {
    //                     acc += curr.amount + ' ' + name + ' ';
    //                 }
    //                 console.log(acc)
    //                 return acc;
    //             }, '')
    //             return query
    //         })
    //         .then(query => {
    //             console.log(query)
    //             return fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json',
    //                     'x-app-id': process.env.REACT_APP_NUTRITION_ID,
    //                     'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
    //                     'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
    //                 },
    //                 body: JSON.stringify({
    //                     'query': `${query}`,
    //                     'timezone': "US/Eastern"
    //                 })
    //             })
    //         })
    //         .then(res => {
    //             return res.json()
    //         })
    //         .then(({foods}) => {
    //             console.log(foods)
    //             foods.map(food => this.calc_total(food))
    //         })
    //     }
    // }

    // reset_nutrients = (feg) => {
    //     if(feg === 'reset')
    //     this.setState({
    //         reset: true,
    //         total_nutrition: {
    //             nf_calories: 0,
    //             nf_cholesterol: 0,
    //             nf_dietary_fiber: 0,
    //             nf_potassium: 0,
    //             nf_protein: 0,
    //             nf_saturated_fat: 0,
    //             nf_sodium: 0,
    //             nf_sugars: 0,
    //             nf_total_carbohydrate: 0,
    //             nf_total_fat: 0
    //         }
    //     })
    // }

    fegRemoved = (feg) => {
        if (feg === 'removed') {
            this.setState({
                fegRemoved: true
            })
        }
    }

    // calc_total = (nutrition) => {

    //     const total_nutrition = {}
    //     for (const key in this.state.total_nutrition) {
    //         console.log(nutrition[key], nutrition.food_name)
    //         total_nutrition[key] = this.state.total_nutrition[key] + nutrition[key]
    //     }
    //     this.setState(() => ({
    //         total_nutrition
    //     }))
    // }

    calculate = (value, rda) => {
        console.log(value, rda)
        let load = value ? numeral(value).format() : 'calculating'
        // if(rda){
        //     return `${numeral((value / rda) * 100).format()} % GDA`
        // } else {
        return load;
        // }
    }

    render() {
        const { feg_list, loading, total_nutrition: total } = this.state;
        return (
            <div>
                <div>
                    <h1>Your Feg</h1>
                    {
                        feg_list.length > 0 ?
                        <div>
                            <Link to='/whats-in-guv'><p>More Feg</p></Link>
                            <div id="total_nutrition">
                                <div>
                                    <p>Total Calories: {this.calculate(total.nf_calories, 2500)}</p>
                                </div>
                                {/* <div>
                                    <p>Total Cholesterol: {this.calculate(total.nf_cholesterol)}</p>
                                </div> */}
                                <div>
                                    <p>Total Dietary Fiber: {this.calculate(total.nf_dietary_fiber, 24)}</p>
                                </div>
                                {/* <div>
                                    <p>Total Potassium: {this.calculate(total.nf_potassium)}</p>
                                </div> */}
                                <div>
                                    <p>Total Protein: {this.calculate(total.nf_protein, 55)}</p>
                                </div>
                                <div>
                                    <p>Total Saturated Fat: {this.calculate(total.nf_saturated_fat, 30)}</p>
                                </div>
                                {/* <div>
                                    <p>Total Sodium: {this.calculate(total.nf_sodium)}</p>
                                </div> */}
                                <div>
                                    <p>Total Sugars: {this.calculate(total.nf_sugars, 120)}</p>
                                </div>
                                <div>
                                    <p>Total Carbohydrates: {this.calculate(total.nf_total_carbohydrate, 300)}</p>
                                </div>
                                <div>
                                    <p>Total Fat: {this.calculate(total.nf_total_fat, 95)}</p>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div id="whatsinfeg">
                    {
                        loading ? <h1>Loading...</h1> :
                            <div>
                                {
                                    feg_list.length > 0 ?
                                        feg_list.map(feg => {
                                            console.log(feg)
                                            let feg_name = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.feg_name[0].toUpperCase() + feg.feg_name.slice(1)
                                            return (
                                                <div style={{ padding: "10px" }} key={feg.feg_list_id}>
                                                    <div id="feg">
                                                        <h1>{feg_name}</h1>
                                                        <div >
                                                            <img id="feg_img" alt={feg.feg_type_id} src={feg.img_src} />
                                                        </div>
                                                        <div >
                                                            <FegAmount feg_list_id={`${feg.feg_list_id}`} feggie_id={`${feg.feggie_id}`} feg_name={feg.feg_name} img_src={feg.img_src} feg_amount={feg.amount} fegRemoved={this.fegRemoved} /> 
                                                        </div>
                                                        {/* calc_total={this.calc_total} reset={this.reset_nutrients} */}
                                                        <div >
                                                        {
                                                            feg.nutrients ? 
                                                            <div id="nutrients">
                                                                {
                                                                    feg.nutrients.split('nf_').map(nutrient => {
                                                                        let breakdown = nutrient.split(',')
                                                                        return(
                                                                            <div id="nutrient">
                                                                            <p>{breakdown[0]}</p>
                                                                            <p>{breakdown[1]}</p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    }
                                                                </div>
                                                                : <p>nutrients coming soon</p>
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                        <Link to='/whats-in-guv'>
                                            <button>
                                                <h1>Get Me Feg!</h1>
                                            </button>
                                        </Link>
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }

}

export default FegList;