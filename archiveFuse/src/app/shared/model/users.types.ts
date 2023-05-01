import {DirectionRegional} from './direction-regional.types';
import {StructureCentral} from './structure-central.types';
import {Agence} from './agence.types';

export interface Users {
    id?: string;
    status?: string;
    avatar?: string;
    username?: string;
    email?: string;
    password?: string;
    active?: boolean;
    picture?: string;
    roles?: any[];
    role?: string;
    directionRegional: DirectionRegional;
    structureCentral: StructureCentral;
    agence: Agence;

}
