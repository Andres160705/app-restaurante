import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../services/auth.service"

import { Firestore, collection, addDoc, collectionData } from "@angular/fire/firestore"

import type { Observable } from "rxjs"
import { Router } from "@angular/router"

interface usuario {
  nombre: string
  correo: string
  password: string
}
@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  usuario: usuario = { nombre: "", correo: "", password: "" }

  usuarios$: Observable<any[]>

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router,
  ) {
    const usuariosReg = collection(this.firestore, "usuarios")
    this.usuarios$ = collectionData(usuariosReg, { idField: "id" })
  }

  async agregarUsuario() {
    if (this.usuario.nombre.trim() && this.usuario.correo.trim() && this.usuario.password.trim()) {
      const usuariosReg = collection(this.firestore, "usuarios")

      await addDoc(usuariosReg, this.usuario)

      this.usuario = { nombre: "", correo: "", password: "" }
      alert("Usuario registrado con éxito!")

      this.router.navigate(["/menu"])
    } else {
      alert("Por favor, complete todos los campos.")
    }
  }

  autenticarConGoogle() {
    this.authService
      .autenticarConGoogle()
      .then((result) => {
        // Si la autenticación fue exitosa
        alert("Usuario registrado con éxito!")
        this.router.navigate(["/menu"])
      })
      .catch((error) => {
        // Si ocurrió un error durante la autenticación
        alert("Error al registrar el usuario: " + error.message)
      })
  }

  irLogin() {
    this.router.navigate(["/login"])
  }
}
