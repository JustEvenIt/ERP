import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { InventarioComponent } from './features/inventario/inventario/inventario';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventario', component: InventarioComponent }
];