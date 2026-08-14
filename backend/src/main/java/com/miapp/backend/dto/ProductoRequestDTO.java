package com.miapp.backend.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * DTO utilizado para recibir datos al crear o actualizar un producto.
 * No incluye campos generados automáticamente como id o fechaActualizacion.
 */
public class ProductoRequestDTO {

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 150)
    private String nombre;

    @Size(max = 500)
    private String descripcion;

    @NotNull
    @PositiveOrZero
    private Integer cantidad;

    @NotBlank
    private String unidadMedida;

    @NotNull
    @PositiveOrZero
    private BigDecimal precioUnitario;

    @PositiveOrZero
    private Integer stockMinimo;

    // --- Getters y setters ---

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public String getUnidadMedida() { return unidadMedida; }
    public void setUnidadMedida(String unidadMedida) { this.unidadMedida = unidadMedida; }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }

    public Integer getStockMinimo() { return stockMinimo; }
    public void setStockMinimo(Integer stockMinimo) { this.stockMinimo = stockMinimo; }
}