import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Correctamente proporcionado en 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8086/usuario'; // URL del backend en el puerto 8086

  constructor(private http: HttpClient) {}

  // Método para obtener un usuario por email
  getUsuarioByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/byemail/${email}`);
  }

  // Método para obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo usuario
  createUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`${this.apiUrl}/new`);	
    return this.http.post(`${this.apiUrl}/new`, usuario, { headers });
  }
}