export type PokemonData = {
    id: string,
    name: string,
    types: {
        type: {
            name: string
        }
    }[],
    sprites: {
        other: {
            "dream_world": {
                front_default: string
            },
            "official-artwork": {
                front_default: string
            }
        }
    }
}