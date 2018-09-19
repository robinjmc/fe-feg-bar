import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { shuffle, chunkArray } from "./Utils"
import { getAllFegTypes, getWhatsInByMonth } from "./Api"
import FegData from './FegData';
import CurrentFeg from "./CurrentFeg";

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

    componentDidMount() {
        let at_best = getWhatsInByMonth('at_best');
        let coming_in = getWhatsInByMonth('coming_in');
        let feg_types = getAllFegTypes();
        return Promise.all([at_best, coming_in, feg_types])
            .then((values) => {
                let best = values[0].feggies
                let coming_in = values[1].feggies
                let { feg_types } = values[2]
                let at_best_shuffled = shuffle(best)
                this.setState({
                    at_best_shuffled,
                    at_best: chunkArray(at_best_shuffled, this.state.amount_display),
                    coming_in,
                    feg_types,
                    loading: false,
                    how_big: window.innerWidth
                });
            });
    };

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
                at_best: chunkArray(at_best_shuffled, this.state.amount_display)
            })
        }
    }

    post_feg = (e) => {
        this.setState({
            feg_status: 'posted'
        })
    }

    more_feg = (arr, e) => {
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
        let next_height = amount_display === 1 ? { "height": "34em" } : amount_display === 3 ? { "height": "112em" } : null
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
                                    <p>Basket</p>
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
                                        <form id="more_form" onSubmit={e => this.less_feg(at_best, e)}>
                                            <button className="button" id="more_button" type="submit">|</button>
                                        </form>
                                    </div>
                                    <div id="whatsinfeg">
                                        <CurrentFeg feggies={at_best[page]} feg_data={feg_data} posted={this.post_feg} best={true} />
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
                                            <CurrentFeg feggies={coming_in} feg_data={feg_data} posted={this.post_feg} best={false} />
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