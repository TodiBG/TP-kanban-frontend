import { Component, OnInit } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';
import { Fiche } from '../../modeles/kanban';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {

    ficheDialog!: boolean;

    fiches!: Fiche[];

    fiche!: Fiche | any ;

    selectedFiches!: Fiche[];

   submitted!: boolean;   

    constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
      this.kanbanService.getAllFiches().subscribe((data) => {
        this.fiches = data;
        console.log("data", data);
      });
    }

    openNew() {
        //this.fiche;
        this.submitted = false;
        this.ficheDialog = true;
    }

    deleteSelectedFiches() {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer les fiches selectionnées ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                console.log("this.selectedFiches", this.selectedFiches);

                this.kanbanService.deleteFiche(this.selectedFiches[0].id)
                    
                    /*.subscribe((data) => {
                    this.fiches = data;
                  })  ;
                  */

                this.fiches = this.fiches.filter(val => !this.selectedFiches.includes(val));
                this.selectedFiches = [];

                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
            }
        });
    }

    editFiche(fiche: Fiche) {
        this.fiche = {...fiche};
        this.ficheDialog = true;
    }

    deleteFiche (fiche: Fiche) {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer la fiche ' + fiche.id + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

               /* console.log("fiche", fiche);
                this.kanbanService.deleteFiche(fiche.id).subscribe((data) => {
                    this.fiches = data;
                  })  ;
    */
                  this.fiches = this.fiches.filter(val => val.id !== fiche.id);

              
                this.fiche = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'fiche supprimée', life: 3000});
            }
        });
    }

    hideDialog() {
        this.ficheDialog = false;
        this.submitted = false;
    }
    
    saveFiche() {
        this.submitted = true;

        if (this.fiche.libelle.trim()) {
            if (this.fiche.id) {
                this.fiches[this.findIndexById(this.fiche.id)] = this.fiche;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Fiche mise à jour', life: 3000});
            }
            else {
                this.fiche.id = this.createId();
                //this.fiche.image = 'fiche-placeholder.svg';
                this.fiches.push(this.fiche);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'La fiche a été créée', life: 3000});
            }

            this.fiches = [...this.fiches];
            this.ficheDialog = false;
            this.fiche = null;
        }
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
  
















  

}
