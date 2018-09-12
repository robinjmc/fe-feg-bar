import React, { Component } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";

import FegData from './FegData';
import AddToBasket from './AddToBasket'
class WhatsIn extends Component {
    state = {
        loading: true,
        page: 0,
        amount_added: 0,
        soon_display: false,
        amount_display: 1,
        at_best_shuffled: [],
        feg_data: [],
        at_best: []
    }

    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    chunkArray = (array, chunk) => {
        const newArray = [...array]
        let results = [];
        while (newArray.length) {
            results.push(newArray.splice(0, chunk));
        }
        return results;
    }

    componentDidMount() {
        fetch('https://feg-bar.herokuapp.com/api/months')
            .then(res => {
                return res.json()
            })
            .then(({ months }) => {
                let date = moment().format('MMMM')
                let [month] = months.filter(month => month.month_name === date)
                this.setState({
                    month: month
                })
                return fetch(`https://feg-bar.herokuapp.com/api/months/${month.months_id}/at_best`)
            })
            .then(res => {
                return res.json()
            })
            .then(({ feggies }) => {
                this.setState({
                    at_best_shuffled: this.shuffle(feggies)
                })
                return fetch(`https://feg-bar.herokuapp.com/api/months/${this.state.month.months_id}/coming_in`)
            })
            .then(res => {
                return res.json()
            })
            .then(({ feggies }) => {
                this.setState({
                    coming_in: feggies,
                    at_best: this.chunkArray(this.state.at_best_shuffled, this.state.amount_display)
                })
                return fetch('https://feg-bar.herokuapp.com/api/feg_types')
            })
            .then(res => {
                return res.json()
            })
            .then(({ feg_types }) => {
                this.setState({
                    feg_types: feg_types,
                    loading: false,
                    how_big: window.innerWidth
                })
            })
    }
    componentDidUpdate(prevProps, prevState) {
        let { page, feg_status, amount_added, amount_display, at_best_shuffled } = this.state
        if (prevState.page !== page) {
            this.setState({
                navigate: ''
            })
        }
        if (prevState.feg_status !== feg_status && feg_status === 'posted') {
            this.setState({
                amount_added: amount_added + 1,
                feg_status: ''
            })
        }
        if (prevState.amount_display !== amount_display || prevState.at_best_shuffled !== at_best_shuffled) {
            this.setState({
                amount_display: amount_display,
                at_best: this.chunkArray(at_best_shuffled, this.state.amount_display)
            })
        }
    }

    post_feg = (e) => {
        this.setState({
            feg_status: 'posted'
        })
    }

    more_feg = (arr, e) => {
        console.log('more')
        let { page } = this.state
        e.preventDefault();
        if (page < arr.length - 1) {
            this.setState({
                page: page + 1,
                navigate: 'more'
            })
        } else {
            this.setState({
                page: 0,
                navigate: 'bottom'
            })
        }
    }

    less_feg = (arr, e) => {
        const { page } = this.state
        e.preventDefault();
        if (page > 0) {
            this.setState({
                page: page - 1,
                navigate: 'less'
            })
        } else {
            this.setState({
                page: arr.length - 1,
                navigate: 'top'
            })
        }
    }

    toggle_soon = (view, e) => {
        e.preventDefault();
        if (view === 'show') {
            this.setState({
                soon_display: true
            })
        }
        else if (view === 'hide') {
            this.setState({
                soon_display: false
            })
        }
    }

    handleOptionChange = (changeEvent) => {
        this.setState({ amount_display: +changeEvent.target.value });
    }

    update_data = (data) => {
        this.setState({
            feg_data: data
        })
    }

    render() {
        let { at_best, coming_in, loading, page, amount_added, soon_display, amount_display, at_best_shuffled, feg_data } = this.state;
        let col_width = amount_display === 1 || amount_display === 3 ? { "width": "100%" } : null
        let next_height = amount_display === 1 ? { "height": "34em" } : amount_display === 3 ?{ "height": "112em" } : null
        console.log(at_best[page] ? true : false, at_best, page)
        return (
            <div>
                <FegData coming_in={coming_in} at_best={at_best_shuffled} update={this.update_data} />
                {loading || feg_data.length === 0 || at_best.length === 0 ? <img alt="Loading..." src="https://gph.to/2NDvU2D" /> :
                    <div>
                        <div id="header">
                            <div id="header_col"></div>
                            <div id="header_col"></div>
                            <div id="header_col">
                                <h1>Fegbar</h1>
                                <h4><i>Who's in this week?</i></h4>
                            </div>
                            <div id="header_col"></div>
                            <div id="header_col">
                                <Link to='/my-feg-list'>
                                    <div id="basket" >
                                        <div id="basket_col"></div>
                                        <i id="basket_col" className="fas fa-shopping-basket"></i>
                                        <div id="basket_col" ><p><sup>{amount_added ? amount_added : null}</sup></p></div>
                                    </div>
                                    <p >Basket</p>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <form style={{ "display": "flex", "flexFlow": "row", "justifyContent": "center", "alignItems": "center" }}>
                                <div className="radio" id="display">
                                    <label>
                                        <input type="radio" value={1} checked={amount_display === 1} onChange={this.handleOptionChange} />
                                        1
                                    </label>
                                </div>
                                <div className="radio" id="display">
                                    <label>
                                        <input type="radio" value={3} checked={amount_display === 3} onChange={this.handleOptionChange} />
                                        3
                                    </label>
                                </div>
                                <div className="radio" id="display">
                                    <label>
                                        <input type="radio" value={6} checked={amount_display === 6} onChange={this.handleOptionChange} />
                                        6
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div id="page">
                            <div id='fegCol'></div>
                            <div id='whatsin'>
                                <div id="whatsinfegcontainer" style={next_height}>
                                    <div id="more_feg" style={col_width}>
                                        <form id="more_form" onSubmit={e => this.less_feg(at_best, e)} >
                                            <button className="button" id="more_button" type="submit">|</button>
                                        </form>
                                    </div>
                                    <div id="whatsinfeg">
                                        {
                                            at_best[page] ? at_best[page].map(feg => {
                                                let lower = /_/g.test(feg.name) ? feg.name.split('_').join(' ') : feg.name
                                                let upper = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)
                                                let [food] = feg_data ? feg_data.filter(feg => feg.food_name === lower) : null
                                                let image = food ? food.photo.highres : feg.img_src
                                                let entries = food ? Object.entries(food).filter(key => key[0].match(/nf_/g)) : null
                                                let nutrients = entries === null ? `${[["nf_calories", 0], ["nf_total_fat", 0], ["nf_saturated_fat", 0], ["nf_cholesterol", 0], ["nf_sodium", 0], ["nf_total_carbohydrate", 0], ["nf_dietary_fiber", 0], ["nf_sugars", 0], ["nf_protein", 0], ["nf_potassium", 0], ["nf_p", 0]]}` : `${entries}`
                                                return (
                                                    <div id='smallerBox' style={{ padding: "0px" }} key={feg.at_best_id}>
                                                        <div id="feg">
                                                            <h1 style={{ height: "3em" }} >{upper}</h1>
                                                            <div>
                                                                <AddToBasket feggie_id={`${feg.feggie_id}`} feg_name={feg.name} img_src={image} nutrients={nutrients} posted={this.post_feg} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : <div></div>
                                        }

                                    </div>
                                    <div id="more_feg" style={col_width} >
                                        <form style={{ width: "100%", height: "100%" }} onSubmit={e => this.more_feg(at_best, e)}>
                                            <button className="button" id="more_button">|</button>
                                        </form>
                                    </div>
                                </div>
                                <div style={{ padding: "3em" }}>
                                    {soon_display ?
                                        <form onSubmit={e => this.toggle_soon('hide', e)}>
                                            <button className="button">Coming Soon</button>
                                        </form>
                                        :
                                        <form onSubmit={e => this.toggle_soon('show', e)}>
                                            <button className="button">Coming Soon</button>
                                        </form>
                                    }
                                </div>
                                <div id="whatsinfeg">
                                    {soon_display ?
                                        loading ? <p>Loading...</p> :
                                            coming_in.map(feg => {
                                                let lower = /_/g.test(feg.name) ? feg.name.split('_').join(' ') : feg.name
                                                let upper = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)
                                                let [food] = feg_data ? feg_data.filter(feg => feg.food_name === lower) : null
                                                let image = food ? food.photo.highres : feg.img_src
                                                return (
                                                    <div style={{ padding: "10px" }} key={feg.coming_in_id}>
                                                        <div id="feg">
                                                            <h1>{upper}</h1>
                                                            <div >
                                                                <img id="feg_img" alt={feg.name} src={image} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        : null
                                    }
                                </div>
                            </div>
                            <div id='fegCol'></div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default WhatsIn