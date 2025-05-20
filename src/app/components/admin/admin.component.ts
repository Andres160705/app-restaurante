import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  listaOrdenes: any[] = [];
  estados: string[] = ['Pendiente', 'En preparación', 'Entregado'];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.cargarOrdenesDesdeFirestore();
  }

  async cargarOrdenesDesdeFirestore() {
    const ordenesRef = collection(this.firestore, 'ordenes');
    const snapshot = await getDocs(ordenesRef);
    this.listaOrdenes = [];

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      this.listaOrdenes.push({
        id: docSnap.id,
        productos: data['productos'],
        fecha: data['fecha'],
        estado: data['estado']
      });
    });
  }

  async eliminarProducto(ordenIndex: number, productoIndex: number) {
    const orden = this.listaOrdenes[ordenIndex];

    // Eliminar del array local
    orden.productos.splice(productoIndex, 1);

    // Actualizar en Firestore
    const ordenRef = doc(this.firestore, 'ordenes', orden.id);
    await updateDoc(ordenRef, { productos: orden.productos });

    // Si no quedan productos en la orden, también puedes eliminar toda la orden (opcional)
    if (orden.productos.length === 0) {
      // await deleteDoc(ordenRef); // Solo si deseas eliminar la orden completa
      this.listaOrdenes.splice(ordenIndex, 1); // Quitar del arreglo local para que desaparezca de la tabla
    }
  }

  async actualizarEstado(ordenId: string, productosActualizados: any[]) {
    const ordenRef = doc(this.firestore, 'ordenes', ordenId);
    await updateDoc(ordenRef, { productos: productosActualizados });
  }
}
