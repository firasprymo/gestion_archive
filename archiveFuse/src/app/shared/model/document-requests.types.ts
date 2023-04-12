import {Trainers} from './trainers.types';
import {Category} from './category.types';
import {DirectionRegional} from './direction-regional.types';
import {Users} from './users.types';

export interface Document {
    id: number;
      document: Document;
      user: Users;
}
