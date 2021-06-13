import { AdminService } from "./admin.service";

export interface Admin {
  id: number;
  nombre: string;
  email: string;
  jobTitle: string;
  telefono: string;
  imageURL: string;
  adminCode: string;
}