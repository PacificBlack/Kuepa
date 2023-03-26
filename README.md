# Kuepa
<h1 id="title" align="center">PRUEBA DESARROLLADOR FULL STACK JAVASCRIPT</h1>

<p id="description">Contexto: El equipo académico de Kuepa ofrece streaming de sus clases virtuales en el LMS de la organización que están disponibles solo para estudiantes. En estos streaming los estudiantes pueden visualizar un video mientras el docente dicta la clase.</p>

<p>Objetivo: Como equipo académico se quiere brindar una herramienta de chat a las clases
virtuales que permita la interacción entre los participantes y el moderador de la clase.</p>

## Criterios de aceptación:

- Un estudiante debe poder interactuar con los demás participantes a través de mensajes del chat.
- Los mensajes del chat que ven los participantes deben actualizarse sin requerir la recarga de la pantalla.
- Los mensajes del chat deben indicar claramente quién escribió el mensaje y datos relevantes.
- Debe identificarse en los mensajes del chat de forma clara quién es el moderador.
- Los mensajes del chat deben almacenarse en un sistema de persistencia de datos que facilite su consulta.
- Solamente estudiantes identificados (logueados) pueden ingresar a las clases virtuales y hacer uso del chat.


## Condiciones:

- Para simular a un estudiante será necesario poder identificarlo utilizando una base de datos que al menos cuente con los siguientes datos: Nombre, Usuario (Único), Contraseña, Tipo de usuario (estudiante, moderador). Se valorarán puntos adicionales si se construye un formulario de registro. 

- Para que el estudiante pueda ingresar al sistema debe tener una sesión iniciada, lo cual significa que se debe construir un sistema simple de autenticación.

- Cuando un estudiante inicie sesión no podrá seleccionar una clase virtual ya que se considerará que solo existe una activa y se mostrará automáticamente.

- Para simular el streaming se puede utilizar cualquier método que precargue un video (iframe, youtube, vimeo, archivos en la nube, archivos incrustados en el código fuente, etc...) y queda a elección del aspirante. 
- La herramienta de chat es el componente

## Requisitos técnicos: 

- El código fuente debe ser subido a un repositorio de versionamiento (GitHub, Bitbucket, etc..) donde se indique el proceso para instalar y configurar.

- Se debe desarrollar los componentes tanto de front-end como de back-end.
- Debe existir una comunicación entre los sistemas (API, graphql, etc..)
- Debe realizarse la persistencia de los datos (mysql, mongodb, postgres, etc..)
- El lenguaje a utilizar tanto para back-end como para front-end es JavaScript y se puede hacer uso de cualquier framework disponible (NodeJS, React, Angular, Vue).
- Se requiere el uso de buenas prácticas de programación y arquitecturas de desarrollo web

## Criterios de evaluación:

- Dominio en el manejo de control de versiones (Git, Github, Bitbucket, etc..)
- Dominio en HTML5 y CSS3
- Dominio en el lenguaje principal JavaScript (Front-end, Back-end)
- Interfaz y presentación del producto de software
- Dominio de frameworks para desarrollo (Express.js, react, angular, vue, bootstrap,
etc...)

## Bonus:
- Se valorará la creatividad, usabilidad, experiencia de usuario.
- Pruebas unitarias y/o de integración
- Diseño responsive 

💻 Tecnologias usadas en el proyecto:

*   NestJS
*   Angular
*   Docker
*   TypeOrm
*   Socket.io
*   Bulmacss
