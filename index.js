const URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

fetch(URL)
  .then(response => response.json())
  .then(data => {
    const pokemonPromises = data.results.map(pokemon => {
      return fetch(pokemon.url).then(response => response.json());
    });

    Promise.all(pokemonPromises).then(pokemons => {
      const mappedPokemons = pokemons.map(pokemon => {
        return {
          nome: pokemon.name,
          tipo: pokemon.types[0].type.name,
          peso: pokemon.weight,
          altura: pokemon.height,
          numeroDex: pokemon.id,
          imagem: pokemon.sprites.front_default,
        };
      });

      const fs = require('fs');

      fs.writeFile('pokemon.json', JSON.stringify(mappedPokemons, null, 2), err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Dados dos Pokemons salvos com sucesso!');
        }
      });
    });
  });
