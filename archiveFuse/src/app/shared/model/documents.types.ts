import {DocumentStatus} from './document-status.enum';

export interface Document {
    id: number;
      codeNomenclature: string;
      nomberPage: string;
      dateCreation: Date;
      dateReception: Date;
      codeLieuArchive: string;
      lieuArchive: string;
      status: DocumentStatus;
}
