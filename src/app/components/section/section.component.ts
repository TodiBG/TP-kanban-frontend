import { Component, OnInit } from '@angular/core';
import { Section, Tableau } from '../../modeles/kanban';
import { KanbanService } from '../../services/kanban.service';
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  createSectionDialog = false;
  editSectionDialog = false;
    
  sections!: Section[];

  selectedSection: Section = {id:0, libelle:"",tab:{} }  ;

  newSection: Section = {id:0, libelle:"",tab:{} }  ;

  selectedSections!: Section[];

    submitted!: boolean;
    editSubmitted = false;
    oldLibelle = "";

    tableaux!: Tableau[];
    tabId  = 0 ;


  constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.kanbanService.getAllSections().subscribe((data) => {
      this.sections = data;
    });

    this.kanbanService.getAllTabs().subscribe((data) => {
      this.tableaux = data;
    });
  }

  openNew() {
      //this.selectedSection;
      this.submitted = false;
      this.createSectionDialog = true;
  }

  deleteSelectedSections() {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer les Selections selectionnées ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            console.log("Sections", this.selectedSections);
              this.selectedSections.forEach(section => {
                  this.kanbanService.deleteSection(section.id);
              });

              this.sections = this.sections.filter(val => !this.selectedSections.includes(val));
              this.selectedSections = [];

              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
          }
      });
  }

  showEditSectionDialog(section: Section) {
      this.selectedSection = section;
      this.oldLibelle = this.selectedSection.libelle;
      this.editSectionDialog = true;
      this.tabId = section.tab.id;
  }

    
  hideDialog() {
    this.createSectionDialog = false;
    this.submitted = false;
}


  hideEditDialog() {
          this.selectedSection.libelle = this.oldLibelle;
          this.editSectionDialog = false;
      
      this.editSubmitted = false;
  }
  
  createSection() {
      this.submitted = true;

        this.sections.push(this.newSection);
        this.kanbanService.createSection(this.newSection);
          this.createSectionDialog = false;
          this.newSection = {id:0, libelle:"", tab:{} } ;
         this.messageService.add({severity:'success', summary: 'Successful', detail: 'La Section a été créée', life: 3000});
          
  }


  editSection(newSection: Section) {
    const tabList = this.tableaux.filter(t => t.id == this.tabId);
    if (tabList.length != 0) { newSection.tab = tabList[0]; }
      
    this.editSubmitted = false;
    this.kanbanService.editSection(this.selectedSection);
    this.editSectionDialog = false;
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'La Section a été créée', life: 3000});
          
  }
 
   
    
    
   deleteSection (section: Section) {
    this.confirmationService.confirm({
        message: 'Voulez-vous vraiment supprimer la section ' + section.id + ' ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.kanbanService.deleteSection(section.id);
            this.sections = this.sections.filter(val => val.id !== section.id);
            //this.selectedTag = { id: 0, libelle: "" }; 

            this.messageService.add({severity:'success', summary: 'Successful', detail: 'section supprimée', life: 3000});
        }
    });
}

}


