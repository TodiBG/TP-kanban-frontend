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

  tagDialog!: boolean;

  tags!: Tag[];

  tag!: Tag | any ;

  selectedTags!: Tag[];

 submitted!: boolean;   

  constructor( private kanbanService : KanbanService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.kanbanService.getAllTags().subscribe((data) => {
      this.tags = data;
    });
  }

  openNew() {
      //this.tag;
      this.submitted = false;
      this.tagDialog = true;
  }

  deleteSelectedTags() {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer les Tags selectionnées ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {

              console.log("this.selectedTags", this.selectedTags);

             // this.kanbanService.deleteTag(this.selectedTags[0].id)
                  
                  /*.subscribe((data) => {
                  this.tags = data;
                })  ;
                */

              this.tags = this.tags.filter(val => !this.selectedTags.includes(val));
              this.selectedTags = [];

              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Suppression effectuée', life: 3000});
          }
      });
  }

  editTag(tag: Tag) {
      this.tag = {...tag};
      this.tagDialog = true;
  }

  deleteTag (Tag: Tag) {
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer la Tag ' + Tag.id + '?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {

             /* console.log("Tag", Tag);
              this.kanbanService.deleteTag(Tag.id).subscribe((data) => {
                  this.tags = data;
                })  ;
  */
                this.tags = this.tags.filter(val => val.id !== Tag.id);

            
              this.tag = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Tag supprimée', life: 3000});
          }
      });
  }

  hideDialog() {
      this.tagDialog = false;
      this.submitted = false;
  }
  
  saveTag() {
      this.submitted = true;

      if (this.tag.libelle.trim()) {
          if (this.tag.id) {
              this.tags[this.findIndexById(this.tag.id)] = this.tag;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Tag mise à jour', life: 3000});
          }
          else {
              this.tag.id = this.createId();
              //this.tag.image = 'Tag-placeholder.svg';
              this.tags.push(this.tag);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'La Tag a été créée', life: 3000});
          }

          this.tags = [...this.tags];
          this.tagDialog = false;
          this.tag = null;
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].id === id) {
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
