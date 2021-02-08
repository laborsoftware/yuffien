const CommandCategory = require('../models/CommandCategory')

module.exports.add = async category => {
    // const newCategory = new CommandCategory({
    //     name: "Eğlence",
    //     description: "Birbirinden eğlenceli komutlar burada!"
    // })

    const newCategory = new CommandCategory(category)
    try {
        const savedCategory = await newCategory.save()
        if (savedCategory)
            return {
                message: `${savedCategory.name} kategorisi başarıyla veritabanına eklendi.`,
                data: savedCategory,
            }
    } catch (error) {
        return error.message
    }
}