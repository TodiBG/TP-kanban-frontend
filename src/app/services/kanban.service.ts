import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Fiche, Tag, User, Section, Tableau } from '../modeles/kanban';


const base_url = "kanban-api/";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  observableFiches = new Subject<Fiche[]>();
  observableTags = new Subject<Tag[]>();
  observableUsers = new Subject<User[]>();
  observableSections = new Subject<Section[]>();
  observableTabs = new Subject<Tableau[]>();
  
  constructor(private http: HttpClient) {

    this.http.get<Fiche[]> (base_url + "fiches/").subscribe(data => {
      this.observableFiches.next(data);
    });
    
    this.http.get<Tag[]>(base_url + "tags/").subscribe(data => {
      this.observableTags.next(data);
    });

    this.http.get<User[]>(base_url + "users/").subscribe(data => {
      this.observableUsers.next(data);
    });

    this.http.get<Section[]>(base_url + "sections/").subscribe(data => {
      this.observableSections.next(data);
    });

    this.http.get<Tableau[]> (base_url+"tableaux/").subscribe(data => {
      this.observableTabs.next(data);
    });


  }
  





  getAllFiches(): Subject<Fiche[]> {
        return this.observableFiches;  
  }


  getAllUsers():Subject<User[]> {
    return this.observableUsers;
  }

  getAllSections():Subject<Section[]> {
    return this.observableSections; 
  }


  getAllTabs():Subject<Tableau[]> {
    return this.observableTabs; 
  }


  deleteFiche(id: number){
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    this.http.delete(base_url + "fiches/delete/" + id, httpOptions).subscribe(reponse => {

    });
    
    this.http.get<Fiche[]>(base_url + "fiches/").subscribe(data => {
      this.observableFiches.next(data);
      
     }) ;
    
  }


  saveFiche(fiche: Fiche) {
    let fi: Fiche|any = null;
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post<Fiche>(base_url + "fiches/create",fiche, httpOptions).subscribe(reponse => {
      fi = reponse;
    });
    
    this.http.get<Fiche[]>(base_url + "fiches/").subscribe(data => {
      this.observableFiches.next(data);
     }) ;

  }


  editFiche(fiche: Fiche) {

    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.put<Fiche>(base_url + "fiches/update/" + fiche.id, fiche, httpOptions).subscribe(dat => {
    });
    
    this.http.get<Fiche[]>(base_url + "fiches/").subscribe(data => {
      this.observableFiches.next(data);
     }) ;

  }



  getAllTags():Subject<Tag[]> {
    return this.observableTags;
  }

  createTag(tag: Tag) {
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post<Tag>(base_url + "tags/create",tag, httpOptions).subscribe(reponse => {
    });
    
    this.http.get<Tag[]>(base_url + "tags/").subscribe(data => {
      //this.observableTags.next(data);
    });
  }


  editTag(tag: Tag) {
   const  httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    };

    this.http.put<Tag>(base_url + "tags/update/"+tag.id,tag, httpOptions).subscribe(reponse => {
    });
    
    this.http.get<Tag[]>(base_url + "tags/").subscribe(data => {
      //this.observableTags.next(data);
    });
  }

  deleteTag(id: number) {
    const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.delete(base_url + "tags/delete/" + id, httpOptions).subscribe(reponse => {

    });
    
    this.http.get<Tag[]>(base_url + "tags/").subscribe(data => {
      this.observableTags.next(data);
     }) ;
    
  }






createUser(user: User) {
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post<User>(base_url + "users/create",user, httpOptions).subscribe(reponse => {
    });
    
    this.http.get<User[]>(base_url + "users/").subscribe(data => {
      //this.observableTags.next(data);
    });
  }


  editUser(user: User) {
    console.log("edit user")
   const  httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    };

    this.http.post<User>(base_url + "users/update/"+user.email,user, httpOptions).subscribe(reponse => {
    });
    
    this.http.get<User[]>(base_url + "users/").subscribe(data => {
      //this.observableTags.next(data);
    });
  }

  deleteUser(email: string) {
    const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.put(base_url + "users/delete/" + email, httpOptions).subscribe(reponse => {

    });
    
    this.http.get<User[]>(base_url + "users/").subscribe(data => {
      this.observableUsers.next(data);
     }) ;
    
  }




}
