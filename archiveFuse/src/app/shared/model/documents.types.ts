import {DocumentStatus} from './document-status.enum';

export interface Documents {
    id: number;
      codeNomenclature: string;
      nomberPage: string;
      dateCreation: Date;
      dateReception: Date;
      codeLieuArchive: string;
      lieuArchive: string;
      status: DocumentStatus;
}
