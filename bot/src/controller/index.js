const slugify = require('slugify')
const path = require('path')
const fs = require('fs')
const commandDirectory = '../commands'
const axios = require('axios')

const ProgressBar = require('progress')
var bar = new ProgressBar('[:current - controller]  :token1', { total: 2 })

module.exports.controller = async() => {
    bar.tick({
        token1: 'is started',
    })

    const categoryFiles = fs.readdirSync(path.join(__dirname, commandDirectory))

    for (let i = 0; i < categoryFiles.length; i++) {
        bar.tick({
            token1: `read a category files`,
        })
        const categoryFile = categoryFiles[i]
        const categoryPath = path.join(__dirname, `${commandDirectory}/${categoryFile}`)
        const category = require(categoryPath)

        category.shortName = slugify(category.name, '-').toLowerCase()

        bar.tick({
            token1: `read a ${category.shortName}`,
        })

        let savedCategory = await axios.post('/command-category/', category)
        savedCategoryID = savedCategory.data

        bar.tick({
            token1: `${category.shortName} id: ${savedCategoryID}`,
        })

        const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js') && file != 'index.js')
        bar.tick({
            token1: `read a category in command files`,
        })

        for (let j = 0; j < commandFiles.length; j++) {
            const commandFile = commandFiles[j]

            let command = require(`${categoryPath}/${commandFile}`)

            command.fileName = commandFile
            delete command.execute
            command.shortName = slugify(command.name, '-').toLowerCase()
            command.createdTime = Date.now()
            command.categoriesID = []
            command.categoriesID.push(savedCategoryID)

            bar.tick({
                token1: `read a ${command.shortName}`,
            })

            const savedCommand = await axios.post('/command/', { command })
            bar.tick({
                token1: `${command.shortName} is ${savedCommand.data}`,
            })
        }
    }

    // commandFiles.forEach(async file => {
    //     //.filter(file => file.endsWith('.js'))

    //     // let command = require(path.join(__dirname, `${commandDirectory}/${file}`))

    //     // command.fileName = file
    //     // delete command.execute
    //     // command.shortName = slugify(command.name, '-').toLowerCase()
    //     // command.createdTime = Date.now()
    //     // const savedCommand = await axios.post('/command/', { command })
    //     // console.log(savedCommand.data)
    // })
}