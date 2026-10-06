# zt-frontend

Frontend en React + Vite con arquitectura basada en componentes.

```
src/
  api/          Comunicación con el backend (httpClient, servicios)
  context/      Estado global de autenticación (AuthContext)
  hooks/        useAuth
  routes/       ProtectedRoute (protege el Dashboard)
  pages/        LoginPage, DashboardPage
  components/   ui/ (Button, Input, Alert, Panel), layout/, dashboard/
```

## Ejecutar en local
1. `npm install`
2. Tener el backend corriendo en `http://localhost:3000`
3. `npm run dev` y abrir `http://localhost:5173`

## Compilar para AWS
`npm run build` genera la carpeta `dist/`, que Nginx sirve en el EC2 del frontend.
