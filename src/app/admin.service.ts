import {Admin} from './admin';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AdminService {
  private apiServerURL = environment.apiBaseURL;

  constructor(private http: HttpClient) {}

  public getAdmins(): Observable<Admin[]>{
    return this.http.get<Admin[]>(`${this.apiServerURL}/admin/all`);
  }

  public addAdmin(admin: Admin): Observable<Admin>{
    return this.http.post<Admin>(`${this.apiServerURL}/admin/add`, admin);
  }

  public updateAdmin(admin: Admin): Observable<Admin>{
    return this.http.put<Admin>(`${this.apiServerURL}/admin/update`, admin);
  }

  public deleteAdmin(adminId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/admin/delete/${adminId}`);
  }

}
