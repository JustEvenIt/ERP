package com.miapp.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO utilizado para devolver la información de un producto al cliente (frontend).
 */
public class ProductoResponseDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private Integer cantidad;
    private String unidadMedida;
    private BigDecimal precioUnitario;
    private Integer stockMinimo;
    private LocalDateTime fechaActualizacion;
    private boolean stockBajo; // true si cantidad <= stockMinimo

    public ProductoResponseDTO() {}

    public ProductoResponseDTO(Long id, String nombre, String descripcion, Integer cantidad,
                                String unidadMedida, BigDecimal precioUnitario, Integer stockMinimo,
                                LocalDateTime fechaActualizacion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.precioUnitario = precioUnitario;
        this.stockMinimo = stockMinimo;
        this.fechaActualizacion = fechaActualizacion;
        this.stockBajo = stockMinimo != null && cantidad != null && cantidad <= stockMinimo;
    }

    // --- Getters y setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(LocalDateTime fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

    public boolean isStockBajo() { return stockBajo; }
    public void setStockBajo(boolean stockBajo) { this.stockBajo = stockBajo; }
}