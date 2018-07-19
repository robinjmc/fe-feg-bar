import React, { Component } from 'react';

class Nutrition extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        let { amount, feg } = this.props
        let name_format = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').join(' ') : feg.feg_name;
        fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-app-id': process.env.REACT_APP_NUTRITION_ID,
                'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
                'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
            },
            body: JSON.stringify({
                'query': `${amount} ${name_format}`,
                'timezone': "US/Eastern"
            })
        })
            .then(res => {
                return res.json()
            })
            .then(({ foods }) => {
                let [food] = foods;
                let { nf_calories, nf_cholesterol, nf_dietary_fiber, nf_potassium, nf_protein, nf_saturated_fat, nf_sodium, nf_sugars, nf_total_carbohydrate, nf_total_fat, serving_weight_grams } = food;
                console.log(feg)
                this.setState({
                    calories: nf_calories,
                    cholesterol: nf_cholesterol,
                    dietary_fiber: nf_dietary_fiber,
                    potassium: nf_potassium,
                    protein: nf_protein,
                    saturated_fat: nf_saturated_fat,
                    sodium: nf_sodium,
                    sugars: nf_sugars,
                    total_carbohydrate: nf_total_carbohydrate,
                    total_fat: nf_total_fat,
                    weight_grams: serving_weight_grams,
                    feg_amount: amount,
                    feg_name: name_format,
                    loading: false
                })
            })

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(typeof this.state.feg_name, 'update')
        let { amount } = this.props;
        let { feg_name } = this.state;
        if (prevProps.amount !== amount && this.state.feg_name) {
            fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-app-id': process.env.REACT_APP_NUTRITION_ID,
                    'x-app-key': process.env.REACT_APP_NUTRITION_KEY,
                    'x-remote-user-id': process.env.REACT_APP_NUTRITION_USER
                },
                body: JSON.stringify({
                    'query': `${amount} ${feg_name}`,
                    'timezone': "US/Eastern"
                })
            })
                .then(res => {
                    return res.json()
                })
                .then(({ foods }) => {
                    let [food] = foods;
                    let { nf_calories, nf_cholesterol, nf_dietary_fiber, nf_potassium, nf_protein, nf_saturated_fat, nf_sodium, nf_sugars, nf_total_carbohydrate, nf_total_fat, serving_weight_grams } = food;
                    this.setState({
                        calories: nf_calories,
                        cholesterol: nf_cholesterol,
                        dietary_fiber: nf_dietary_fiber,
                        potassium: nf_potassium,
                        protein: nf_protein,
                        saturated_fat: nf_saturated_fat,
                        sodium: nf_sodium,
                        sugars: nf_sugars,
                        total_carbohydrate: nf_total_carbohydrate,
                        total_fat: nf_total_fat,
                        weight_grams: serving_weight_grams,
                        feg_amount: amount
                    })
                })
        }
    }


    nutrition_table = (feg_info) => {
        let table = [];
        for (let i = 0; i < 1; i++) {
            let children = []
            for (let nutrition in feg_info) {
                if (nutrition !== 'loading' || nutrition !== 'feg_amount' || nutrition !== 'feg_name') {
                    children.push(<td>{`${nutrition}`}: {`${feg_info[nutrition]}`}</td>)
                }
            }
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    render() {
        let { calories, cholesterol, dietary_fiber, potassium, protein, saturated_fat, sodium, sugars, total_carbohydrate, total_fat, weight_grams, loading } = this.state;
        // let info = this.state
        return (
            <div>
                Nutrition
                {
                    loading ? <h1>Loading</h1> :
                        <div>
                            <p>Calories: {calories}</p>
                            <p>Cholesterol: {cholesterol}</p>
                            <p>Dietary Fiber: {dietary_fiber}</p>
                            <p>Potassium: {potassium}</p>
                            <p>Protein: {protein}</p>
                            <p>Saturated Fat: {saturated_fat}</p>
                            <p>Sodium: {sodium}</p>
                            <p>Sugars: {sugars}</p>
                            <p>Total Carbohydrate: {total_carbohydrate}</p>
                            <p>Total Fat: {total_fat}</p>
                            <p>Weight (g): {weight_grams}</p>
                        </div>
                }
            </div>
        )
    }
}

export default Nutrition