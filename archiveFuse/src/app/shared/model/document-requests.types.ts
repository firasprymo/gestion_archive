import {Users} from './users.types';
import {Document} from './documents.types';

export interface DocumentRequest {
    id: number;
      document: Document;
      user: Users;
}
