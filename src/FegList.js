import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {getFegList} from "./Api"
import FegAmount from './FegAmount';
import DisplayNutrition from './DisplayNutrition'
import numeral from 'numeral';
// import update from 'immutability-helper';
import BasketHeader from './BasketHeader';

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
        }
    }

    componentDidMount() {
        getFegList()
            .then(({ feg_list }) => {
                this.setState({
                    loading: false,
                    feg_list: feg_list,
                    reset: false
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        let { fegRemoved, amount_change } = this.state
        if (fegRemoved) {
            getFegList()
                .then(({ feg_list }) => {
                    this.setState({
                        loading: false,
                        feg_list: feg_list,
                        fegRemoved: false
                    })
                })
        }
        if (amount_change) {
            getFegList()
                .then(({ feg_list }) => {
                    this.setState({
                        loading: false,
                        feg_list: feg_list,
                        amount_change: false
                    })
                })
        }
    }

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

    calculate = (value) => {
        let load = value ? numeral(value).format() : 'calculating'
        return load;
    }

    render() {
        const { feg_list, loading, total_nutrition: total } = this.state;
        let feg_nutrition = {}
        let feggie_nut = []
        return (
            <div>
                <div>
                    <h1>Feg Basket</h1>
                    {
                        feg_list.length > 0 ?
                            <div class="button">
                                <Link to='/whats-in-guv'>
                                    {/* <button> */}
                                    <p>more feg</p>
                                    {/* </button> */}
                                </Link>
                            </div>
                            : null
                    }
                    <BasketHeader feg_nutrition={feg_nutrition} feggie_nut={feggie_nut}/>
                </div>
                <div id="whatsinfegcontainer">
                    {
                        loading ? <h1>Loading...</h1> :
                            <div id="whatsinfeg">
                                {
                                    feg_list.length > 0 ?
                                        [...feg_list].map(feg => {
                                            let feg_name = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.feg_name[0].toUpperCase() + feg.feg_name.slice(1)
                                            feg_nutrition[feg.feg_name] = []
                                            feggie_nut.push(feg.feg_name)
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
                                                                feg.nutrients ?
                                                                    <div id="nutrients">
                                                                        {
                                                                            feg.nutrients.split('nf_').map(nutrient => {
                                                                                let breakdown = nutrient.split(',')
                                                                                let total_value = breakdown[1] ? Number((breakdown[1] * feg.amount).toFixed(4)) : breakdown[1]
                                                                                if (total[breakdown[0]] !== undefined) {
                                                                                    feg_nutrition[feg.feg_name].push([breakdown[0], total_value])
                                                                                    feggie_nut.push([breakdown[0], total_value])
                                                                                    return (
                                                                                        <div >
                                                                                            <DisplayNutrition name={breakdown[0]} per_portion={breakdown[1]} total={total_value} />
                                                                                        </div>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                    <div></div>
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