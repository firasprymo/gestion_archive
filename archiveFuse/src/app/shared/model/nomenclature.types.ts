import {StructureCentral} from './structure-central.types';
import {User} from '../../core/user/user.types';

export interface Nomenclature {
    id: number;
    designationNomenclature: string;
    dureeConservationPremAge: string;
    dureeConservationSecAge: string;
    valeurHistoriqueTroiAge: string;
    documents: Document[];
}
