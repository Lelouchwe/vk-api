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
//    Поскольку метод возвращает массив объектов диалогов, с различными метаданными, а нам понадобяться только их id
//    извлечем их добавим в массив
    for(let item of response.items){
        list.push(item.message.user_id)
    }
   return list
}
let getHistory = async (access, userID) => {
    const options = {
        method: 'GET',
        uri: `https://api.vk.com/method/messages.getHistory?v=5.41&access_token=${access}&count=200&user_id=${userID}&offset=0`,
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

    for(let i=170; i<180; i++){
        let filterMassage = [], tempArr = [], numbArr = []
        let dialog = await getHistory(access_token,reading[i],200)
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
        // поскольку вместе с сообщениями сохраняются символы переноса строк, которые будут мешать в дальнейшем, необходимо из сразу убрать. С помощью цикла получаем каждое сообщение и регулярным выражением убираем ненужные символы
        numbArr.forEach(item => filterMassage.push(item.replace(/\n/g, ' ').slice(0,-2)))
        // в диалогах могут встречаться не нужные слова по типа "спасибо", которые не еффективны для обучающей выборки. Поскольку такие сообщения всегда являются последними, на которые не последует ответа, или же диалоги в которых нет ответа, являются нечетными, поэтому убираем их
        if(filterMassage.length % 2 !== 0 )
            filterMassage.pop()
        // заменяем все встречающиеся в тексте двойные ковычки на одинарные т.к. они помешают в формирование csv файла
        filterMassage = filterMassage.map(item => item.replace(/"/g, "'") )
        console.log(filterMassage)
        // сохраням полученые диалоги в csv файле на локальной машине
        for(let i = 0; i<filterMassage.length; i+=2){
            await fs.appendFileSync('datasetvyatsu.csv', `"${filterMassage[i]}","${filterMassage[i+1]}"\n`)
        }
    }
}


parse()


module.exports = parse