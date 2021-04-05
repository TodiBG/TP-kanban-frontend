
export interface Fiche {
  id:          number;
  libelle:     string;
  dateButoire: Date;
  temps:       number;
  lieu:        string;
  url:         string;
  note:         string;
  user:        User;
  tags:        Tag[];
  section:     Section;
  tab:         Tableau;
}



export interface Tag {
  id: number ;
  libelle: string;
}



export interface Tableau {
  id:      number;
  libelle: string;
}

export interface Section {
  id:      number;
  libelle: string;
}


export interface User {
  email:  string;
  prenom: string;
  nom:    string;
}


