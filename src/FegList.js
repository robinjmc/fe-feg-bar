import React, { Component } from 'react';
import { Link } from "react-router-dom";

import FegAmount from './FegAmount';
import Nutrition from './Nutrition'
import DisplayNutrition from './DisplayNutrition'
import numeral from 'numeral';
import update from 'immutability-helper';

class FegList extends Component {
    state = {
        loading: true,
        feg_list: [],
        fegRemoved: false,
        reset: false,
        add_feg: [],
        amount_change: false,
        nutrition: {},
        total_nutrition: {
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
            // nf_calories: 0,
            // nf_cholesterol: 0,
            // nf_dietary_fiber: 0,
            // nf_potassium: 0,
            // nf_protein: 0,
            // nf_saturated_fat: 0,
            // nf_sodium: 0,
            // nf_sugars: 0,
            // nf_total_carbohydrate: 0,
            // nf_total_fat: 0
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
        console.log(this.state)
        let { fegRemoved, reset, amount_change } = this.state
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
        if (amount_change) {
            fetch('https://feg-bar.herokuapp.com/api/feg_list')
                .then(res => {
                    return res.json()
                })
                .then(({ feg_list }) => {
                    this.setState({
                        loading: false,
                        feg_list: feg_list,
                        amount_change: false
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
    //             calories: 0,
    //             cholesterol: 0,
    //             dietary_fiber: 0,
    //             potassium: 0,
    //             protein: 0,
    //             saturated_fat: 0,
    //             sodium: 0,
    //             sugars: 0,
    //             total_carbohydrate: 0,
    //             total_fat: 0
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

    amount_change = (feg) => {
        if (feg === 'change') {
            this.setState({
                amount_change: true
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

    // display_nutrients = (view, e) => {
    //     e.preventDefault();
    //     if (view === 'show') {
    //         return display_feg = true;
    //     }
    //     else if (view === 'hide') {
    //         return display_feg = false
    //     }
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
        let feg_nutrition = {}
        console.log(feg_nutrition)
        return (
            <div>
                <div>
                    <h1>Feg Basket</h1>
                    {
                        feg_list.length > 0 ?
                            <div>
                                <Link to='/whats-in-guv'>
                                    {/* <button> */}
                                    <p>more feg</p>
                                    {/* </button> */}
                                </Link>
                                <div>
                                    <Nutrition feg_nutrition={feg_nutrition} />
                                </div>

                            </div>
                            : null}
                </div>
                <div id="whatsinfegcontainer">
                    {
                        loading ? <h1>Loading...</h1> :
                            <div id="whatsinfeg">
                                {
                                    feg_list.length > 0 ?
                                        feg_list.map(feg => {
                                            console.log(feg)
                                            let feg_name = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.feg_name[0].toUpperCase() + feg.feg_name.slice(1)
                                            feg_nutrition[feg.feg_name] = []
                                            // let display_feg = false;
                                            console.log(feg_nutrition, feg.feg_list_id)
                                            return (
                                                <div style={{ padding: "0px" }} key={feg.feg_list_id}>
                                                    <div id="feg_basket">
                                                        <h1>{feg_name}</h1>
                                                        <div >
                                                            <img id="feg_img_list" alt={feg.feg_type_id} src={feg.img_src} />
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-around", flexFlow: "row wrap" }}>
                                                            <div>
                                                            </div>
                                                            <div>
                                                                <FegAmount feg_list_id={`${feg.feg_list_id}`} feggie_id={`${feg.feggie_id}`} feg_name={feg.feg_name} img_src={feg.img_src} feg_amount={feg.amount} fegRemoved={this.fegRemoved} amount_change={this.amount_change} />

                                                            </div>

                                                            <div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {
                                                                // display_feg ?
                                                                // <form onSubmit={e => this.show_nutrients('hide', e, display_feg)}>
                                                                //     <button style={{ width: "100%", height: "100%", padding: "1em", fontFamily: "Arial Helvetica sans-serif", letterSpacing: "0.25em" }} >
                                                                //     nutrients
                                                                //     </button>
                                                                // </form>
                                                                // :
                                                                // <form onSubmit={e => this.show_nutrients('show', e, display_feg)}>
                                                                //     <button style={{ width: "100%", height: "100%", padding: "1em", fontFamily: "Arial Helvetica sans-serif", letterSpacing: "0.25em" }}>
                                                                //     nutrients
                                                                //     </button>
                                                                // </form>
                                                            }
                                                        </div>
                                                        <div >
                                                            {
                                                                feg.nutrients ?
                                                                    <div id="nutrients">
                                                                        {
                                                                            feg.nutrients.split('nf_').map(nutrient => {
                                                                                let breakdown = nutrient.split(',')
                                                                                let total_value = breakdown[1] ? Number((breakdown[1] * feg.amount).toFixed(4)) : breakdown[1]
                                                                                console.log(feg.feg_name)
                                                                                if (total[breakdown[0]] !== undefined) {
                                                                                    feg_nutrition[feg.feg_name].push([breakdown[0], total_value])
                                                                                    return (
                                                                                        <div >
                                                                                                <DisplayNutrition name={breakdown[0]} per_portion={breakdown[1]} total={total_value} />
                                                                                         </div>

                                                                                    )
                                                                                }
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
                                        <div>

                                            <Link to='/whats-in-guv'>
                                                {/* <button> */}
                                                <img alt="Get Me Feg!" src="https://media.giphy.com/media/2AL9ryaLCciMsqHYlr/giphy.gif" />
                                                {/* </button> */}
                                            </Link>
                                            <h2>Your basket is empty</h2>
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }

}

export default FegList;