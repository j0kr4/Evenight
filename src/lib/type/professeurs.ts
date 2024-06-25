import { Cours } from "./cours";

export type Professeur = {
  id: number;
  nom: string;
  cours: Cours[];
};
