import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiche, Tag } from '../modeles/kanban';


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

  deleteFiche(id: number) // : Observable<Fiche[]>
  {
    
    console.log("fiche " + id);
   const  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    this.http.delete(base_url + "fiches/delete/" + id+"/", httpOptions).subscribe(reponse => {
       console.log("fiche supprimée ",reponse );
    } )  ;
    
    
   // return this.http.get<Fiche[]> (base_url+"fiches/");
  }


}
