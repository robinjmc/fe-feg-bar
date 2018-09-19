import moment from 'moment';

const baseURL = 'https://feg-bar.herokuapp.com/api'

export const getAllFegTypes = () => {
    return fetch(`${baseURL}/feg_types`)
        .then(res => {
            return res.json()
        })
}
export const getAllMonths = () => {
    return fetch(`${baseURL}/months`)
        .then(res => {
            return res.json()
        })
}
export const getWhatsInByMonth = (season) => {
    return getAllMonths()
        .then(({ months }) => {
            let date = moment().format('MMMM')
            const id = months.find(month => month.month_name === date)
            return fetch(`${baseURL}/months/${id.months_id}/${season}`)
        })
        .then(res => {
            return res.json()
        })
}

export const getFegList = () => {
    return fetch(`${baseURL}/feg_list`)
        .then(res => {
            return res.json()
        })
}

export const postFeg = (feg) => {
    return fetch(`${baseURL}/feg_list/${feg.feggie_id}`, {
        method: 'POST',
        body: JSON.stringify(feg),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            return res.json()
        })
}

export const changeFeg = (feg, change) => {
    return fetch(`${baseURL}/feg_list/${feg.feg_list_id}?amount=${change}`, {
      method: 'PUT',
      body: JSON.stringify(feg),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
}

export const deleteFeg = (feg) => {
    return fetch(`${baseURL}/feg_list/${feg.feg_list_id}`, {
      method: 'DELETE',
      body: JSON.stringify(feg),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      return res.json()
    })
}

export const getNutrition = (query) => {
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
}







// export const getArticlesByTopic = (slug) => {
//     return getAllTopics()
//     .then(res => {
//         if (res.ok) {
//             return res.json()
//         } else {
//             throw res;
//         }
//     })
//     .then(topics => {
//         const topic = topics.topics.find(topic => topic.slug === slug)
//         return fetch (`${baseURL}/topics/${topic._id}/articles`) 
//     })
// }