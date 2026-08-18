import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductoListComponent } from '../producto-list/producto-list';
import { ProductoFormComponent } from '../producto-form/producto-form';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [MatTabsModule, ProductoListComponent, ProductoFormComponent],
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss'
})
export class InventarioComponent {
  // Controla qué se muestra DENTRO de la tab "Inventario": la tabla o el formulario
  vista = signal<'lista' | 'formulario'>('lista');
  productoEnEdicion = signal<Producto | null>(null);

  // Se llama cuando el usuario da clic en "+ Nuevo producto" desde la tabla
  abrirNuevo(): void {
    this.productoEnEdicion.set(null);
    this.vista.set('formulario');
  }

  // Se llama cuando el usuario da clic en "Editar" sobre una fila
  abrirEdicion(producto: Producto): void {
    this.productoEnEdicion.set(producto);
    this.vista.set('formulario');
  }

  // Se llama cuando el formulario guarda con éxito (crear o editar)
  onGuardado(): void {
    this.productoEnEdicion.set(null);
    this.vista.set('lista');
  }

  // Se llama cuando el usuario cancela el formulario
  onCancelado(): void {
    this.productoEnEdicion.set(null);
    this.vista.set('lista');
  }
}