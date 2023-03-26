# KuepaFront

La aplicación está desarrollada en el framework  [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Requisitos para la instalacion
- Node JS (https://nodejs.org/en/download).
- Angular el Framework:
```bash
$ npm install -g @angular/cli
```

# Una vez descargado el proyecto procedemos a instalarlo:

Instalamos las dependencias de la aplicación
```bash
$ npm install
```

Corremos la aplicacion

```bash
$ ng serve -o
```

## Comentarios a tener en cuenta:

- Como un requisito de la aplicación es entrar y automaticamente estar en una sala, en el componente chat, ubicado en (**app/authorization/pages/chat/chat.component.ts**) se creo una variable con el nombre **ID_SALA** que es de tipo numerico. Este valor debe ser cambiado manualmente por el id de la sala que se crea automaticamente **En caso de que los numeros no coincidan**; pueden usar la coleccion en postman para ver la api que trae las salas y asi ver cuales hay y con qué id. Para que el chat pueda funcionar, esto se hizo con el objetivo de escalabilidad a cuestiones de salas.

- Deben crear los usuarios mediante Postman o el de su preferencia ya que por cuestiones de tiempo no se pudo crear el formulario de registro en el front.

Coleccion - (https://www.postman.com/research-saganist-46761753/workspace/kuepa-prueba/collection/17128041-501b6f98-4800-4700-afda-e3349ae04fb1?action=share&creator=17128041)
