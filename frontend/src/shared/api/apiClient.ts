/**
 * [FRONTEND - FSD LAYER: Shared API]
 * Single transport boundary to the backend. Pages and features must not call fetch directly:
 * base URL, versioning, and error shape live here, not scattered across the UI.
 */

export const API_BASE_URL = '/api/v1';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<TResponse>(path: string, init: RequestInit): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    // NestJS error envelope: { message: string | string[], error, statusCode }
    const detail = body?.message;
    throw new ApiError(
      Array.isArray(detail) ? detail.join(', ') : (detail ?? response.statusText),
      response.status
    );
  }

  return body as TResponse;
}

export const apiClient = {
  get: <TResponse>(path: string) => request<TResponse>(path, { method: 'GET' }),
  post: <TResponse>(path: string, payload: unknown) =>
    request<TResponse>(path, { method: 'POST', body: JSON.stringify(payload) }),
};
