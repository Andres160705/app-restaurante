import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, orderBy, limit, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listaCarrito: any[] = [];
    estadoOrden$ = new BehaviorSubject<string>('');  // Observador para el estado

  constructor(private firestore: Firestore) { }

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
    const clienteId = localStorage.getItem('clienteId') || '';
    const ordenesRef = collection(this.firestore, 'ordenes');
    await addDoc(ordenesRef, {
      productos: orden,
      fecha: new Date().toISOString(),
      estado: 'Pendiente',
      clienteId: clienteId  //Id del Cliente
    });
  } catch (error) {
    console.error('Error al guardar la orden en Firestore:', error);
  }
}

  suscribirseAlEstadoOrden(clienteId: string) {
    const ordenesRef = collection(this.firestore, 'ordenes');
    const q = query(
      ordenesRef,
      where('clienteId', '==', clienteId),
      orderBy('fecha', 'desc'),
      limit(1)
    );

    onSnapshot(q, snapshot => {
  if (!snapshot.empty) {
    const orden = snapshot.docs[0].data();
    const estado = orden['estado'] || orden['productos']?.[0]?.estado || '';
    console.log('Estado recibido en cliente:', estado); 
    this.estadoOrden$.next(estado);
  } else {
    console.log('No hay orden encontrada para este cliente');
    this.estadoOrden$.next('');
  }
});
  }
}
