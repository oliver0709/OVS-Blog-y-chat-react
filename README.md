# Frontend - Blog & Chat App

## Descripción

Este es el frontend de una aplicación de blog y chat construida con **React**, **Vite**, y **TypeScript**. El frontend se conecta a un backend REST API desarrollado en Flask para la funcionalidad del blog y usa Firebase para el chat en tiempo real.

## Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** o **yarn** (dependiendo de tu gestor de paquetes)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/oliver0709/OVS-Blog-y-chat-react.git
   ```
2. Navega al directorio del proyecto:
    ```bash
    cd OVS-Blog-y-chat-react
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Ejecuta la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```

## Scripts Disponibles
```js
npm run dev
```
Ejecuta la aplicación en modo de desarrollo. Abre http://localhost:5173 para verla en tu navegador. Los cambios en el código se reflejan en tiempo real.
```js
npm run build
```
Construye la aplicación para producción en la carpeta dist. La compilación está optimizada y minimizada para mejor rendimiento.
```js
npm run preview
```
Previsualiza la aplicación desde la versión construida en dist.

## Despliegue en Firebase Hosting

Sigue estos pasos para desplegar el proyecto en Firebase Hosting.

1. Asegúrate de tener Firebase CLI instalado:
```bash
npm install -g firebase-tools
```

2. Inicia sesión en Firebase:

```bash
firebase login
```
3. Configura el proyecto de Firebase en tu directorio local:

```bash
firebase init
```
Selecciona Hosting. Usa el directorio dist como la carpeta de compilación. Configura el proyecto para hacer Single Page App (SPA).

## Despliega la aplicación:

```bash
firebase deploy
```
Después del despliegue, recibirás una URL pública donde se podrá acceder a tu aplicación.

## Dependencias Principales

- React: Librería para la creación de interfaces de usuario.
- TypeScript: Un superconjunto de JavaScript que añade tipado estático opcional.
- Vite: Herramienta de construcción rápida y ligera.
- Axios: Cliente HTTP para realizar solicitudes a la API.
- Tailwind CSS: Framework de CSS para diseño responsivo.
- React Draft WYSIWYG: Editor de texto enriquecido utilizado en el formulario del blog.
- Firebase: Usado para el chat en tiempo real y la autenticación.

## Funcionalidades
- Blog: Crear, leer, actualizar y eliminar entradas de blog (CRUD).
- Chat: Sistema de chat en tiempo real para la comunicación entre usuarios.

- Autenticación de Blog (Admin): El administrador puede autenticarse para gestionar las entradas de blog.
- Autenticación de Chat: Usuarios y administradores pueden autenticarse y usar el chat mediante Firebase.

### Licencia

Este proyecto está bajo la licencia MIT.

