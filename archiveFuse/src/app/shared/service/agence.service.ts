import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Agence} from '../model/agence.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {DirectionRegional} from "../model/direction-regional.types";


@Injectable({
    providedIn: 'root'
})
export class AgenceService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _agences: BehaviorSubject<Agence[] | null> = new BehaviorSubject(null);
    private _agence: BehaviorSubject<Agence | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for Agence
     */
    get agences$(): Observable<Agence[]> {
        return this._agences.asObservable();
    }

    /**
     * Getter for item
     */
    get agence$(): Observable<Agence> {
        return this._agence.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Create product
     */
    addAgence(agence): Observable<Agence> {
        return this._httpClient.post<Agence>(
            `${ApiService.apiAgences}/create`,
            agence)
            .pipe(
                map(newAgence =>
                    newAgence
                )
            );
    }

    editAgence(body, id): Observable<Agence> {
        return this._apiService.patch(`${ApiService.apiAgences}/${id}`, body)
            .pipe(map(res => res));
    }

    /**
     * Get agence by id
     */
    getAgenceById(id): Observable<Agence> {
        return this._httpClient.get<Agence>(`${ApiService.apiAgences}/${id}`)
            .pipe(
                map((agence) => {
                    // Update the directionRegional
                    this._agence.next(agence);

                    // Return the agence
                    return agence;
                }),
            switchMap((agenceItem) => {

                if (!agenceItem) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(agenceItem);
            })
        );
    }

    /**
     * Get Agence
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllAgences(page = 0, size = 0, sort: string = 'libelleAgence', order: 'asc' | 'desc' | '' = 'asc', search?):
        Observable<{ pageable: InventoryPagination; content: Agence[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Agence[] }>
        (`${ApiService.apiAgences}/get-all-agences`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pageable);
                this._agences.next(response.content);
            })
        );
    }

    /**
     * Delete the agence
     *
     * @param agence
     */
    deleteAgence(agence: Agence): Observable<boolean> {
        return this.agences$.pipe(
            take(1),
            switchMap(agenceItem =>
                this._httpClient.delete(`${ApiService.apiAgences}/${agence.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = agenceItem.findIndex(item => item.codeAgence === agence.codeAgence);
                        // Delete the product
                        agenceItem.splice(index, 1);
                        // Update the agenceItem
                        this._agences.next(agenceItem);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getAgence(): Observable<Agence[]> {
        return this._httpClient.get<Agence[]>(`codeAgence${ApiService.apiAgences}`).pipe(
            tap((response: any) => {
                this._agence.next(response);
            })
        );
    }

}
