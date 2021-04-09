import { Component, OnInit } from '@angular/core';
import { Tag } from '../../modeles/kanban';
import { KanbanService } from '../../services/kanban.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})


export class TagComponent implements OnInit {

  createTagDialog = false;
  editTagDialog = false;
    
  tags!: Tag[];

  selectedTag: Tag = {id:0, libelle:"" }  ;

  newTag: Tag = {id:0, libelle:"" }  ;

  selectedTags!: Tag[];

    submitted!: boolean;
    editSubmitted = false;
    oldLibelle = "";

  constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.kanbanService.getAllTags().subscribe((data) => {
      this.tags = data;
    });
  }

  openNew() {
      //this.selectedTag;
      this.submitted = false;
      this.createTagDialog = true;
  }

  deleteSelectedTags() {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer les Tags selectionnées ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            console.log("Tags", this.selectedTags);
              this.selectedTags.forEach(tag => {
                  this.kanbanService.deleteTag(tag.id);
              });

              this.tags = this.tags.filter(val => !this.selectedTags.includes(val));
              this.selectedTags = [];

              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
          }
      });
  }

  showEditTagDialog(tag: Tag) {
      this.selectedTag = tag;
      this.oldLibelle = this.selectedTag.libelle;
      this.editTagDialog = true;
  }

    
  hideDialog() {
    this.createTagDialog = false;
    this.submitted = false;
}


  hideEditDialog() {
          this.selectedTag.libelle = this.oldLibelle;
          this.editTagDialog = false;
      
      this.editSubmitted = false;
  }
  
  createTag() {
      this.submitted = true;

        this.tags.push(this.newTag);
        this.kanbanService.createTag(this.newTag);
          this.createTagDialog = false;
          this.newTag = {id:0, libelle:"" } ;
         this.messageService.add({severity:'success', summary: 'Successful', detail: 'La Tag a été créée', life: 3000});
          
  }


  editTag() {
      this.editSubmitted = false;
      this.kanbanService.editTag(this.selectedTag);
        this.editTagDialog = false;
       this.messageService.add({severity:'success', summary: 'Successful', detail: 'La Tag a été créée', life: 3000});
          
   }
 
   
    
    
   deleteTag (tag: Tag) {
    this.confirmationService.confirm({
        message: 'Voulez-vous vraiment supprimer le tag ' + tag.id + ' ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.kanbanService.deleteTag(tag.id);
            this.tags = this.tags.filter(val => val.id !== tag.id);
            //this.selectedTag = { id: 0, libelle: "" }; 

            this.messageService.add({severity:'success', summary: 'Successful', detail: 'fiche supprimée', life: 3000});
        }
    });
}
    


}
