export interface Clinic {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  specialtyType: string;
  rating: number;
  nextAvailable: string;
  consultationFee: number;
  isOpen: boolean;
  address: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specialty: string;
  clinicId: number;
  isAvailable: boolean;
  durationMinutes: number;
}

export interface AppointmentCartItem {
  id: number;
  serviceId: number;
  service: Service;
  quantity: number;
  notes: string;
}

export interface AppointmentCart {
  id: number;
  userId: string;
  items: AppointmentCartItem[];
  subTotal: number;
  bookingFee: number;
  total: number;
}

export enum AppointmentStatus {
  Requested = 1,
  Confirmed = 2,
  Reminded = 3,
  CheckedIn = 4,
  InConsultation = 5,
  Completed = 6,
  Cancelled = 7
}

export interface Appointment {
  id: number;
  userId: string;
  clinicId: number;
  clinic: Clinic;
  items: AppointmentCartItem[];
  subTotal: number;
  bookingFee: number;
  total: number;
  status: AppointmentStatus;
  createdDate: string;
  completedDate?: string;
  completedTime?: string;
  clinicLocation: string;
  patientName: string;
  patientPhone: string;
  paymentMethod: string;
  notes: string;
  estimatedWaitMinutes: number;
}

export interface AddAppointmentItemRequest {
  serviceId: number;
  quantity: number;
  notes: string;
}

export interface UpdateAppointmentItemRequest {
  quantity: number;
  notes: string;
}

export interface BookAppointmentRequest {
  userId: string;
  clinicId: number;
  items: AppointmentCartItem[];
  clinicLocation: string;
  paymentMethod: string;
  notes: string;
}
