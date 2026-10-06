// Unico punto que habla con la red. Los componentes nunca usan fetch directamente.
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' };
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Revisa tu conexión o intenta más tarde.', 0);
  }

  let data = null;
  try { data = await response.json(); } catch { /* respuesta sin JSON */ }

  if (!response.ok) {
    throw new ApiError(data?.error ?? `El servidor respondió con error ${response.status}`, response.status);
  }
  return data;
}
