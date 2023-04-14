import {DirectionRegional} from './direction-regional.types';

export interface StructureCentral {
    id: number;
    codeStructure: number;
    libelleStructure: string;
    lieuArchive: string;
    lieuArchiveSecAge: string;
    directeur: DirectionRegional;
}
