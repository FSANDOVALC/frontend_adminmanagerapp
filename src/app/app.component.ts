import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from './admin';
import { AdminService } from './admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public admins: Admin[];
  public editAdmin: Admin;
  public deleteAdmin: Admin;
  
  constructor(private adminService: AdminService){
    //this.admins = [];
  }

  ngOnInit(){
    this.getAdmins();
  }

  public getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (response: Admin[]) => {
        this.admins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAdmin(addForm: NgForm): void {
    document.getElementById('add-admin-form')?.click();
    this.adminService.addAdmin(addForm.value).subscribe(
      (response: Admin) => {
        console.log(response);
        this.getAdmins();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateAdmin(admin: Admin): void {
    this.adminService.updateAdmin(admin).subscribe(
      (response: Admin) => {
        console.log(response);
        this.getAdmins();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public onDeleteAdmin(adminId: number): void {
    this.adminService.deleteAdmin(adminId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAdmins();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public searchAdmins(key: string):void {
    const results: Admin[] = [];
    for(const admin of this.admins){
      if(admin.nombre.toLowerCase().indexOf(key.toLowerCase())!== -1
      || admin.email.toLowerCase().indexOf(key.toLowerCase())!== -1
      || admin.telefono.toLowerCase().indexOf(key.toLowerCase())!== -1
      ){
        results.push(admin);
      }
    }
    this.admins = results;
    if(results.length === 0 || !key){
      this.getAdmins();
    }
  }


  public onOpenModal(admin: Admin, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addAdminModal');
    }
    if(mode === 'edit'){
      this.editAdmin = admin;
      button.setAttribute('data-target', '#updateAdminModal');
    }
    if(mode === 'delete'){
      this.deleteAdmin = admin;
      button.setAttribute('data-target', '#deleteAdminModal');
    }
    container?.appendChild(button);
    button.click();
  }


}
