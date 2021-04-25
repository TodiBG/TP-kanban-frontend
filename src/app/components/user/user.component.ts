import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/modeles/kanban';
//import {MatPaginator} from '@angular/material/paginator';
//import {MatTableDataSource} from '@angular/material/table';
import { KanbanService } from '../../services/kanban.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  createUserDialog = false;
  editUserDialog = false;
    
  users!: User[];

  selectedUser: User = {}  ;

  newUser: User = {}  ;

  selectedUsers!: User[];

  submitted!: boolean;
  editSubmitted = false;
  oldEmail = "";

  constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.kanbanService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  openNew() {
      //this.selectedUser;
      this.submitted = false;
      this.createUserDialog = true;
  }

  deleteSelectedUsers() {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer les Users selectionnées ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));

              this.selectedUsers.forEach(user => {
                  this.kanbanService.deleteUser(user.email);
              });

              this.selectedUsers = [];

              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
          }
      });
  }

  showEditUserDialog(User: User) {
      this.selectedUser = User;
      this.oldEmail = this.selectedUser.email;
      this.editUserDialog = true;
  }

    
  hideDialog() {
    this.createUserDialog = false;
    this.submitted = false;
}


  hideEditDialog() {
          this.selectedUser.email = this.oldEmail;
          this.editUserDialog = false;
      
      this.editSubmitted = false;
  }
  
  createUser() {
      this.submitted = true;

        this.users.push(this.newUser);
        this.kanbanService.createUser(this.newUser);
          this.createUserDialog = false;
          this.newUser = {} ;
         this.messageService.add({severity:'success', summary: 'Successful', detail: 'L\'utilisateur a été créé', life: 3000});
          
  }


  editUser() {
      this.editSubmitted = false;
      this.kanbanService.editUser(this.selectedUser);
        this.editUserDialog = false;
       this.messageService.add({severity:'success', summary: 'Successful', detail: 'L\'utilisateur a été modifié', life: 3000});
          
   }
 
   
    
    
   deleteUser (user: User) {
    this.confirmationService.confirm({
        message: 'Voulez-vous vraiment supprimer l\'utilisateur ' + user.email + ' ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.kanbanService.deleteUser(user.email);
            this.users = this.users.filter(val => val.email !== user.email);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'utilisateur supprimé', life: 3000});
        }
    });
}

}
