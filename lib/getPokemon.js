const request = require('request');
const { promisify } = require('util');
const fs = require('fs-extra');

const promisfifiedRequest = promisify(request);


const getPokemon = async (name) => {
    let data = await promisfifiedRequest({
        uri: `https://pokeapi.co/api/v2/pokemon/${name}/`,
        // json: false
        
    })
     
    .catch ((err) => {
    console.log("Error:", err)
        
    })

    fs.writeFileSync("./lib/pokemon.json", data.body);
    let object = JSON.parse(data.body)
    return object
};

module.exports = getPokemon;