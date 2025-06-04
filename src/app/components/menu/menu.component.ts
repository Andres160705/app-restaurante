import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Firestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-menu',
  imports: [FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  mostrarCarro = false;

  ocultarCarro() {
  this.mostrarCarro = !this.mostrarCarro;
}

  constructor(private router: Router, private carrito: CarritoService, private firestore: Firestore) { }
  listaPedidos: any[] = [];
  listaCarrito: any[] = [];
  listaCantidades: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cantidadSeleccionada: number = 1;
  listaEntradas: any[] = [
  {
    nombre: 'Arepa de queso con suero costeño',
    precio: 5000,
    imagen: 'assets/images/ArepaQuesoSuero.png',
    descripcion: 'Arepa dorada y rellena de queso fundido, servida con un toque de suero costeño suave y salado x 3 Und.',
    alt: 'Arepa de Queso con suero costeño'
  },
    {
      nombre: 'Empanadas de carne con ají casero', 
      precio: 7000, 
      imagen: 'assets/images/EmpanadasConAji.png',
      descripcion: 'Crocantes empanadas de maíz rellenas de carne sazonada, acompañadas de un ají picante artesanal x 4 Und.',
       alt: 'Empanadas de carne con aji casero'
    },
    {
      nombre: 'Patacones con hogao', 
      precio: 6000, 
      imagen: 'assets/images/PataconesAhogao.png', 
      descripcion: 'Patacones de plátano verde fritos y crocantes, servidos con hogao casero a base de tomate y cebolla x 3 Und.',
      alt: 'Patacones con hogao'
    },
    {
      nombre: 'Chorizo con arepa blanca', 
      precio: 8000, 
      imagen: 'assets/images/ChorizoArepa.png', 
      descripcion: 'Jugoso chorizo artesanal acompañado de una arepa antioqueña asada y limón al gusto x 2 Und. ',
      alt: 'Chorizo con arepa blanca'
    },
  ];

  listaPlatosFuertes: any[] = [
    {
      nombre: 'Bandeja Paisa tradicional', 
      precio: 35000, 
      imagen: 'assets/images/BandejaPaisa.png',
      descripcion: 'Arroz blanco, frijoles, carne molida, chicharrón, huevo frito, plátano maduro, chorizo, arepa y aguacate. ', 
      alt: 'Bandeja Paisa tradicional'
    },
    {
      nombre: 'Ajiaco', 
      precio: 30000, 
      imagen: 'assets/images/Ajiaco.png',
      descripcion: 'Sopa espesa de papa criolla, pollo y mazorca, servida con crema de leche, alcaparras y arroz blanco. ', 
      alt: 'Ajiaco'
    },
    {
      nombre: 'Sancocho trifásico', 
      precio: 28000, 
      imagen: 'assets/images/SancochoTrifasico.png',
      descripcion: 'Caldo espeso con yuca, papa, plátano y carnes mixtas, servido con arroz, aguacate y ají.', 
      alt: 'Sancocho Trifasico'
    },
    {
      nombre: 'Tamal tolimense con arepa', 
      precio: 20000, 
      imagen: 'assets/images/TamalTolimense.png',
      descripcion: 'Envuelto de masa de maíz con cerdo, pollo, huevo, zanahoria y arveja, cocido en hoja de plátano.', 
      alt: 'Tamal tolimense con arepa'
    },
  ];

  listaPostres: any[] = [
    {
      nombre: 'Arroz con Leche', 
      precio: 4000, 
      imagen: 'assets/images/ArrozConLeche.png',
      descripcion: 'Arroz cocido en leche con canela, clavos y azúcar, servido frío o tibio con pasas x 1 Und.', 
      alt: 'Arroz con Leche'
    },
    {
      nombre: 'Postre de natas', 
      precio: 4500, 
      imagen: 'assets/images/PostreNatas.png',
      descripcion: 'Capas de nata cocida en leche con azúcar y vainilla, ideal para paladares dulces x 3 Und.', 
      alt: 'Postre de natas'
    },
    {
      nombre: 'Arequipe con brevas', 
      precio: 5000, 
      imagen: 'assets/images/ArequipeBrevas.png',
      descripcion: 'Dulces brevas rellenas de cremoso arequipe, una combinación tradicional irresistible x 2 Und.', 
      alt: 'Arequipe con brevas'
    },
    {
      nombre: 'Obleas con queso y mora', 
      precio: 3500, 
      imagen: 'assets/images/ObleasMora.png',
      descripcion: 'Galletas finas rellenas de arequipe, queso rallado y mermelada de mora casera 3 Und.', 
      alt: 'Obleas con queso y mora'
    },
  ];

  listaBebidas: any[] = [
    {
      nombre: 'Jugo de lulo natural', 
      precio: 3000, 
      imagen: 'assets/images/JugoLulo.png',
      descripcion: 'Refrescante bebida de fruta tropical ácida y dulce, servida bien fría.', 
      alt: 'Juego de lulu natural'
    },
    {
      nombre: 'Aguapanela con limón', 
      precio: 2500,
       imagen: 'assets/images/AguapanelaLimon.png',
      descripcion: 'Infusión de panela caliente o fría con gotas de limón, reconfortante y energética.', 
      alt: 'Aguapanela con limon'
    },
    {
      nombre: 'Refajo', 
      precio: 4000, 
      imagen: 'assets/images/Refajo.png',
      descripcion: 'Bebida tradicional que mezcla cerveza con gaseosa Colombiana, dulce y chispeante.',
       alt: 'Refajo'
    },
    {
      nombre: 'Chicha artesanal', 
      precio: 3500, 
      imagen: 'assets/images/ChichaArtesanal.png',
      descripcion: 'Bebida fermentada de maíz con notas dulces, una joya ancestral de la cultura andina.', 
      alt: 'Chicha artesanal'
    },
  ];

  agregarAlCarrito(producto: any) {

    const productoExistente = this.listaCarrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
      productoExistente.cantidad += 1;
      alert(`${producto.nombre}.`);
    } else {
      producto.cantidad = 1;
      this.listaCarrito.push(producto);
      alert(`${producto.nombre} agregado al carrito.`);
    }

  }

  calcularTotal(): number {
    return this.listaCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  eliminarDelCarrito(index: number) {
    this.listaCarrito.splice(index, 1);
  }

  actualizarCantidad(producto: any, nuevaCantidad: number) {
    producto.cantidad = nuevaCantidad;
  }

  realizarCompra() {
    if (this.listaCarrito.length == 0) {
      alert('Agrege productos al carrito.');
    } else {
      alert('Compra realizada con éxito.');
      this.carrito.setCarrito(this.listaCarrito);
      this.router.navigate(['/carrito']); // Redirigir al componente de carrito
      this.listaCarrito = []; // Limpiar el carrito después de la compra
    }
  }

  desplegarVentanaEmergente(event: Event, producto: any) {
    event.preventDefault();

    alert(`📌 PRODUCTO: ${producto.nombre}
  💰 PRECIO: $${producto.precio.toLocaleString('es-CO')}
  📝 DESCRIPCIÓN: ${producto.descripcion},`);
  }

}


