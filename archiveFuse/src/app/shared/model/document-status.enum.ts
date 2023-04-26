import {Users} from './users.types';
import {Documents} from './documents.types';

export enum DocumentStatus {
    PENDING = 'En attente',
    PRIME_AGE = 'Premier âge',
    MATURITY_PRIME_AGE = 'Maturité premier âge',
    SECOND_AGE = 'Deuxième âge',
    MATURITY_SECOND_AGE = 'Maturité deuxième âge',
    THIRD_AGE = 'Troisième âge',
    DESTRUCTED = 'détruit'
}
