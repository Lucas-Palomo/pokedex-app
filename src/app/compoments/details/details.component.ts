import {Component, OnInit} from '@angular/core';
import {PokedexService} from "../../services/pokedex.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pokemon} from "../../models/pokemon";
import {NgForOf, NgIf, ViewportScroller} from "@angular/common";
import {environment} from "../../../environment/environment";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  pokemon: Pokemon | null = null;
  loading: boolean = true;

  constructor(
    private scroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute,
    private pokedexService: PokedexService
  ) {
  }

  ngOnInit() {
    this.scroller.scrollToAnchor("pokemon")
    if (this.route.snapshot.params.hasOwnProperty('name')) {
      this.pokedexService.getPokemon(this.route.snapshot.params['name'])
        .subscribe({
          next: result => {
            this.pokemon = new Pokemon(result);
            this.title.setTitle(this.pokemon.title());
            this.meta.addTags(
              [
                {name: "description", content: `Pokemon ${this.pokemon.name}`},
                {name: "og:title", content: `Pokemon ${this.pokemon.name}`},
                {name: "og:url", content: `${environment.app+this.router.url}`}
              ]
            )
            this.loading = false
          },
          error: err => {
            this.router.navigateByUrl('/')
          }
        })
    }
  }

  getXML() {
    if (typeof open !== "undefined" && this.pokemon !== null) {
      open(environment.api + "/pokemons/" + this.pokemon.name + "/export", 'blank')
    }
  }
}
