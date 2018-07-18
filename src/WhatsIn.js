import React, { Component } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
class WhatsIn extends Component {

    state = {
        loading: true,
        page: 0
    }

    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
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
                    at_best: this.chunkArray(this.shuffle(feggies), 1) 
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
                // console.log(feg_types)
                this.setState({
                    feg_types: feg_types,
                    loading: false,
                    how_big: window.innerWidth
                })
            })
    }
    componentDidUpdate(prevProps, prevState){
       if(prevState.page !== this.state.page){
            this.setState({
                navigate:''
            })
       }
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

    order = (set_length) => {
        let feggiedex = []
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        for (let f = 0; f < set_length; f++) {
            const random = getRandomInt(set_length)
            if (!feggiedex.includes(random) || feggiedex.indexOf(random) === -1) {
                console.log(feggiedex.includes(random), random, 'doesnt')
            feggiedex.push(getRandomInt(set_length))
            } else {
                console.log(random)
            }
        }
        return feggiedex;
    }

    
    more_feg = (arr, e) => {
        console.log('more')
        let {page} = this.state
    e.preventDefault();
    if(page < arr.length - 1){
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
        const {page} = this.state
        e.preventDefault();
        if(page > 0){
            this.setState({
                page: page - 1,
                navigate: 'less' 
            })
        }else{
            this.setState({
                page: arr.length - 1,
                navigate: 'top'
            })
        }
        
    }

    render() {
        let { at_best, coming_in, feg_types, loading, page } = this.state;
        // let best_length = at_best ? at_best.length : 0;
        // let best = at_best ? at_best : [];
        // let coming_length = coming_in ? coming_in.length : 0;
        // // let best_order = this.order(best_length)
        // // let chunked_n_shuffled = this.chunkArray(this.shuffle(best), 1)
        // console.log(chunked_n_shuffled)
        // // console.log(this.shuffle(best))
        // console.log(this.chunkArray(best, 6)[0])
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
                        <div>
                        <form onSubmit={e => this.less_feg(at_best, e)}>
                        <button type="submit">
                            left
                            </button>
                            </form>
                            </div>
                            {
                                loading ? <p>Loading...</p> :
                                
                                    // best_order.map(bestdex => {
                                    //     let feg = at_best[bestdex]
                                    at_best[page].map(feg => {
                                            // let feg = at_best[bestdex]
                                        let feg_name = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)

                                        return (

                                            <div style={{ padding: "10px" }} key={feg.at_best_id}>
                                                <div id="feg">
                                                    
                                                    <div >
                                                        <img id="feg_img" alt={feg.feg_type_id} src={feg.img_src} />
                                                    </div> 
                                                    
                                                    <h1>{feg_name}</h1>
                                                    <div id="feg_info">
                                                        <div>
                                                             {/* <h3>Type</h3> */}
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
                                //     })
                                //         // at_best.map(feg => {
                                //         //     let feg_name = /_/g.test(feg.name) ? feg.name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.name[0].toUpperCase() + feg.name.slice(1)

                                //         //     return (

                                //         //         <div style={{ padding: "10px" }} key={feg.at_best_id}>
                                //         //             <div id="feg">
                                //         //                 <h1>{feg_name}</h1>
                                //         //                 <div >
                                //         //                     <img id="feg_img" alt={feg.feg_type_id} src={feg.img_src} />
                                //         //                 </div>
                                //         //                 <div id="feg_info">
                                //         //                     <div>
                                //         //                         <h3>Type</h3>
                                //         //                         <p>{feg_types.filter(type => type.feg_types_id === feg.feg_type_id)[0].feg_type_name}</p>
                                //         //                     </div>
                                //         //                 </div>
                                //         //                 <div>
                                //         //                     <form onSubmit={e => this.postFeg({ feggie_id: `${feg.feggie_id}`, feg_name: feg.name, img_src: feg.img_src, amount: "1" }, e)}>
                                //         //                         <button type="submit">+</button>
                                //         //                     </form>
                                //         //                 </div>
                                //         //             </div>
                                //         //         </div>
                                //         //     )
                                //         // })
                                // }
                            }
                            <div>
                           <form onSubmit={e => this.more_feg(at_best, e)}>
                            <button>    
                                right
                            </button>
                            </form>
                            </div>
                        </div>
                        <h1>Coming Soon</h1>

                        <div id="whatsinfeg">

                            {
                                loading ? <p>Loading...</p> :
                                    coming_in.map(feg => {
                                        // console.log(feg)
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