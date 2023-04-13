import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {CentrePreArchive} from '../model/centre-pre-archive.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CentrePreArchiveService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _centrePreArchives: BehaviorSubject<CentrePreArchive[] | null> = new BehaviorSubject(null);
    private _centrePreArchive: BehaviorSubject<CentrePreArchive | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for CentrePreArchive
     */
    get centrePreArchives$(): Observable<CentrePreArchive[]> {
        console.log(this._centrePreArchives);
        return this._centrePreArchives.asObservable();
    }

    /**
     * Getter for item
     */
    get centrePreArchive$(): Observable<CentrePreArchive> {
        return this._centrePreArchive.asObservable();
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
    addCentrePreArchive(centreArchive): Observable<CentrePreArchive> {
        return this._httpClient.post<CentrePreArchive>(
            `${ApiService.apiCentrePreArchives}/create`,
            centreArchive)
            .pipe(
                map(newCentrePreArchive =>
                    newCentrePreArchive
                )
            );
    }

    editCentrePreArchive(body, id): Observable<CentrePreArchive> {
        return this._apiService.patch(`${ApiService.apiCentrePreArchives}/${id}`, body)
            .pipe(map(res => res));
    }

    /**
     * Get centreArchive by id
     */
    getCentrePreArchiveById(id): Observable<CentrePreArchive> {
        return this._centrePreArchive.pipe(
            take(1),
            map((centreArchiveItem) => {
                this._centrePreArchive.next(centreArchiveItem);
                return centreArchiveItem;
            }),
            switchMap((centreArchiveItem) => {

                if (!centreArchiveItem) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(centreArchiveItem);
            })
        );
    }

    /**
     * Get CentrePreArchive
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllCentrePreArchives(page = 0, size = 0, sort: string = 'codeCentrePreArchive',
                            order: 'asc' | 'desc' | '' = 'asc', search?):
        Observable<{ pageable: InventoryPagination; content: CentrePreArchive[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: CentrePreArchive[] }>
        (`${ApiService.apiCentrePreArchives}/get-all-centre-pre-archives`, {
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
                this._centrePreArchives.next(response.content);
            })
        );
    }

    /**
     * Delete the centreArchive
     *
     * @param centreArchive
     */
    deleteCentrePreArchive(centreArchive: CentrePreArchive): Observable<boolean> {
        return this.centrePreArchives$.pipe(
            take(1),
            switchMap(centreArchiveItem =>
                this._httpClient.delete(`${ApiService.apiCentrePreArchives}/${centreArchive.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = centreArchiveItem.findIndex(item => item.codeCentrePreArchive === centreArchive.codeCentrePreArchive);
                        // Delete the product
                        centreArchiveItem.splice(index, 1);
                        // Update the centreArchiveItem
                        this._centrePreArchives.next(centreArchiveItem);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getCentrePreArchive(): Observable<CentrePreArchive[]> {
        return this._httpClient.get<CentrePreArchive[]>(`codeCentrePreArchive${ApiService.apiCentrePreArchives}`).pipe(
            tap((response: any) => {
                this._centrePreArchive.next(response);
            })
        );
    }

}
