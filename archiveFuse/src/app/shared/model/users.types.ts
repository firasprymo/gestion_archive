import {DirectionRegional} from './direction-regional.types';
import {StructureCentral} from './structure-central.types';
import {Agence} from './agence.types';

export interface Users {
    id?: string;
    status?: string;
    avatar?: string;
    username?: string;
    email?: string;
    lieuAffectation?: string;
    password?: string;
    active?: boolean;
    picture?: string;
    roles?: Role[];
    role?: string;
    directionRegional: DirectionRegional;
    structureCentral: StructureCentral;
    agence: Agence;

}
export interface Role {
    id?: string;
    roleName?: string;

}
