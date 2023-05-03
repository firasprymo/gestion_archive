import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {CentreArchive} from '../model/centre-archive.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Nomenclature} from "../model/nomenclature.types";


@Injectable({
    providedIn: 'root'
})
export class CentreArchiveService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _centreArchives: BehaviorSubject<CentreArchive[] | null> = new BehaviorSubject(null);
    private _centreArchive: BehaviorSubject<CentreArchive | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for CentreArchive
     */
    get centreArchives$(): Observable<CentreArchive[]> {
        console.log(this._centreArchives);
        return this._centreArchives.asObservable();
    }

    /**
     * Getter for item
     */
    get centreArchive$(): Observable<CentreArchive> {
        return this._centreArchive.asObservable();
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
    addCentreArchive(centreArchive): Observable<CentreArchive> {
        return this._httpClient.post<CentreArchive>(
            `${ApiService.apiCentreArchives}/create`,
            centreArchive)
            .pipe(
                map(newCentreArchive =>
                    newCentreArchive
                )
            );
    }

    editCentreArchive(body, id): Observable<CentreArchive> {
        return this._apiService.patch(`${ApiService.apiCentreArchives}/${id}`, body)
            .pipe(map(res => res));
    }

    /**
     * Get centreArchive by id
     */
    getCentreArchiveById(id): Observable<CentreArchive> {
        return this._httpClient.get<CentreArchive>(`${ApiService.apiCentreArchives}/${id}`).pipe(
            map((centreArchive) => {
                // Update the this.centreArchive
                this._centreArchive.next(centreArchive);

                // Return the this.centreArchive
                return centreArchive;
            }),
            switchMap((centreArchive) => {

                if (!centreArchive) {
                    return throwError('Could not found centreArchive with id of ' + id + '!');
                }

                return of(centreArchive);
            })
        );
    }

    /**
     * Get CentreArchive
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllCentreArchives(page = 0, size = 0, sort: string = 'libelleCentreArchive', order: 'asc' | 'desc' | '' = 'asc', search?):
        Observable<{ pageable: InventoryPagination; content: CentreArchive[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: CentreArchive[] }>
        (`${ApiService.apiCentreArchives}/get-all-centre-archives`, {
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
                this._centreArchives.next(response.content);
            })
        );
    }

    /**
     * Delete the centreArchive
     *
     * @param centreArchive
     */
    deleteCentreArchive(centreArchive: CentreArchive): Observable<boolean> {
        return this.centreArchives$.pipe(
            take(1),
            switchMap(centreArchiveItem =>
                this._httpClient.delete(`${ApiService.apiCentreArchives}/${centreArchive.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = centreArchiveItem.findIndex(item => item.codeCentreArchive === centreArchive.codeCentreArchive);
                        // Delete the product
                        centreArchiveItem.splice(index, 1);
                        // Update the centreArchiveItem
                        this._centreArchives.next(centreArchiveItem);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getCentreArchive(): Observable<CentreArchive[]> {
        return this._httpClient.get<CentreArchive[]>(`codeCentreArchive${ApiService.apiCentreArchives}`).pipe(
            tap((response: any) => {
                this._centreArchive.next(response);
            })
        );
    }

}
