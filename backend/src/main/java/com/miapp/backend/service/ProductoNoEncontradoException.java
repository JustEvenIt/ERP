package com.miapp.backend.service;

/**
 * Se lanza cuando se intenta acceder a un producto que no existe en la base de datos.
 */
public class ProductoNoEncontradoException extends RuntimeException {

    public ProductoNoEncontradoException(Long id) {
        super("No se encontró el producto con id: " + id);
    }
}