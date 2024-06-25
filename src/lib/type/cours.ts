export type Cours = {
  id: string;
  titre: string;
  profId: number;
};

export enum Level {
  Débutant = "Débutant",
  Intermédiaire = "Intermédiaire",
  Avancé = "Avancé",
}
