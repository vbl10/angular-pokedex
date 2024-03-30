import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonData } from 'src/app/models/PokemonData';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css'],
})
export class CardPokemonComponent implements OnInit {
  @Input() public id: number | string = 1;
  public types: string[] = [];
  public img_url: string = '';
  public name: string = '';

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.service.getPokemon(this.id).subscribe({
      next: (resp: PokemonData): void => {
        this.types = resp.types.map((value) => value.type.name);
        let a = resp.sprites.other['dream_world'].front_default;
        let b = resp.sprites.other['official-artwork'].front_default;
        this.img_url = a ? a : b;
        this.name = resp.name[0].toUpperCase() + resp.name.slice(1);
      },
    });
  }
}
