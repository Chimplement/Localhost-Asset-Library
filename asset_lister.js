const fs = require('fs');
const path = require('path');

const configurer = require('./configurer.js')

const {assets_folder, port} = require("./config.json")

function get_modify_date(file) {
    var modify_date = fs.statSync(file).mtime
    return `${modify_date.getFullYear()}-${modify_date.getMonth() + 1}-${modify_date.getDate()} ${modify_date.getHours()}:${modify_date.getMinutes()}:${modify_date.getSeconds()}`
}

function create_asset_data(asset_folder, id = 1) {
    const base_data = require(`${asset_folder}/data.json`)

    var category_name = asset_folder.split("/")[2]

    var data = {
        "asset_id": String(id), //fix
        "title": base_data.title,
        "author": (base_data.author ? base_data.author : "Unknown Author"),
        "author_id": "1",
        "category": category_name,
        "category_id": configurer.get_category_id(category_name),
        "godot_version": base_data.godot_version,
        "rating": "0",
        "cost": "",
        "support_level": (base_data.support_level ? base_data.support_level: "community"),
        "icon_url": `http://127.0.0.1:${port}/asset-library/api/download/icon/${category_name}/${asset_folder.split("/")[3]}`.replaceAll(" ", "%20"),
        "version": (base_data.version ? base_data.version: "1"),
        "version_string": (base_data.version_string ? base_data.version_string : "1.0.0"),
        "modify_date": get_modify_date(`${asset_folder}/asset.zip`)
    }
    return data
}

function get_assets_in_category(category_name, id_start = 1) {
    var asset_folders = fs.readdirSync(`${assets_folder}/${category_name}`);

    var assets = []

    var id = id_start
    asset_folders.forEach(asset_folder => {
        assets.push(create_asset_data(`${assets_folder}/${category_name}/${asset_folder}`, id))
        id++
    });

    return assets
}

function get_assets() {
    var category_folders = fs.readdirSync(assets_folder);
    
    var assets = []

    category_folders.forEach(category_name => {
        assets.push.apply(assets, get_assets_in_category(category_name, assets.length + 1))
    });

    return assets
}

function get_asset_folder(id = 1) {
    var category_folders = fs.readdirSync(assets_folder);

    var path = ""

    var id_counter = 1
    category_folders.forEach(category_name => {
        var asset_folders = fs.readdirSync(`${assets_folder}/${category_name}`);

        if (!path)
            asset_folders.forEach(asset_folder => {
                if (id_counter == id)
                    path =`${assets_folder}/${category_name}/${asset_folder}`
                id_counter++
            });
    });

    return path
}

module.exports = {
    list_assets : function(paramns) {
        var assets = []
        if (paramns.get("category"))
            assets = get_assets_in_category(configurer.get_category_name(paramns.get("category")))
        else
            assets = get_assets()

        var assets = assets.filter(asset => { 
            if (paramns.get("filter"))
                if (!asset.title.toLowerCase().includes(paramns.get("filter").toLowerCase()))
                    return false
            
            if (paramns.get("support"))
                if (!paramns.get("support").split(" ").includes(asset.support_level))
                        return false

            return true
        });
        
        return {
            "result": assets,
            "page": "0",
            "pages": "1",
            "page_length": "40",
            "total_items": String(assets.length)
        }
    },

    create_asset_data_full : function(id = 1) {
        const asset_folder = get_asset_folder(id)
        if (!asset_folder)
            return
        const base_data = require(`${asset_folder}/data.json`)
        const category_name = asset_folder.split("/")[2]

        var data = {
            "asset_id": String(id),
            "type": base_data.type,
            "title": base_data.title,
            "author": (base_data.author ? base_data.author : "Unknown Author"),
            "author_id": "1",
            "version": (base_data.version ? base_data.version: "1"),
            "version_string": (base_data.version_string ? base_data.version_string: "1.0.0"),
            "category": category_name,
            "category_id": configurer.get_category_id(category_name),
            "godot_version": base_data.godot_version,
            "rating": "0",
            "cost": "",
            "description": (base_data.description ? base_data.description: ""),
            "support_level": (base_data.support_level ? base_data.support_level: "community"),
            "download_provider": "Localhost Asset Library",
            "browse_url": `http://127.0.0.1:${port}/`,
            "issues_url": `http://127.0.0.1:${port}/`,
            "icon_url": `http://127.0.0.1:${port}/asset-library/api/download/icon/${category_name}/${asset_folder.split("/")[3]}`.replaceAll(" ", "%20"),
            "searchable": "1",
            "modify_date": get_modify_date(`${asset_folder}/asset.zip`),
            "download_url": `http://127.0.0.1:${port}/asset-library/api/download/asset/${category_name}/${asset_folder.split("/")[3]}`.replaceAll(" ", "%20"),
            "previews": [],
            "download_hash":""
        }
        return data
    }
}