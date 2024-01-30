Prueba Técnica - rFlex - Vicente Riveros Garay

Stack :
* Back-end : PHP 8 y Laravel 10
* Front-end : Node.js y React.js, Redux-toolkit
* Estilo: MaterialUI y Styled-components
* Bundler : Vite.js

Instrucciónes de instalación

Para mayor flexibidad se utiliza Laragon para el entorno de desarrollo, por ende hay que descargar la ultima version en el siguiente link.

https://laragon.org/download/index.html

- Luego de haberlo instalado, ir a la carpeta de instalación e ir al directorio 'www', en esta carpeta se debe copiar el repositorio.

- Luego se debe abrir la aplicación de Laragón y este notificará de que se creo un nuevo proyecto.

- En el menu principal de Laragon, ir al botón Database > hacer doble click en 'sql' > En la ventana de HeidiSQL, en la lista se debe crear una base de datos con el nombre 'rflex'

- Abrir la consola que ofrece Laragon haciend oclick en el botón terminal de la ventana principal

- Una vez en la consola, correr los siguientes comandos:

- composer install
- npm install
- php artisan migrate:fresh
- Correr php artisan serve para inicializar back-end
- Correr npm run dev para inicializar front-end
- Correr en la dirección localhost con el puerto indicado por vite.js

Dentro del repositorio está el archivo .ENV en caso de que se requiera

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
