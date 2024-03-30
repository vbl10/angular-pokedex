import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PokemonData } from '../../models/PokemonData';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemons: string[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<{ count: number }>(environment.pokeApiUrl + '?limit=1')
      .subscribe({
        next: (resp: { count: number }) => {
          this.http
            .get<PokeApiResponseStruct>(
              `${environment.pokeApiUrl}?limit=${resp.count}`
            )
            .subscribe({
              next: (resp: PokeApiResponseStruct) => {
                this.pokemons = resp.results.map((value) => value.name);
                this.pokemons = radix_sort_strings(this.pokemons);
              },
            });
        },
      });
  }

  getPokemon(id: number | string): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${environment.pokeApiUrl}${id}`);
  }

  searchByName(search: string): string[] {
    function is_ordered(str1: string, str2: string): boolean {
      for (let i = 0; i < str1.length && i < str2.length; i++) {
        let a = char_value(str1[i]);
        let b = char_value(str2[i]);
        if (a < b) {
          return true;
        } else if (a > b) {
          return false;
        }
      }
      return str1.length <= str2.length;
    }

    //binary search
    let i = 0,
      j = 0;
    for (i = 0, j = this.pokemons.length; j > i; ) {
      let str = this.pokemons[Math.floor((i + j) / 2)];
      if (is_ordered(search, str)) {
        j = Math.floor((i + j) / 2);
      } else {
        i = Math.floor((i + j) / 2 + 1);
      }
    }

    //list all that match
    let result: string[] = [];
    for (let k = i; k < this.pokemons.length; k++) {
      let substr = this.pokemons[k].slice(0, search.length);
      if (
        substr.indexOf(search) != -1 ||
        search.indexOf(this.pokemons[k]) != -1
      ) {
        result.push(this.pokemons[k]);
      } else {
        break;
      }
    }
    return result;
  }
}

function max(a: number, b: number): number {
  return a > b ? a : b;
}
function char_value(char: string): number {
  return char.charCodeAt(0) > 'z'.charCodeAt(0) ||
    char.charCodeAt(0) < 'a'.charCodeAt(0)
    ? 0
    : char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

function radix_sort_strings(arr: string[]): string[] {
  let front: string[] = arr;
  let back: string[] = [];
  back.length = arr.length;

  let max_str_size: number = 0;
  for (let i = 0; i < arr.length; i++)
    max_str_size = max(max_str_size, arr[i].length);

  function prefix_index(str: string, bit: number) {
    return bit >= str.length ? 0 : char_value(str[bit]);
  }

  let prefix_sum: number[] = [];
  prefix_sum.length = 27;
  for (let ch = max_str_size - 1; ch >= 0; ch--) {
    prefix_sum.fill(0);
    let i = 0;
    //count prefixes
    for (; i < arr.length; i++) {
      prefix_sum[prefix_index(front[i], ch)]++;
    }
    //sum prefix elements
    for (let j = 1; j < 27; j++) {
      prefix_sum[j] += prefix_sum[j - 1];
    }
    //update back
    for (i--; i >= 0; i--) {
      back[--prefix_sum[prefix_index(front[i], ch)]] = front[i];
    }
    //swap back and front
    let tmp = front;
    front = back;
    back = tmp;
  }
  return front;
}

type PokeApiResponseStruct = {
  results: {
    name: string;
  }[];
};
