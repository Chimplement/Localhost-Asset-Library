const fs = require('fs');

const {assets_folder} = require("./config.json")

function get_categories() {
    var folders = fs.readdirSync(assets_folder);
    var categories = []
    var id = 1
    folders.forEach(folder => {
        categories.push({
            "id" : String(id),
            "name": folder,
            "type": "0"
        })
        id++
    });
    return categories
}

module.exports = {
    get_configuration : function() {
        return {"categories" : get_categories()}
    },

    get_category_id : function(category_name) {
        var id = "0"
        get_categories().forEach(category => {
            if (category["name"] == category_name)
                id = category["id"]
        });
        return id
    },

    get_category_name : function(category_id) {
        category_id = String(category_id)
        var name = ""
        get_categories().forEach(category => {
            if (category["id"] == category_id)
                name = category["name"]
        });
        return name
    }
}