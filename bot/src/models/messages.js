const MessageEmbed = require('discord.js').MessageEmbed
const axios = require('axios')

exports.welcome = async() => {
    let messageEmbed = new MessageEmbed()
    messageEmbed.setColor('#006DC1')
    messageEmbed.setTitle('Beni sunucunuza eklediğiniz için teşekkürler :tada:')

    let commands = await axios.get('/command/')
    commands = commands.data

    let categories = await axios.get('/command-category')
    categories = categories.data

    let welcomeDescriptionText = ''

    welcomeDescriptionText += `Yuffien açık kaynak kodlu bir discord botudur.\n`

    if (commands && categories)
        welcomeDescriptionText += `Toplamda \`${categories.length}\` kategori de \`${commands.length}\` komut ile hizmet vermektedir. \n`

    if (categories) {
        categories.forEach(category => {
            let commandsText = ''

            category.commands.forEach(command => {
                commandsText += command.name + ` - ${command.shortName} - ${command.aliases.join(' ')}\n`
            })
            messageEmbed.addField(category.name, commandsText)
        })
    }

    messageEmbed.setDescription(welcomeDescriptionText)

    return messageEmbed
}