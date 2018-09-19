import React, { Component } from 'react';

import { capitalize } from 'lodash';

class DisplayNutrition extends Component {
    state = {
        portion_display: false,
        total_display: false
    }

    toggle = (display, view, e) => {
        let close = display.includes('total') ? 'portion_display' : 'total_display'
        e.preventDefault();
        if (view === 'show') {
            this.setState({
                [display]: true,
                [close]: false
            })
        }
        else if (view === 'hide') {
            this.setState({
                [display]: false
            })
        }
    }

    render() {
        let { portion_display, total_display } = this.state
        let { name, per_portion, total } = this.props
        let exec_total = name.split('total_').join('')
        let nutrient_name = exec_total.split('_').map(words => capitalize(words)).join(" ")
        return (
            <div id="nutrient_row">
                <div id="nutrient">
                    <p >{nutrient_name}</p>
                    {portion_display ?
                        <div>
                            <p>{per_portion}</p>
                        </div>
                        : null}
                    {total_display ?
                        <div>
                            <p>{total}</p>
                        </div>
                        : null}
                </div>
                <div id="nutrient" style={{ alignContent: "flex-end", width: "100%", font: "5px bold" }}>
                    {
                        portion_display ?
                            <form onSubmit={e => this.toggle('portion_display', 'hide', e)}>
                                <button class="button" style={{ width: "80%", height: "0%", padding: "0.4em", fontSize: "2em", fontFamily: "Arial Helvetica sans-serif", letterSpacing: "0.25em" }} >
                                    per portion
                            </button>
                            </form>
                            :
                            <form onSubmit={e => this.toggle('portion_display', 'show', e)}>
                                <button class="button" style={{ width: "80%", height: "0%", padding: "0.4em", fontSize: "2em", fontFamily: "Arial Helvetica sans-serif", letterSpacing: "0.25em" }}>
                                    per portion
                            </button>
                            </form>
                    }
                    {
                        total_display ?
                            <form style={{ color: "green" }} onSubmit={e => this.toggle('total_display', 'hide', e)} >
                                <button class="button" style={{ width: "80%", height: "0%", padding: "0.4em", fontSize: "2em", fontFamily: "Arial Helvetica sans-serif", letterSpacing: "0.25em" }}>
                                    total
                            </button>
                            </form>
                            :
                            <form onSubmit={e => this.toggle('total_display', 'show', e)}>
                                <button class="button" style={{ width: "80%", height: "0%", padding: "0.4em", fontSize: "2em", fontFamily: "Arial Helvetica sans-serif", letterSpacing: "0.25em" }}>
                                    total
                            </button>
                            </form>

                    }
                </div>

            </div>
        )
    }
}

export default DisplayNutrition;