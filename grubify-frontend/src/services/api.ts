import axios from 'axios';
import {
  Clinic,
  Service,
  AppointmentCart,
  Appointment,
  AddAppointmentItemRequest,
  UpdateAppointmentItemRequest,
  BookAppointmentRequest
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5291/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clinicService = {
  getAll: (): Promise<Clinic[]> =>
    api.get('/clinics').then(response => response.data),

  getById: (id: number): Promise<Clinic> =>
    api.get(`/clinics/${id}`).then(response => response.data),

  getBySpecialty: (specialtyType: string): Promise<Clinic[]> =>
    api.get(`/clinics/specialty/${specialtyType}`).then(response => response.data),

  search: (query: string): Promise<Clinic[]> =>
    api.get(`/clinics/search?query=${query}`).then(response => response.data),
};

export const serviceService = {
  getAll: (): Promise<Service[]> =>
    api.get('/services').then(response => response.data),

  getById: (id: number): Promise<Service> =>
    api.get(`/services/${id}`).then(response => response.data),

  getByClinic: (clinicId: number): Promise<Service[]> =>
    api.get(`/services/clinic/${clinicId}`).then(response => response.data),

  getBySpecialty: (specialty: string): Promise<Service[]> =>
    api.get(`/services/specialty/${specialty}`).then(response => response.data),

  search: (query: string): Promise<Service[]> =>
    api.get(`/services/search?query=${query}`).then(response => response.data),
};

export const appointmentCartService = {
  get: (userId: string): Promise<AppointmentCart> =>
    api.get(`/appointmentcart/${userId}`).then(response => response.data),

  addItem: (userId: string, item: AddAppointmentItemRequest): Promise<AppointmentCart> =>
    api.post(`/appointmentcart/${userId}/items`, item).then(response => response.data),

  updateItem: (userId: string, itemId: number, item: UpdateAppointmentItemRequest): Promise<AppointmentCart> =>
    api.put(`/appointmentcart/${userId}/items/${itemId}`, item).then(response => response.data),

  removeItem: (userId: string, itemId: number): Promise<AppointmentCart> =>
    api.delete(`/appointmentcart/${userId}/items/${itemId}`).then(response => response.data),

  clear: (userId: string): Promise<void> =>
    api.delete(`/appointmentcart/${userId}`).then(response => response.data),
};

export const appointmentService = {
  book: (appointment: BookAppointmentRequest): Promise<Appointment> =>
    api.post('/appointments', appointment).then(response => response.data),

  getById: (id: number): Promise<Appointment> =>
    api.get(`/appointments/${id}`).then(response => response.data),

  getByUser: (userId: string): Promise<Appointment[]> =>
    api.get(`/appointments/user/${userId}`).then(response => response.data),

  getActiveByUser: (userId: string): Promise<Appointment[]> =>
    api.get(`/appointments/user/${userId}/active`).then(response => response.data),

  cancel: (id: number): Promise<Appointment> =>
    api.put(`/appointments/${id}/cancel`).then(response => response.data),
};
