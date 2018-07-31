import React, { Component } from 'react'

class FegData extends Component {
    state = {
        query: '',
        at_best: [],
        coming_in: [],
        query_length: 0,
        status: '',
        loading: true,
        feg_name: '',
        item: ''

    }
    get_query = (feg_lists) => {
        return feg_lists.map( feg_list => {
            return feg_list.reduce((acc, curr, i, list) => {
            const name = curr.name.split("_") ? curr.name.split("_").join(' ') : curr.name
            if (i === list.length - 1) {
                acc += '1' + ' ' + name;
            } else {
                acc += '1' + ' ' + name + ' ';
            }
            this.setState({
                query_length: feg_list.length
            })
            return acc;
        }, '')
    }).join(' ')
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.coming_in !== nextProps.coming_in) {
            this.setState({
                coming_in: nextProps.coming_in
            })
        }

        if (this.props.at_best !== nextProps.at_best) {
            this.setState({
                at_best: nextProps.at_best
            })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        const { coming_in, at_best, query, query_length, status } = this.state
        if(status !== 'stop' && coming_in[0] !== undefined &&  at_best[0] !== undefined){
            this.setState({
                query: this.get_query([coming_in, at_best]),
                status: 'stop'
            })
        }
        if(prevState.query_length  !== query_length){
            return fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-app-id': process.env.REACT_APP_NUTRITION_ID,
                        'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
                        'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
                    },
                    body: JSON.stringify({
                        'query': `${query}`,
                        'timezone': "US/Eastern"
                    })
                })
                .then(res => {
                                return res.json()
                })
                .then(({foods}) => {
                    this.props.update(foods)
                    this.setState({
                        feg_nutrients: foods,
                        loading: false
                    })
                })
        }
    }


    render() {
        return(
            <h1> </h1>
        )
       
    }

}


export default FegData;