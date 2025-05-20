import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'admin', component: AdminComponent },
  
];