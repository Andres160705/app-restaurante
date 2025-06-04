import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  listaCarrito: any[] = [];
  precioTotal: number = 0;
  estadoSeleccionado: string = '';

  constructor(private carritoService: CarritoService, private router: Router) {
  this.listaCarrito = this.carritoService.getCarrito();
  this.precioTotal = carritoService.getTotalCarrito();

  // Obtén el clienteId real
  const clienteId = localStorage.getItem('clienteId') || '';

  // Suscríbete al estado en tiempo real usando el clienteId real
  this.carritoService.estadoOrden$.subscribe(estado => {
  this.estadoSeleccionado = estado;
});

  this.carritoService.suscribirseAlEstadoOrden(clienteId);
}

  async pagar() {
    const productosConEstado = this.listaCarrito.map(producto => ({
      ...producto,
      estado: 'Pendiente'
    }));

    try {
      await this.carritoService.agregarOrden(productosConEstado);
      alert('¡Gracias por su compra!');
    } catch (error) {
      alert('Error al procesar la compra');
    }
  }
}

