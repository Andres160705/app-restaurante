import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listaCarrito: any[] = [];

  constructor(private firestore: Firestore) {}

  setCarrito(carrito: any[]) {
    this.listaCarrito = carrito;
  }

  getCarrito(): any[] {
    return this.listaCarrito;
  }

  getTotalCarrito(): number {
    return this.listaCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  async agregarOrden(orden: any[]) {
    try {
      const ordenesRef = collection(this.firestore, 'ordenes');
      await addDoc(ordenesRef, {
        productos: orden,
        fecha: new Date().toISOString(),
        estado: 'Pendiente'
      });
    } catch (error) {
      console.error('Error al guardar la orden en Firestore:', error);
    }
  }
}
