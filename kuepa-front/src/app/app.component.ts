import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private socket: Socket) {}

  mensaje: string = '';

  ngOnInit(): void {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor!');
      this.socket.emit('mensaje', {
        contenido: 'Lo envía el fron angular',
        usuario: 2,
        id_sala: 14,
      });
    });

    this.socket.on('chat', (data: any) => {
      console.log('Mensaje recibido:', data);
      this.mensaje = data.mensaje;
      // Aquí puedes procesar la información recibida como lo necesites
    });
  }
}
