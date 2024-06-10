import { Routes } from '@angular/router';
import {DetailsComponent} from "./compoments/details/details.component";
import {GridComponent} from "./compoments/grid/grid.component";

export const routes: Routes = [
  {path: '', component: GridComponent},
  {path: "details/:name", component: DetailsComponent},
];
