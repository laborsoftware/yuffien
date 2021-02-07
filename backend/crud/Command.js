const Command = require("../models/Command")


module.exports.add = async(command) => {
    try {
        const saveCommand = new Command(command);
        const savedCommand = await saveCommand.save();
        return ({ message: `${savedCommand.fileName} komutu başarıyla veritabanına eklendi.`, data: savedCommand })
    } catch (error) {
        return error.message
    }
}