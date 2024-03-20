import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonData } from 'src/app/models/pokemon_data';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {
  @Input() public id: number = 1;
  public types: string[] = [];
  public img_url: string = "";
  public name: string = "";

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.service.getPokemon(this.id).subscribe({
      next: (resp: PokemonData): void => {
        this.types = resp.types.map((value) => value.type.name);
        this.img_url = resp.sprites.other.dream_world.front_default;
        this.name = resp.name[0].toUpperCase() + resp.name.slice(1);
      }
    })
  }

}
