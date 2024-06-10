import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  public getListOfPokemonUrls(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(environment.api+"/pokemons")
      .pipe(
        map((response: Pokemon[]) => response.map(entry => entry))
      )
  }

  public getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.api+"/pokemons/"+name)
      .pipe(
        map((response) => response),
      )
  }

}
