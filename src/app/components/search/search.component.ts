import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public search: string = "";
  public results: string[] = [];
  public list: string = '';
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
  }

  onInput(event: any) {
    const search = event.target.value;
    if (search.length > 0) {

      if (this.pokemonService) {
        this.results = this.pokemonService.searchByName(search);
        this.list = this.results.join("\n");
      }
    }
    else {
      this.results = [];
    }
  }
}
