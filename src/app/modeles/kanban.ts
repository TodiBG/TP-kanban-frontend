
export interface Fiche {
  id   :          number;
  libelle? :     string;
  dateButoire? : Date;
  temps? :       number;
  lieu? :        string;
  url? :         string;
  note? :         string;
  user? :        User |any ;
  tags? :        Tag[]|any;
  section? :     Section|any;
  tab? :         Tableau|any;
}



export interface Tag {
  id : number ;
  libelle? : string;
}



export interface Tableau {
  id :      number;
  libelle? : string;
}

export interface Section {
  id :      number;
  libelle? : string;
  tab? :     Tableau|any;
}


export interface User {
  email? :  string;
  prenom? : string;
  nom? :    string;
}


