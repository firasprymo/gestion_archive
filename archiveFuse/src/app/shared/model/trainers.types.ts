import {Users} from './users.types';
import {Skills} from './skills.types';

export interface Trainers {
    id?: string;
    competences?: string;
    post?: string;
    about?: string;
    cover?: string;
    url?: string;
    skillsNames?: Skills[];
    users?: Users;
}
