import React, { Component } from 'react';
import moment from 'moment';
class WhatsIn extends Component {

    state = {
        loading: true
        // groceries: fegData.groceries,
        // months: fegData.months,
        // origins: fegData.origins,
        // seasons: fegData.seasons,
        // types: fegData.types
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
                    loading: false
                })
            })
    }

    render() {
        // const { months, groceries, seasons, types, month } = this.state;
        let { at_best, coming_in, feg_types, loading } = this.state;
        // let date = moment().format('MMMM')
        //let [month] = months.filter(month => month.name === date)
        console.log(this.state)
        return (
            <div>
                <h1>Groceries of the Week</h1>

                <div id="whatsinfeg">

                    {
                        loading ? <p>Loading...</p> :
                            at_best.map(feg => {
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
        )
    }
}

export default WhatsIn