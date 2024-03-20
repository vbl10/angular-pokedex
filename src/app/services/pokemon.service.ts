import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PokemonData } from '../models/pokemon_data';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${environment.pokeApiUrl}${id}`);
  }
}
