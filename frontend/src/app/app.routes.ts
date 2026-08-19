import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout';
import { HomeComponent } from './features/home/home';
import { InventarioComponent } from './features/inventario/inventario/inventario';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'inventario', component: InventarioComponent },
      // Aquí se agregan producción, compras, etc. cuando existan
    ]
  }
];