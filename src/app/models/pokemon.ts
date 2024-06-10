import {environment} from "../../environment/environment";

export class Pokemon {
  id: string = ""
  external_id: number = 0
  name: string = ""
  weight: number = 0
  height: number = 0
  types: string[] = []
  hp: number = 0
  speed: number = 0
  attack: number = 0
  defense: number = 0
  images: { cover: string, animated: { back: string, front: string } } = {cover: "", animated: {back: "", front: ""}}

  constructor(data: Pokemon) {
    this.id = data.id;
    this.external_id = data.external_id;
    this.name = data.name;
    this.weight = data.weight;
    this.height = data.height;
    this.types = data.types;
    this.hp = data.hp;
    this.speed = data.speed;
    this.attack = data.attack
    this.defense = data.defense
    this.images = data.images;
  }

  public cover(): string {
    return environment.api + this.images.cover
  }

  public animated(): { back: string, front: string } {
    return {back: environment.api + this.images.animated.back, front: environment.api + this.images.animated.front}
  }

  public title(): string {
    return this.name.charAt(0).toUpperCase() + this.name.substring(1)
  }

}
