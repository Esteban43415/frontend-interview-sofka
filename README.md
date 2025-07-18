
# Frontend Interview - Sofka

Este proyecto es una prueba técnica desarrollada por Emilio Guzmán (eguzmanmoyano@gmail.com) para el proceso de selección en Sofka.

## Descripción

Esta aplicación web está construida con Angular y permite la gestión de productos. Incluye funcionalidades para listar, buscar, agregar, editar y eliminar productos, así como validaciones y mensajes de confirmación. El frontend consume servicios REST para obtener y manipular la información de productos.

## Funcionalidades principales

- **Listado de productos:** Visualiza una tabla paginada con los productos registrados, permite buscar por nombre o descripción y refrescar la información.
- **Agregar producto:** Formulario para registrar un nuevo producto con validaciones de campos requeridos y longitud.
- **Editar producto:** Permite modificar la información de un producto existente.
- **Eliminar producto:** Permite eliminar un producto existente.
- **Mensajes y confirmaciones:** Uso de componentes personalizados para mostrar mensajes de validación y confirmación de acciones.

## Tecnologías utilizadas

- Angular 19
- TypeScript
- RxJS
- Angular CDK (Overlay, Portal)
- SCSS

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
3. Accede a la aplicación en [http://localhost:4200](http://localhost:4200)

## Scripts disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm test`: Ejecuta los tests unitarios con Karma.

## Estructura del proyecto

El código fuente principal se encuentra en la carpeta `src/app`, organizado en módulos, componentes y servicios. El módulo principal de productos (`modules/products`) contiene los componentes para listar y agregar productos, así como la lógica de rutas.

## Autor

**Emilio Guzmán**  
eguzmanmoyano@gmail.com

---

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.6.

...existing code...
