const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const getPokemon = require("./lib/getPokemon");

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine','.hbs')

app.get('/', async (req, res) => {
    // let data = await getPokemon("ditto").catch ((err) => {
    //     console.log("Error:", err) 
    // });

    let data = await getPokemon(req.query.pokemon).catch ((err) => {
        console.log("Error:", err) 
    })
    

    let pokeObj = {
        name: data.forms[0].name,
        xp: data.base_experience,
        weight: data.weight, 
        height: data.height, 
        type: data.types[0].type.name,
        img: data.sprites.front_default,
        }


    res.render("index", {pokeObj})
    // console.log(data)
    // console.log(data.sprites.front_default)
    console.log(req.query.pokemon)

});

app.listen(3005,() => {
    console.log("Server listening on port 3005")
});