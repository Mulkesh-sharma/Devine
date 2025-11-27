// API Configuration
const sanitizeBaseUrl = (url: string): string => url.replace(/\/$/, '');

const DEFAULT_PUBLIC_BASE_URL = 'http://localhost:5000';
const DEFAULT_SERVER_BASE_URL = 'http://localhost:5000';

const rawPublicBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_PUBLIC_BASE_URL;
const rawServerBaseUrl = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_SERVER_BASE_URL;

const publicBaseUrl = sanitizeBaseUrl(rawPublicBaseUrl);
const serverBaseUrl = sanitizeBaseUrl(rawServerBaseUrl);

// API Endpoints
type IdParam = string | number;

type EndpointFactory = (id: IdParam) => string;

interface AuthEndpoints {
  readonly LOGIN: string;
  readonly REGISTER: string;
  readonly VERIFY: string;
  readonly RESEND: string;
  readonly CREATE_ADMIN: string;
  readonly GET_ME: string;
  readonly UPDATE_PROFILE: string;
  readonly CHANGE_PASSWORD: string;
}

interface ServicesEndpoints {
  readonly GET_ALL: string;
  readonly GET_BY_ID: EndpointFactory;
  readonly CREATE: string;
  readonly UPDATE: EndpointFactory;
  readonly DELETE: EndpointFactory;
  readonly UPDATE_RATING: EndpointFactory;
}

interface BookingsEndpoints {
  readonly CREATE: string;
  readonly GET_ALL: string;
  readonly GET_BY_ID: EndpointFactory;
  readonly UPDATE: EndpointFactory;
  readonly CANCEL: EndpointFactory;
  readonly ADD_REVIEW: EndpointFactory;
  readonly GET_USER_BOOKINGS: string;
}

interface UsersEndpoints {
  readonly GET_ALL: string;
  readonly GET_BY_ID: EndpointFactory;
  readonly UPDATE: EndpointFactory;
  readonly DELETE: EndpointFactory;
  readonly GET_USER_BOOKINGS: EndpointFactory;
}

interface GeneratedEndpoints {
  readonly AUTH: AuthEndpoints;
  readonly SERVICES: ServicesEndpoints;
  readonly BOOKINGS: BookingsEndpoints;
  readonly USERS: UsersEndpoints;
  readonly HEALTH: string;
}

const createEndpoints = (baseUrl: string): GeneratedEndpoints => {
  const apiBase = `${baseUrl}/api`;

  const servicesBase = `${apiBase}/services`;
  const bookingsBase = `${apiBase}/bookings`;
  const usersBase = `${apiBase}/users`;

  const withId = (path: string): EndpointFactory => (id: IdParam) => `${path}/${id}`;

  return {
    AUTH: {
      LOGIN: `${apiBase}/auth/login`,
      REGISTER: `${apiBase}/auth/register`,
      VERIFY: `${apiBase}/auth/verify`,
      RESEND: `${apiBase}/auth/resend`,
      CREATE_ADMIN: `${apiBase}/auth/create-admin`,
      GET_ME: `${apiBase}/auth/me`,
      UPDATE_PROFILE: `${apiBase}/auth/profile`,
      CHANGE_PASSWORD: `${apiBase}/auth/password`,
    },
    SERVICES: {
      GET_ALL: servicesBase,
      GET_BY_ID: withId(servicesBase),
      CREATE: servicesBase,
      UPDATE: withId(servicesBase),
      DELETE: withId(servicesBase),
      UPDATE_RATING: (id) => `${servicesBase}/${id}/rating`,
    },
    BOOKINGS: {
      CREATE: bookingsBase,
      GET_ALL: bookingsBase,
      GET_BY_ID: withId(bookingsBase),
      UPDATE: withId(bookingsBase),
      CANCEL: (id) => `${bookingsBase}/${id}/cancel`,
      ADD_REVIEW: (id) => `${bookingsBase}/${id}/review`,
      GET_USER_BOOKINGS: `${usersBase}/me/bookings`,
    },
    USERS: {
      GET_ALL: usersBase,
      GET_BY_ID: withId(usersBase),
      UPDATE: withId(usersBase),
      DELETE: withId(usersBase),
      GET_USER_BOOKINGS: (id) => `${usersBase}/${id}/bookings`,
    },
    HEALTH: `${apiBase}/health`,
  } as const;
};

export const PUBLIC_API_BASE_URL = `${publicBaseUrl}/api`;
export const SERVER_API_BASE_URL = `${serverBaseUrl}/api`;
export const API_BASE_URL = PUBLIC_API_BASE_URL;
export const API_ENDPOINTS = createEndpoints(publicBaseUrl);
export const SERVER_API_ENDPOINTS = createEndpoints(serverBaseUrl);

// Types for API request
export interface ApiRequestOptions extends RequestInit {
  headers?: HeadersInit;
}

// Helper function to make API requests
export const apiRequest = async <TResponse = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<TResponse> => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const headers = new Headers(defaultHeaders);

  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  if (options.headers) {
    const providedHeaders = new Headers(options.headers);
    providedHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();

    if (!response.ok) {
      const errorData = data as { message?: string; errors?: any[] };
      const errorMessage = errorData.message ?? 'Something went wrong';
      const error = new Error(errorMessage);
      // Attach validation errors if present
      if (errorData.errors) {
        (error as any).errors = errorData.errors;
        console.error('Validation Errors:', errorData.errors);
      }
      throw Object.assign(error, { status: response.status });
    }

    return data as TResponse;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};