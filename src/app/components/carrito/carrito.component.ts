import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  listaCarrito: any[] = [];
  precioTotal: number = 0;
  estados: string[] = ['Pendiente', 'En preparación', 'Entregado'];
  estadoSeleccionado: string = '';

 constructor(private carritoService: CarritoService, private router: Router) {
    this.listaCarrito = this.carritoService.getCarrito(); 
    this.precioTotal = carritoService.getTotalCarrito();
  }

  async pagar() {
    const productosConEstado = this.listaCarrito.map(producto => ({
      ...producto,
      estado: 'Pendiente'
    }));

    try {
      await this.carritoService.agregarOrden(productosConEstado);
      this.estadoSeleccionado = 'Pendiente';
      alert('¡Gracias por su compra!');
    } catch (error) {
      alert('Error al procesar la compra');
    }
  }

}
