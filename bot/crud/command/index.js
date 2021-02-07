const slugify = require("slugify");
const path = require("path")
const fs = require("fs")
const commandDirectory = "../../commands";
const axios = require("axios")
axios.defaults.baseURL = process.env.API;

module.exports.controller = async() => {
    const commandFiles = fs.readdirSync(path.join(__dirname, commandDirectory)).filter((file) => file.endsWith(".js"));
    commandFiles.forEach(async(file) => {
        let command = require(path.join(__dirname, `${commandDirectory}/${file}`));

        command.fileName = file;
        delete command.execute
        command.shortName = slugify(command.name, "-").toLowerCase();
        command.createdTime = Date.now();
        const savedCommand = await axios.post("/command/add", { command })
        console.log(savedCommand.data)
    })
}