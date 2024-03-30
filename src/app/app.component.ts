import { Component, Input } from '@angular/core';
import { PokemonService } from './services/pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pokemon-services';
  @Input() public selected: number | null = 1;
  constructor(public pokemonService : PokemonService) {}
}
