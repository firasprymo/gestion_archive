import {DocumentStatus} from './document-status.enum';
import {Nomenclature} from "./nomenclature.types";

export interface Documents {
    id: number;
    codeNomenclature: string;
    nomberPage: string;
    numDocument: string;
    dateCreation: Date;
    maturiteSecAge: Date;
    maturitePremAge: Date;
    dateReception: Date;
    codeLieuArchive: string;
    lieuArchive: string;
    status: DocumentStatus;
    nomenclature: Nomenclature;
}
