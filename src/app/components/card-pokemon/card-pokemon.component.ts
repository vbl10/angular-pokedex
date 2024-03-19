import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {
  @Input() public types: string[] = [];
  @Input() public img_url: string = "";
  @Input() public name: string = "";

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
  }

}
