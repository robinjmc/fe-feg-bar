import React, { Component } from 'react';
import { Link } from "react-router-dom";

import FegAmount from './FegAmount'

class FegList extends Component {
    state = {
        loading: true,
        feg_list: [],
        fegRemoved: false
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

    componentDidUpdate(prevProps, prevState){
        let {fegRemoved} = this.state
        if(fegRemoved){
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

    fegRemoved = (feg) => {
        if(feg === 'removed'){
            this.setState({
                fegRemoved: true
            })
        }
    }

    render() {
        const { feg_list, loading } = this.state;
        console.log(feg_list)
        return (
            <div>
                <div>
                    <h1>Your Feg</h1>
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
                                                            <FegAmount feg_list_id={`${feg.feg_list_id}`} feggie_id={`${feg.feggie_id}`} feg_name={feg.feg_name} img_src={feg.img_src} feg_amount={feg.amount} fegRemoved={this.fegRemoved}/>
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