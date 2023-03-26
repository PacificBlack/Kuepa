<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

La aplicación está desarrollada en el framework NestJS

## Requisitos para la instalacion
- Docker Engine (https://docs.docker.com/engine/install/), para poder montar la imagen de la base de datos en postgresql.
- Node JS (https://nodejs.org/en/download).
- NestJS el Framework:
```bash
$ npm i -g @nestjs/cli
```
- Postman - (https://www.postman.com/downloads/), para poder crear usuarios, salas y ver las api's creadas.
  

## Una vez descargado el proyecto procedemos a instalarlo:

Montamos la imagen en docker-container
```bash
$ docker-compose up
```

Instalamos las dependencias de la aplicación
```bash
$ npm install
```

Corremos la aplicacion

- development
```bash
$ npm run start
```
- watch mode
```bash
$ npm run start:dev
```


## Comentarios a tener en cuenta
Por cuestiones de timepo no pude realizar el formulario de registro de usuario, asi que por respeto al tiempo de la prueba se sugirió la descarga de postman para que puedan ver las apis funcionar y puedan ser usadas de manera comoda.

Coleccion - (https://www.postman.com/research-saganist-46761753/workspace/kuepa-prueba/collection/17128041-501b6f98-4800-4700-afda-e3349ae04fb1?action=share&creator=17128041)
