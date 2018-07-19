import React, { Component } from 'react';
import { Link } from "react-router-dom";

import FegAmount from './FegAmount';
import numeral from 'numeral';

class FegList extends Component {
    state = {
        loading: true,
        feg_list: [],
        fegRemoved: false,
        add_feg: [],
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
            total_fat: 0,
            weight_grams: 0,
            feg_amount: 0
        }
    }

    componentDidMount() {
        fetch('https://feg-bar.herokuapp.com/api/feg_list')
            .then(res => {
                return res.json()
            })
            .then(({ feg_list }) => {
                this.setState({
                    loading: false,
                    feg_list: feg_list
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        let { fegRemoved } = this.state
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
        if (prevState.total_nutrition !== this.state.total_nutrition) {
            this.setState({status: ''})
        }
    }

    fegRemoved = (feg) => {
        if (feg === 'removed') {
            this.setState({
                fegRemoved: true
            })
        }
    }

    calc_total = (nutrition) => {
        const total_nutrition = {}
        for(const key in this.state.total_nutrition){
                total_nutrition[key] = this.state.total_nutrition[key] + nutrition[key]
        }
        this.setState(() => ({
            total_nutrition
        }))
    }

    render() {
        const { feg_list, loading, total_nutrition:total } = this.state;
        console.log(feg_list)
        return (
            <div>
                <div>
                    <h1>Your Feg</h1>
                    {feg_list.length > 0 ?
                        <div>
                            <Link to='/whats-in-guv'><p>More Feg</p></Link>
                            <div id="total_nutrition">
                                <div>
                                    <p>Total Calories: {numeral(total.calories).format()}</p>
                                </div>
                                <div>
                                    <p>Total Cholesterol: {numeral(total.cholesterol).format()}</p>
                                </div>
                                <div>
                                    <p>Total Dietary Fiber: {numeral(total.dietary_fiber).format()}</p>
                                </div>
                                <div>
                                    <p>Total Potassium: {numeral(total.potassium).format()}</p>
                                </div>
                                <div>
                                    <p>Total Protein: {numeral(total.protein).format()}</p>
                                </div>
                                <div>
                                    <p>Total Saturated Fat: {numeral(total.saturated_fat).format()}</p>
                                </div>
                                <div>
                                    <p>Total Sodium: {numeral(total.sodium).format()}</p>
                                </div>
                                <div>
                                    <p>Total Sugars: {numeral(total.sugars).format()}</p>
                                </div>
                                <div>
                                    <p>Total Total Carbohydrates: {numeral(total.total_carbohydrate).format()}</p>
                                </div>
                                <div>
                                    <p>Total Saturated Fat: {numeral(total.saturated_fat).format()}</p>
                                </div>
                                <div>
                                    <p>Total Total Fat: {numeral(total.total_fat).format()}</p>
                                </div>
                                <div>
                                    <p>Total Feg: {numeral(total.feg_amount).format()}</p>
                                </div>
                                <div>
                                    <p>Total Weight (g): {numeral(total.weight_grams).format()}</p>
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
                                            let feg_name = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.feg_name[0].toUpperCase() + feg.feg_name.slice(1)
                                            return (
                                                <div style={{ padding: "10px" }} key={feg.feg_list_id}>
                                                    <div id="feg">
                                                        <h1>{feg_name}</h1>
                                                        <div >
                                                            <img id="feg_img" alt={feg.feg_type_id} src={feg.img_src} />
                                                        </div>
                                                        <div >
                                                            <FegAmount feg_list_id={`${feg.feg_list_id}`} feggie_id={`${feg.feggie_id}`} feg_name={feg.feg_name} img_src={feg.img_src} feg_amount={feg.amount} fegRemoved={this.fegRemoved} calc_total={this.calc_total} />
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