import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {DirectionRegional} from '../model/direction-regional.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

const directionRegionalURL = environment.directionRegional;

@Injectable({
    providedIn: 'root'
})
export class DirectionRegionalService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _directionRegionals: BehaviorSubject<DirectionRegional[] | null> = new BehaviorSubject(null);
    private _directionRegional: BehaviorSubject<DirectionRegional | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for DirectionRegional
     */
    get directionRegionals$(): Observable<DirectionRegional[]> {
        return this._directionRegionals.asObservable();
    }

    /**
     * Getter for item
     */
    get directionRegional$(): Observable<DirectionRegional> {
        return this._directionRegional.asObservable();
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
    addDirectionRegional(directionRegional): Observable<DirectionRegional> {
        return this._httpClient.post<DirectionRegional>(
            `${ApiService.apiVersion}${ApiService.apiDirectionRegional}/create`,
            directionRegional)
            .pipe(
                map(newDirectionRegional =>
                    newDirectionRegional
                )
            );
    }

    editDirectionRegional(body, id): Observable<DirectionRegional> {
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiDirectionRegional}/${id}`, body)
            .pipe(map(res => res));
    }

    /**
     * Get directionRegional by id
     */
    getDirectionRegionalById(id): Observable<DirectionRegional> {
        return this._directionRegional.pipe(
            take(1),
            map((directionRegionalItem) => {
                this._directionRegional.next(directionRegionalItem);
                return directionRegionalItem;
            }),
            switchMap((directionRegionalItem) => {

                if (!directionRegionalItem) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(directionRegionalItem);
            })
        );
    }

    /**
     * Get DirectionRegional
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllDirectionRegionals(page = 0, size = 0, sort: string = 'libelleDirection', order: 'asc' | 'desc' | '' = 'asc', search?):
        Observable<{ pageable: InventoryPagination; content: DirectionRegional[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: DirectionRegional[] }>
        (`${ApiService.apiVersion}${ApiService.apiDirectionRegional}/get-all-direction-regionals`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                console.log(response);
                this._pagination.next(response.pageable);
                this._directionRegionals.next(response.content);
            })
        );
    }

    /**
     * Delete the directionRegional
     *
     * @param directionRegional
     */
    deleteDirectionRegional(directionRegional: DirectionRegional): Observable<boolean> {
        return this.directionRegionals$.pipe(
            take(1),
            switchMap(directionRegionalItem =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiDirectionRegional}/${directionRegional.codeDirection}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = directionRegionalItem.findIndex(item => item.codeDirection === directionRegional.codeDirection);
                        // Delete the product
                        directionRegionalItem.splice(index, 1);
                        // Update the directionRegionalItem
                        this._directionRegionals.next(directionRegionalItem);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getDirectionRegional(): Observable<DirectionRegional[]> {
        return this._httpClient.get<DirectionRegional[]>(`${ApiService.apiVersion}${ApiService.apiDirectionRegional}`).pipe(
            tap((response: any) => {
                this._directionRegional.next(response);
            })
        );
    }

}
