// https://oauth.vk.com/authorize?client_id=7469383&display=page&redirect_uri=&scope=messages&response_type=token&v=5.52

// d7e17e6549d51abcad291223fc3b2dc4493eac3ae39ae67ff9c96aceec3960e462710b2186efa3cd51f90

// https://api.vk.com/method/users.get?user_id=210700286&v=5.52
// import fetchJsonp from './fetch-jsonp'
// let fetchJsonp = require('fetch-jsonp')
// import fetchJsonp from './node_modules/fetch-jsonp/build/fetch-jsonp'
let parse = async () => {
    const URL = 'https://api.vk.com/method/messages.getDialogs?v=5.41&access_token=d7e17e6549d51abcad291223fc3b2dc4493eac3ae39ae67ff9c96aceec3960e462710b2186efa3cd51f90&count=10&offset=0'
    let fetchVk = await fetchJsonp(URL, {
    mode: 'no-cors',
    // headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // },    
    method: 'GET',
    // credentials: 'include',
    })
    let response = await fetchVk.json()
    // return await fetchVk.json()
    console.log(response)
}
parse()



