import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatIconModule, MatButtonModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {
  // Controla si el menú lateral está abierto o cerrado (útil para pantallas pequeñas)
  sidenavAbierto = signal(true);

  toggleSidenav(): void {
    this.sidenavAbierto.update(v => !v);
  }

  // Centraliza los módulos del ERP; agregar uno nuevo aquí lo agrega al menú automáticamente
  modulos = [
    { label : 'Home', ruta: '/', icono:'home'},
    { label: 'Inventario', ruta: '/inventario', icono: 'inventory_2' },
    { label: 'Producción', ruta: '/produccion', icono: 'precision_manufacturing' },
    { label: 'Compras', ruta: '/compras', icono: 'shopping_cart' },
  ];
}