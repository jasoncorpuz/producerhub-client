import config from '../config'
// import TokenService from './token-service'

const ApiService = {
    getAllSongs() {
        return fetch(`${config.API_ENDPOINT}/songs/`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getSongById(id) {
        return fetch(`${config.API_ENDPOINT}/songs/${id}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getSongByUserId(userId) {
        return fetch(`${config.API_ENDPOINT}/songs/user/${userId}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getAllLikes(){
        return fetch(`${config.API_ENDPOINT}/likes/`)
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getLikesByUserId(userId) {
        return fetch(`${config.API_ENDPOINT}/likes/user/${userId}`)
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getLikesBySongId(songId) {
        return fetch(`${config.API_ENDPOINT}/likes/song/${songId}`)
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getAllUsers(){
        return fetch(`${config.API_ENDPOINT}/users/`)
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getUserbyId(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`)
         .then(res =>  
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    createUser(userInfo) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'content-type': 'application/json'
            }
        })
         .then(res => {
             (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              :res.json()
         })
        .catch(e => console.log(e))
    },
    upload(song) {
        return fetch(`${config.API_ENDPOINT}/upload`, {
            method: 'POST',
            body: song
        })
        .then(res => {
            (!res.ok)
             ? res.json().then(e => Promise.reject(e))
             :res.json()
        })
       .catch(e => console.log(e))
         
    }
}


export default ApiService;