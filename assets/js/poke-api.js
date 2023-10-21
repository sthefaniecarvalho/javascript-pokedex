
function convertPokemonApiDetailToPokemon(pokemonDetail) {
     const pokemon = new Pokemon()
     pokemon.number = pokemonDetail.id
     pokemon.name = pokemonDetail.name
     pokemon.height = pokemonDetail.height
     pokemon.weight = pokemonDetail.weight

     const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
     const [type] = types

     pokemon.types = types
     pokemon.type = type

     pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

     return pokemon
}

const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
     return fetch(pokemon.url)
            .then((response) => response.json()) 
            .then(convertPokemonApiDetailToPokemon) 
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
     .then((response) => response.json())
     .then((jsonBody) => jsonBody.results)
     .then((pokemons)  => pokemons.map(pokeApi.getPokemonDetail))
     .then((detailRequest) => Promise.all(detailRequest))
     .then((pokemonsDetails) => pokemonsDetails)
     .catch((error) => console.error(error))
}

