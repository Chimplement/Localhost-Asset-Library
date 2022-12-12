const http = require('http');
const fs = require('fs');

const configurer = require('./configurer.js')
const asset_lister = require('./asset_lister.js')

const {assets_folder, port} = require('./config.json')

function handle_download(request, response) {
    var rest_url = request.url.replace("/asset-library/api/download","")
    var download_path = rest_url.replace("/asset", "").replace("/icon", "").replaceAll("%20", " ")
    
    if (rest_url.startsWith("/asset")) {
        response.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-disposition': 'attachment; filename=asset.zip'
        });
        fs.createReadStream(`${assets_folder}${download_path}/asset.zip`).pipe(response)
    
    } else if (rest_url.startsWith("/icon")) {
        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-disposition': 'attachment; filename=icon.png'
        });
        fs.createReadStream(`${assets_folder}${download_path}/icon.png`).pipe(response)
    }
    
}

function handle_api_request(request, response) {
    response.writeHead(200);

    if (request.url.startsWith("/asset-library/api/configure")) {
        response.end(JSON.stringify(configurer.get_configuration()))
    
    } else if (request.url.startsWith("/asset-library/api/asset/")) {
        var id = Number(request.url.replace("/asset-library/api/asset/", ""))
        response.end(JSON.stringify(asset_lister.create_asset_data_full(id)))
    
    } else if (request.url.startsWith("/asset-library/api/download")) {
        handle_download(request, response)

    } else if (request.url.startsWith("/asset-library/api/asset?")) {
        response.end(JSON.stringify(
            asset_lister.list_assets(new URLSearchParams(request.url.replace("/asset-library/api/asset?", "")))
        ))
    
    } else {
        response.writeHead(404);
        response.end('Page Not Found')
    }
}

function requestListener(request, response) {
    console.log(request.url)

    if (request.url.startsWith("/asset-library/api")) {
        handle_api_request(request, response)
        return
    }

    if (request.url.startsWith("/stop")) {
        response.writeHead(200);
        response.end('Stopping Localhost Asset Library')
        process.exit(0)
    }

    response.writeHead(200);
    response.end(fs.readFileSync("./index.html"))
}

const server = http.createServer(requestListener);
server.listen(port);