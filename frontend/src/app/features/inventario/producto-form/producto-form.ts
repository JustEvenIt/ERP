import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss'
})
export class ProductoFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);

  @Input() producto: Producto | null = null;
  @Output() guardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  guardando = false;
  errorGuardado: string | null = null;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: ['', [Validators.maxLength(500)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
    unidadMedida: ['', [Validators.required]],
    precioUnitario: [0, [Validators.required, Validators.min(0)]],
    stockMinimo: [0, [Validators.min(0)]]
  });

  // Se ejecuta cada vez que el @Input "producto" cambia (al abrir editar o nuevo)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto']) {
      if (this.producto) {
        this.form.patchValue({
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          cantidad: this.producto.cantidad,
          unidadMedida: this.producto.unidadMedida,
          precioUnitario: this.producto.precioUnitario,
          stockMinimo: this.producto.stockMinimo
        });
      } else {
        this.form.reset({
          nombre: '', descripcion: '', cantidad: 0,
          unidadMedida: '', precioUnitario: 0, stockMinimo: 0
        });
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.errorGuardado = null;

    const v = this.form.getRawValue();
    const request = {
      nombre: v.nombre!,
      descripcion: v.descripcion ?? '',
      cantidad: v.cantidad!,
      unidadMedida: v.unidadMedida!,
      precioUnitario: v.precioUnitario!,
      stockMinimo: v.stockMinimo ?? 0
    };

    const peticion = this.producto
      ? this.productoService.actualizar(this.producto.id, request)
      : this.productoService.crear(request);

    peticion.subscribe({
      next: () => {
        this.guardando = false;
        this.guardado.emit();
      },
      error: (err) => {
        console.error('Error al guardar producto:', err);
        this.guardando = false;
        this.errorGuardado = 'No se pudo guardar el producto. Revisa los datos.';
      }
    });
  }

  cancelar(): void {
    this.cancelado.emit();
  }
}