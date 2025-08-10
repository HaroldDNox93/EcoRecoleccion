# 🌱 EcoRecolección (Frontend)

Aplicación web para gestionar solicitudes de recolección, puntos y reportes.  
Incluye autenticación simple (token en `localStorage`) y rutas protegidas bajo un **Layout** con `Header` y `Footer` persistentes.

## 🧱 Tech stack

- React + TypeScript (Vite)
- React Router v6.22+
- pnpm (gestor de paquetes)
- CSS modular por página (estilos en `/src/styles`)

---

## 🚀 Empezar rápido

### 1) Clonar e instalar
```bash
git clone https://github.com/HaroldDNox93/EcoRecoleccion.git
cd EcoRecoleccion
pnpm install
```

### 2) Variables de entorno (frontend)
Crea un archivo **`.env`** en la raíz (o `.env.local`) con:

```env
# URL base de tu API (ajústala a tu backend real)
VITE_API_URL=http://localhost:3000/api
```

> Si todavía no tienes backend, puedes probar con los mocks incluidos (el login guarda un token ficticio).

---

## ▶️ Cómo ejecutar el proyecto

### En modo desarrollo
```bash
pnpm dev
```
Esto levantará el servidor de Vite en [http://localhost:5173](http://localhost:5173).

### Generar build de producción
```bash
pnpm build
```
Esto creará la carpeta `dist/` optimizada para producción.

### Previsualizar la build
```bash
pnpm preview
```
Sirve la build localmente para probar antes de desplegar.

---

## 🧭 Rutas

### Públicas
- `/login` – Iniciar sesión
- `/register` – Registro de usuario

### Protegidas (requieren `auth:token` en localStorage)
Estas rutas se montan dentro del **Layout** (Header y Footer persistentes) y cambian el contenido central:

- `/` – Home (hero centrado + CTA “Solicitar Recolección”)
- `/solicitar` – Formulario “Solicitud de Servicio”
- `/puntos` – Vista de puntos (placeholder)
- `/reportes` – Listado de reportes (cards con estado “Pendiente/Resuelto”)
- `/account` – Panel “Mi Cuenta” (avatar, acciones, **Cerrar sesión**)

> Todas las protegidas usan el guard **`ProtectedRoute`** que verifica `localStorage.getItem("auth:token")`.

---

## 🔐 Autenticación (demo)

- **Login**: al enviar el formulario se guarda un token ficticio:
  ```ts
  localStorage.setItem("auth:token", "fake-token-<id>");
  ```
- **Logout** (Account → Cerrar sesión):
  ```ts
  localStorage.removeItem("auth:token");
  // redirección a /login con replace:true
  ```

Cuando conectes tu API real, reemplaza la simulación por tu `axios/fetch` y guarda el **token real** con la misma clave `auth:token`.

---

## 🛠 Scripts

```bash
pnpm dev       # Ejecuta Vite en modo desarrollo
pnpm build     # Build de producción (dist/)
pnpm preview   # Sirve la build localmente
```

*(si añadiste ESLint/Prettier: `pnpm lint` / `pnpm format`)*

---

## 🐙 Subir a GitHub

```bash
git add .
git commit -m "feat: primera versión funcional del frontend"
git branch -M main
git remote add origin https://github.com/HaroldDNox93/EcoRecoleccion.git
git push -u origin main
```

---

## 📄 Licencia
MIT
