import axios from 'axios'

const BASE_URL = process.env.VUE_APP_URL_BASE_API + '/?key=' + process.env.VUE_APP_TOKEN_API

const api = {
    getData: (url) => {
        return axios({
            method: 'GET',
            url : url,
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        })
    },

    getDataByLocalizacao : (latitude, longitude) => {
        let url = BASE_URL + '&lat=' + latitude + '&lon=' + longitude
        return api.getData(url)
    },

    findCidade: (cidade) => {
        let url = BASE_URL + '&city_name=' + cidade
        return api.getData(url)
    }
}

export default api