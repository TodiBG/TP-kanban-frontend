import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiche, Tag, User, Section, Tableau } from '../modeles/kanban';


const base_url = "/kanban-api/";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  
  constructor(private http: HttpClient) { }









  getAllTags():Observable<Tag[]> {
    return this.http.get<Tag[]> (base_url+"tags/");
  }


  getAllFiches():Observable<Fiche[]> {
    return this.http.get<Fiche[]> (base_url+"fiches/");
  }


  getAllUsers():Observable<User[]> {
    return this.http.get<User[]> (base_url+"users/");
  }

  getAllSections():Observable<Section[]> {
    return this.http.get<Section[]> (base_url+"sections/");
  }


  getAllTabs():Observable<Tableau[]> {
    return this.http.get<Tableau[]> (base_url+"tableaux/");
  }


  deleteFiche(id: number): Observable<Fiche[]> {
    console.log("fiche " + id);
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    this.http.delete(base_url + "fiches/delete/" + id, httpOptions).subscribe(reponse => {
       console.log("fiche supprimée ",reponse );
    } )  ;
    return this.http.get<Fiche[]> (base_url+"fiches/");
  }


  saveFiche(fiche: Fiche) {
    let fi: Fiche|any = null;
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   /* 
    let fiche2 =  JSON.parse(  JSON.stringify(fiche)  ) ;
    fiche2.user = JSON.parse(JSON.stringify(fiche.user ));
    fiche2.tab = JSON.parse(JSON.stringify(fiche.tab));
    fiche2.section = JSON.parse(JSON.stringify(fiche.section));
    fiche2.tags = JSON.parse(  JSON.stringify(fiche.tags)  ) ;
    
    console.log("fiche ", fiche); */

    this.http.post<Fiche>(base_url + "fiches/create",fiche, httpOptions).subscribe(reponse => {
      fi = reponse;
    });
    
    return fi;

  }


  editFiche(fiche: Fiche) {
    let fi: Fiche|any = null;
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.put<Fiche>(base_url + "fiches/update/"+fiche.id,fiche, httpOptions).subscribe(reponse => {
      fi = reponse;
    });
    
    return fi;

  }









}
