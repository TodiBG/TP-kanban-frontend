import { Component, OnInit } from '@angular/core';
import { Tableau } from '../../modeles/kanban';
import { KanbanService } from '../../services/kanban.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {

  createTabDialog = false;
  editTabDialog = false;
    
  tabs!: Tableau[];

  selectedTab: Tableau = {id:0, libelle:"" }  ;

  newTab: Tableau = {id:0, libelle:"" }  ;

  selectedTabs!: Tableau[];

    submitted!: boolean;
    editSubmitted = false;
    oldLibelle = "";

  constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.kanbanService.getAllTabs().subscribe((data) => {
      this.tabs = data;
    });
  }

  openNew() {
      //this.selectedTag;
      this.submitted = false;
      this.createTabDialog = true;
  }

  deleteSelectedTabs() {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer les Tags selectionnées ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            console.log("Tags", this.selectedTabs);
              this.selectedTabs.forEach(tab => {
                  this.kanbanService.deleteTab(tab.id);
              });

              this.tabs = this.tabs.filter(val => !this.selectedTabs.includes(val));
              this.selectedTabs = [];

              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
          }
      });
  }

  showEditTabDialog(tab: Tableau) {
      this.selectedTab = tab;
      this.oldLibelle = this.selectedTab.libelle;
      this.editTabDialog = true;
  }

    
  hideDialog() {
    this.createTabDialog = false;
    this.submitted = false;
}


  hideEditDialog() {
          this.selectedTab.libelle = this.oldLibelle;
          this.editTabDialog = false;
      
      this.editSubmitted = false;
  }
  
  createTab() {
      this.submitted = true;

        this.tabs.push(this.newTab);
        this.kanbanService.createTab(this.newTab);
          this.createTabDialog = false;
          this.newTab = {id:0, libelle:"" } ;
         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Le Tableau a été créée', life: 3000});
          
  }


  editTab() {
      this.editSubmitted = false;
      this.kanbanService.editTab(this.selectedTab);
        this.editTabDialog = false;
       this.messageService.add({severity:'success', summary: 'Successful', detail: 'Le Tableau a été créée', life: 3000});
          
   }
 
   
    
    
   deleteTab(tab: Tableau) {
    this.confirmationService.confirm({
        message: 'Voulez-vous vraiment supprimer le tableau ' + tab.id + ' ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
      accept: () => {
            
            this.kanbanService.deleteTab(tab.id );
            this.tabs = this.tabs.filter(val => val.id !== tab.id);
            //this.selectedTag = { id: 0, libelle: "" }; 

            this.messageService.add({severity:'success', summary: 'Successful', detail: 'tableau supprimé', life: 3000});
        }
    });
}

}
