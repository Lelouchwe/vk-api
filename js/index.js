// https://oauth.vk.com/authorize?client_id=7469383&display=page&redirect_uri=&scope=messages&response_type=token&v=5.52

// d7e17e6549d51abcad291223fc3b2dc4493eac3ae39ae67ff9c96aceec3960e462710b2186efa3cd51f90

// https://api.vk.com/method/users.get?user_id=210700286&v=5.52
import fetchJsonp from 'fetch-jsonp'
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
// const rxOne = /^[\],:{}\s]*$/;
// const rxTwo = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
// const rxThree = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
// const rxFour = /(?:^|:|,)(?:\s*\[)+/g;
// const isJSON = (input) => (
//   input.length && rxOne.test(
//     input.replace(rxTwo, '@')
//       .replace(rxThree, ']')
//       .replace(rxFour, '')
//   )
// );
// let parse = () => {
//     const url = 'https://api.vk.com/method/messages.getDialogs?v=5.41&access_token=d7e17e6549d51abcad291223fc3b2dc4493eac3ae39ae67ff9c96aceec3960e462710b2186efa3cd51f90&count=10&offset=0'
//     fetch( url, {
//     mode: 'no-cors',    
//     method: 'GET'
//     })
//     .then(res => res.text())
//     .then(ress => isJSON(ress) ? JSON.parse(ress) : {})
//     .then( data => console.log(data))
//     // console.log(fetchVk, response)
// }
// parse()

