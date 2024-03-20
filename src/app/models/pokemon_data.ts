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
            dream_world: {
                front_default: string
            }
        }
    }
}