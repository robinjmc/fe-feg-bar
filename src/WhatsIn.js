import React, { Component } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
class WhatsIn extends Component {

    state = {
        loading: true
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
                    at_best: feggies
                })
                return fetch(`https://feg-bar.herokuapp.com/api/months/${this.state.month.months_id}/coming_in`)
            })
            .then(res => {
                return res.json()
            })
            .then(({ feggies }) => {
                this.setState({
                    coming_in: feggies
                })
                return fetch('https://feg-bar.herokuapp.com/api/feg_types')
            })
            .then(res => {
                return res.json()
            })
            .then(({ feg_types }) => {
                console.log(feg_types)
                this.setState({
                    feg_types: feg_types,
                    loading: false,
                    how_big: window.innerWidth
                })
            })
    }

    componentWillMount(){
            this.setState({height: window.innerHeight + 'px'});
        
            console.log(this.state.height)
    }

    postFeg = (feg, e) => {
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feggie_id}`, {
            method: 'POST',
            body: JSON.stringify(feg),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(body => {
                console.log(body)
                this.setState({
                    commentStatus: 'posted'
                })
            })
    }


    render() {
        let { at_best, coming_in, feg_types, loading } = this.state;
        // let size = window.innerWidth > 1700 ? 'feg_large' : 'feg_small'
        // let size = window.innerWidth > 1700 ? 'feg_small' : 'feg_small'
        return (
            <div>
                <h1>Groceries of the Week</h1>
                <Link to='/my-feg-list'>
                    <p>Basket</p>
                </Link>
                <div id="page">
                    <div id='fegCol'>
                    
                    </div>
                    <div>
                        <div id="whatsinfeg">
                            {
                                loading ? <p>Loading...</p> :
                                    at_best.map(feg => {
                                        console.log(window.innerWidth)
                                        let feg_name = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)

                                        return (

                                            <div style={{ padding: "10px" }} key={feg.at_best_id}>
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
                                                    <div>
                                                        <form onSubmit={e => this.postFeg({ feggie_id: `${feg.feggie_id}`, feg_name: feg.name, img_src: feg.img_src, amount: "1" }, e)}>
                                                            <button type="submit">+</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })

                                // groceries.filter(feg => {
                                //     return feg.at_its_best.includes(month._id)
                                // }).map(feg => {
                                //     let type = types.find(type => type._id === feg.type)
                                //     return (
                                //         <div style={{ padding: "10px" }} key={feg._id}>
                                //             <div id="feg">
                                //                 <h1>{feg.name}</h1>
                                //                 <div >
                                //                     <img id="feg_img" alt={feg.slug} src={feg.img_url} />
                                //                 </div>
                                //                 <div id="feg_info">
                                //                     <div>
                                //                         <h3>Available in</h3>
                                //                         <div >
                                //                             {
                                //                                 feg.season.map(available => {
                                //                                     let seas = seasons.find((s) => s._id === available)
                                //                                     return (
                                //                                         <div key={seas._id}>
                                //                                             <p>{seas.name}</p>
                                //                                         </div>
                                //                                     )
                                //                                 })
                                //                             }
                                //                         </div>
                                //                     </div>
                                //                     <div>
                                //                         <h3>Type</h3>
                                //                         <p>{type.name}</p>
                                //                     </div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     )
                            }
                        </div>
                        <h1>Coming Soon</h1>

                        <div id="whatsinfeg">

                            {
                                loading ? <p>Loading...</p> :
                                    coming_in.map(feg => {
                                        let feg_name = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)
                                        return (
                                            <div style={{ padding: "10px" }} key={feg.coming_in_id}>
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
                                    })
                            }
                        </div>
                    </div>
                    <div id='fegCol'>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default WhatsIn