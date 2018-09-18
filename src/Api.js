import moment from 'moment';

const baseURL = 'https://feg-bar.herokuapp.com/api/'

export const getAllFegTypes = () => {
  return fetch (`${baseURL}/feg_types`)
  .then(res => {
        return res.json()
    })
}
export const getAllMonths = () => {
    return fetch (`${baseURL}/months`)
    .then(res => {
            return res.json()
        })
}
export const getWhatsInByMonth = (season) => {
    return getAllMonths()
    .then(({months}) => {
        let date = moment().format('MMMM')
        const id =  months.find(month => month.month_name === date)
        return fetch (`${baseURL}/months/${id.months_id}/${season}`)
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