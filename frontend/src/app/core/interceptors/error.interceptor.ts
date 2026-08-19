import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

/**
 * Intercepta todas las peticiones HTTP salientes. Si el backend responde con error,
 * muestra una notificación estándar (snackbar) y deja que el componente decida
 * si necesita hacer algo adicional (el error se relanza con throwError).
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensaje = 'Ocurrió un error inesperado. Intenta de nuevo.';

      if (error.status === 0) {
        // status 0 = el navegador no pudo ni conectar (backend caído, red, CORS)
        mensaje = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
      } else if (error.status === 404) {
        mensaje = 'No se encontró el recurso solicitado.';
      } else if (error.status === 400) {
        // Nuestro GlobalExceptionHandler de Spring Boot manda "mensaje" o "detalles"
        mensaje = error.error?.mensaje || 'Los datos enviados no son válidos.';
      } else if (error.status >= 500) {
        mensaje = 'Error interno del servidor. Contacta al equipo de sistemas si persiste.';
      }

      snackBar.open(mensaje, 'Cerrar', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });

      // Relanza el error para que el componente que hizo la petición también pueda reaccionar si lo necesita
      return throwError(() => error);
    })
  );
};