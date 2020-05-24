const request = require('request-promise')
const fs = require('fs')
const access_token = '9260783e225d8e3e3c28ff9b440ce8efa5a83119a4ed0afea931cd00a9cb639da2fcefb446a79972801cf'

let getDialogs = async (access, start_message_id) => {
    const options = {
        method: 'GET',
        uri: `https://api.vk.com/method/messages.getDialogs?v=5.41&access_token=${access}&count=200&start_message_id=${start_message_id}&offset=0`,
        json: true,
    }
   let {response} = await request(options)
   let list = []
    for(let item of response.items){
        list.push(item.message.user_id)
    }
   return list
}
let getHistory = async (access, userID) => {
    const options = {
        method: 'GET',
        uri: `https://api.vk.com/method/messages.getHistory?v=5.41&access_token=${access}&user_id=${userID}&offset=0`,
        json: true,
    }
    let {response} = await request(options)
    return response.items
}
let getCountMessage = async (access) => {
    const options = {
        method: 'GET',
        uri: `https://api.vk.com/method/messages.getDialogs?v=5.41&access_token=${access}&count=0&start_message_id=0&offset=0`,
        json: true,
    }
    let {response} = await request(options)
    return response.count
}
let parse = async () => {
    let allDialogs = []
    let i = 0
    let count = await getCountMessage(access_token)
    // do {
    //     let list = await getDialogs(access_token,i)
    //     allDialogs.push(...list)
    //     i += 200
    // } while (i<=count)
    // await fs.writeFile('alldialogs.txt', allDialogs, (error, data) => console.log(data))
    let reading = await fs.readFileSync('alldialogs.txt', 'utf-8').split(',')

    for(let i=8; i<11; i++){
        let filterMassage = [], tempArr = [], numbArr = []
        let dialog = await getHistory(access_token,reading[i])
        let question = ''
        let answere = ''
        let predOut = 0
        let n = 0
        let nPred = 0
        let bodyString = ''
        for(let [index, item] of dialog.reverse().entries()){
            if(item.out === 0){
                question+= item.body+', '
                if(predOut !== item.out){
                    nPred = n
                    n++
                }
                predOut = item.out
                numbArr[n] = question
                answere = ''
            } else {
                answere+= item.body+', '
                if(predOut !== item.out){
                    nPred = n
                    n++
                }
                predOut = item.out
                numbArr[n] = answere
                question = ''
            }
        }
        numbArr.forEach(item => filterMassage.push(item.replace(/\n/g, ' ').slice(0,-2)))
        if(filterMassage.length % 2 !== 0 )
            filterMassage.pop()
        filterMassage = filterMassage.map(item => item.replace(/"/g, "'") )
        console.log(filterMassage)
        for(let i = 0; i<filterMassage.length; i+=2){
            // allDialogs.push(`"${filterMassage[i]}" , "${filterMassage[i+1]}"\n`) 
            await fs.appendFileSync('datasetvyatsu.csv', `"${filterMassage[i]}","${filterMassage[i+1]}"\n`)
        }
        // allDialogs.push(`"${question}","${answere}"\n`)
        // allDialogs.push(`${question}`+','+`${answere}`)
        // console.log(tempArr)
        // console.log(filterMassage)

        // console.log(dialog);
        
    }
    // await fs.writeFileSync('datasetvyatsu.txt', allDialogs)
    // let allMassages = []
    // for (let item of list) {
    //     allMassages.push(await getHistory(item))
    // }
    // console.log(allMassages)
    // let list = await getCountMessage(access_token)
    // console.log(list)
    // console.log(allDialogs)
}


parse()


module.exports = parse