import {Trainers} from './trainers.types';
import {Category} from './category.types';
import {DirectionRegional} from './direction-regional.types';

export interface Document {
    id: number;
      codeNomenclature: string;
      nomberPage: string;
      dateCreation: Date;
      dateReception: Date;
      codeLieuArchive: string;
      lieuArchive: string;
}
