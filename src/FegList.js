import React, { Component } from 'react';
import { Link } from "react-router-dom";

class FegList extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        fetch('https://feg-bar.herokuapp.com/api/feg_list')
            .then(res => {
                return res.json()
            })
            .then(({ feg_list }) => {
                console.log(feg_list, 'hello')
                this.setState({
                    feg_list: feg_list
                })
                return fetch('https://feg-bar.herokuapp.com/api/feg_types')
            })
            .then(res => {
                return res.json()
            })
            .then(({ feg_types }) => {
                this.setState({
                    feg_types: feg_types,
                    loading: false
                })
            })
    }

    render() {
        const { feg_list, loading, feg_types } = this.state;
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
                                                        <div id="feg_info">
                                                            <div>
                                                                <h3>Type</h3>
                                                                <p>{feg_types.filter(type => type.feg_types_id === feg.feg_type_id)[0].feg_type_name}</p>
                                                            </div>
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