import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { query, where, getDocs } from '@angular/fire/firestore';

import {
  Firestore,
  collection,
  addDoc,
  collectionData
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

interface usuario {
  correo: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: usuario = { correo: '', password: '' };

  usuarios$: Observable<any[]>;

  constructor(private firestore: Firestore, private authService: AuthService, private router: Router) {
    const usuariosReg = collection(this.firestore, 'usuarios');
    this.usuarios$ = collectionData(usuariosReg, { idField: 'id' });
  }

  async iniciarSesion() {
    const AdminUser: string = 'Admin';
    const AdminPassword: string = '123';

    if (this.usuario.correo.trim() === AdminUser && this.usuario.password.trim() === AdminPassword) {
      alert('Acceso administrativo concedido!');
      console.log('Correo de administrador:', this.usuario.correo);
      console.log('Navegando a /admin');
      this.router.navigate(['/admin']);
    } else if (this.usuario.correo.trim() && this.usuario.password.trim()) {
      const usuariosReg = collection(this.firestore, 'usuarios');
      const verificar = query(
        usuariosReg,
        where('correo', '==', this.usuario.correo),
        where('password', '==', this.usuario.password)
      );
      try {
        const consulta = await getDocs(verificar);

        if (!consulta.empty) {
          alert('Inicio de sesión exitoso!');
          console.log('Navegando a /menu');
          this.router.navigate(['/menu']);
        } else {
          alert('Correo o contraseña incorrectos.');
        }
      } catch (error) {
        console.error('Error al consultar usuarios:', error);
        alert('Ocurrió un error al verificar las credenciales.');
      }
    }
  }

  autenticarConGoogle() {
    this.authService.autenticarConGoogle()
      .then(() => {
        alert('Usuario registrado con éxito!');
        this.router.navigate(['/menu']);
      })
      .catch(error => {
        alert('Error al registrar el usuario: ' + error.message);
      });
  }
}
