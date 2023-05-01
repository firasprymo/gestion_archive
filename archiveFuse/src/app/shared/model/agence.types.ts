import {StructureCentral} from './structure-central.types';
import {Users} from './users.types';

export interface Agence {
    id: number;
    codeAgence: string;
    libelleAgence: string;
    lieuArchive: string;
    lieuArchiveSecAge: string;
    structure: StructureCentral;
    users: Users[];
}
