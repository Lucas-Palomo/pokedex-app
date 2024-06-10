import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {PokedexService} from "../../services/pokedex.service";
import {Pokemon} from "../../models/pokemon";
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {of} from "rxjs";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    InfiniteScrollDirective
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit {

  pokemons = new Array<Pokemon>();
  grid_pokemons = new Array<Pokemon>();
  load_size = 9
  offset = this.load_size;


  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    this.pokedexService
      .getListOfPokemonUrls()
      .subscribe(pokemons => {
        this.pokemons = pokemons.map(pokemon => new Pokemon(pokemon))
        this.grid_pokemons = this.pokemons.slice(0, this.offset)
      });

  }

  load() {
    this.offset += this.load_size
    this.grid_pokemons = this.pokemons.slice(0, this.offset)
  }
}
