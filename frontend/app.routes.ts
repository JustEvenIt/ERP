import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductoListComponent } from './features/inventario/producto-list/producto-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventario', component: ProductoListComponent }
];