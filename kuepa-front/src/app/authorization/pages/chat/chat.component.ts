import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MensajesInterface } from 'src/app/usuarios/interfaces/mensajes/mensajes.interfaces';
import { SalasAndMensajesInterface } from 'src/app/usuarios/interfaces/mensajes/sala-and-mensajes.interfaces';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private socket: Socket,
    private usuario_service: UsuarioService
  ) {}

  @ViewChild('container') container!: ElementRef;

  ID_SALA: number = 14;

  mensaje: string = '';
  mensajes: SalasAndMensajesInterface[] = [];
  contenido: string = '';

  ngOnInit(): void {
    this.socket.on('connect', () => {
      this.socket.emit('init', this.ID_SALA);
    });

    this.socket.on('chat', (mensajes: SalasAndMensajesInterface[]) => {
      this.mensajes = mensajes;
      this.contenido = '';
    });
  }

  enviarMensaje() {
    if (this.contenido && this.contenido.length > 1) {
      this.socket.emit('mensaje', {
        contenido: this.contenido,
        usuario: this.usuario_service.usuario.id,
        id_sala: this.ID_SALA,
      });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.container.nativeElement.scrollTop =
        this.container.nativeElement.scrollHeight;
    });
  }
}
