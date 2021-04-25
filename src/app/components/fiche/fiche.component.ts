import { Component, OnInit } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';
import { Fiche, User, Tag, Tableau, Section } from '../../modeles/kanban';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {


    createFicheDialog = false;
    editFicheDialog = false;

    selectedCity: any;
    selectedCities!: any[];

    fiches!: Fiche[];

    fiche: Fiche  = {id:0, libelle: "", dateButoire:  new Date("dd/mm/yy"), temps: 0,lieu: "", url:"", note:"", user:{} , tags:[], section: {},tab: {} } ;

    selectedFiches!: Fiche[];

    submitted!: boolean;
    users!: User[];
    tags!: Tag[];
    tableaux!: Tableau[];
    sections!: Section[]; 

    userEmail = "" ;
    dateButoire : Date =  new Date(1613340000000); 
    tabId  = 0 ;
    sectionId = 0;

    tagListVisible = false;
    tagsToShow!: Tag[];
    

    constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService, private config: PrimeNGConfig, private datePipe: DatePipe) { }

    ngOnInit() {
        this.config.setTranslation({
            accept: 'Accept',
            reject: 'Cancel',
            //translations
        });

      this.kanbanService.getAllFiches().subscribe((data) => {
          this.fiches = data;
          console.log("fiches :", data);
      });
        
      this.kanbanService.getAllUsers().subscribe((data) => {
        this.users = data;
      });
    
      this.kanbanService.getAllTags().subscribe((data) => {
        this.tags = data;
      });
        
      this.kanbanService.getAllSections().subscribe((data) => {
        this.sections = data;
      });
        
      this.kanbanService.getAllTabs().subscribe((data) => {
        this.tableaux = data;
      });
        
        
    }

    openNew() {
        this.dateButoire = new Date(1613340000000);
        this.submitted = false;
        this.createFicheDialog = true;
    }

    deleteSelectedFiches() {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer les fiches selectionnées ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                console.log("this.selectedFiches", this.selectedFiches);

                this.kanbanService.deleteFiche(this.selectedFiches[0].id)
                    

                this.fiches = this.fiches.filter(val => !this.selectedFiches.includes(val));
                this.selectedFiches = [];

                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
            }
        });
    }

    showEditFicheDialog(fiche: Fiche) {
        this.userEmail = fiche.user.email;
        this.tabId = fiche.tab.id; 
        this.sectionId = fiche.section.id;
        this.dateButoire = new Date(fiche.dateButoire);  //;
        this.fiche = fiche ;
        this.editFicheDialog = true;
    }

    editFiche(fiche: Fiche) {


        const usersList = this.users.filter(u => u.email === this.userEmail);
        if (usersList.length != 0) { fiche.user = usersList[0]; }
         
        const tabList = this.tableaux.filter(t => t.id == this.tabId);
        if (tabList.length != 0) { fiche.tab = tabList[0]; }
        
        const sectionList = this.sections.filter(s => s.id == this.sectionId);
        if (sectionList.length != 0) { fiche.section = sectionList[0]; }
        


        this.kanbanService.editFiche(fiche);
        this.editFicheDialog = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Fiche mise à jour', life: 3000});

    }

    deleteFiche (fiche: Fiche) {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer la fiche ' + fiche.id + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.kanbanService.deleteFiche(fiche.id);
                this.fiches = this.fiches.filter(val => val.id !== fiche.id);
                this.fiche = {id:0, libelle: "", dateButoire:  new Date(), temps: 0,lieu: "", url:"", note:"", user:{} , tags:{}, section: {},tab: {} } ;

                this.messageService.add({severity:'success', summary: 'Successful', detail: 'fiche supprimée', life: 3000});
            }
        });
    }

    hideDialog() {
        this.createFicheDialog = false;

        this.submitted = false;
    }
    
    createFiche(fiche: Fiche) {
        this.submitted = true;
        
        const usersList = this.users.filter(u => u.email === this.userEmail);
        if (usersList.length != 0) { fiche.user = usersList[0]; }
         
        const tabList = this.tableaux.filter(t => t.id == this.tabId);
        if (tabList.length != 0) { fiche.tab = tabList[0]; }
        
        const sectionList = this.sections.filter(s => s.id == this.sectionId);
        if (sectionList.length != 0) { fiche.section = sectionList[0]; }
        
        //fiche.dateButoire = this.datePipe.transform(fiche.dateButoire, "dd/mm/yy");
        this.fiches.push(this.fiche);
        console.log(" tranform fiche", this.datePipe.transform(fiche.dateButoire, "dd/mm/yyyy") );
        this.kanbanService.saveFiche(fiche); 
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'La fiche a été créée', life: 3000});
 
        this.createFicheDialog = false;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.fiches.length; i++) {
            if (this.fiches[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        let id = 0;
        /* var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        */
    
        return id;
    }

    showTags(fiche:Fiche) {
        this.tagsToShow = fiche.tags;
        this.tagListVisible = true;
    }
  
  

}
