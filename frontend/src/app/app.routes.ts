import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { ProductoListComponent } from './features/inventario/producto-list/producto-list';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventario', component: ProductoListComponent }
];