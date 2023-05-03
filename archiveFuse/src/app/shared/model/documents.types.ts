import {DocumentStatus} from './document-status.enum';

export interface Documents {
    id: number;
    codeNomenclature: string;
    nomberPage: string;
    dateCreation: Date;
    maturiteSecAge: Date;
    maturitePremAge: Date;
    dateReception: Date;
    codeLieuArchive: string;
    lieuArchive: string;
    status: DocumentStatus;
}
