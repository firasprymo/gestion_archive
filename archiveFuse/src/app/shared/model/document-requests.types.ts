import {Users} from './users.types';
import {Documents} from './documents.types';

export interface DocumentRequest {
    id: number;
      document: Documents;
      user: Users;
}
