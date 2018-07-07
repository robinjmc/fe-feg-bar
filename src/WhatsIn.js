import React, { Component } from 'react';
import fegData from './fegData.json'
import moment from 'moment';
console.log(fegData)
console.log(moment().format('MMMM'))
class WhatsIn extends Component {

    state = {
        groceries: fegData.groceries,
        months: fegData.months,
        origins: fegData.origins,
        seasons: fegData.seasons,
        types: fegData.types
    }

    render() {
        const { months, groceries, seasons, types } = this.state;
        let date = moment().format('MMMM')
        let [month] = months.filter(month => month.name === date)
        console.log(month)
        return (
            <div>
                <h1>Groceries of the Week</h1>
                <div>
                    {
                        groceries.filter(feg => {
                            return feg.at_its_best.includes(month._id)
                        }).map(feg => {
                            let type = types.find(type => type._id === feg.type)
                            return (
                                <div key={feg._id}>
                                    <h1>{feg.name}</h1>
                                    <h3>Available in</h3>
                                    <div>
                                        {
                                            feg.season.map(available => {
                                                let seas = seasons.find((s)=> s._id === available)
                                                return (
                                                <div key={seas._id}>
                                                    <p>{seas.name}</p>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <h3>Type</h3>
                                    <p>{type.name}</p>

                                </div>
                            )
                        })
                         //     groceries.filter(feg => {
                        //         console.log(feg.at_its_best)
                        //     if(feg.at_its_best.filter(best_month => best_month === month._id).length > 0) {
                        //         console.log('feg')
                        //         return (
                        //         <div key={feg._id}>
                        //         <h1>{feg.name}</h1>
                        //         <h3>Available in</h3>
                        //             <div>
                        //                 {
                        //                     feg.season.map(seas => {
                        //                         return (
                        //                             <p>{seasons.filter(season => season._id === seas)[0].name}</p>
                        //                         )
                        //                         }
                        //                     )
                        //                 }
                        //             </div>
                        //         </div>
                        //         )
                        //     }
                        // } 
                    }
                </div>
            </div>
        )
    }
}

export default WhatsIn