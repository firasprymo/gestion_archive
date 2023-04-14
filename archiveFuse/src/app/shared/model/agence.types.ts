import {StructureCentral} from './structure-central.types';
import {User} from '../../core/user/user.types';

export interface Agence {
    id: number;
    codeAgence: string;
    libelleAgence: string;
    lieuArchive: string;
    lieuArchiveSecAge: string;
    structure: StructureCentral;
    users: User[];
}
