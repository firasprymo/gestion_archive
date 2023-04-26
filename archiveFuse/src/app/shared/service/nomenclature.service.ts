import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Nomenclature} from '../model/nomenclature.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Documents} from '../model/documents.types';


@Injectable({
    providedIn: 'root'
})
export class NomenclatureService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _nomenclatures: BehaviorSubject<Nomenclature[] | null> = new BehaviorSubject(null);
    private _nomenclature: BehaviorSubject<Nomenclature | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for Nomenclature
     */
    get nomenclatures$(): Observable<Nomenclature[]> {
        console.log(this._nomenclatures);
        return this._nomenclatures.asObservable();
    }

    /**
     * Getter for item
     */
    get nomenclature$(): Observable<Nomenclature> {
        return this._nomenclature.asObservable();
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
    addNomenclature(nomenclature): Observable<Nomenclature> {
        return this._httpClient.post<Nomenclature>(
            `${ApiService.apiNomenclatures}/create`,
            nomenclature)
            .pipe(
                map(newNomenclature =>
                    newNomenclature
                )
            );
    }

    editNomenclature(body, id): Observable<Nomenclature> {
        return this._apiService.patch(`${ApiService.apiNomenclatures}/${id}`, body)
            .pipe(map(res => res));
    }

    /**
     * Get nomenclature by id
     */
    getNomenclatureById(id): Observable<Nomenclature> {
        return this._httpClient.get<Nomenclature>(`${ApiService.apiNomenclatures}/${id}`).pipe(
            map((nomenclature) => {
                // Update the nomenclature
                this._nomenclature.next(nomenclature);

                // Return the nomenclature
                return nomenclature;
            }),
            switchMap((nomenclature) => {

                if (!nomenclature) {
                    return throwError('Could not found nomenclature with id of ' + id + '!');
                }

                return of(nomenclature);
            })
        );
    }

    /**
     * Get Nomenclature
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllNomenclatures(page = 0, size = 0, sort: string = 'designationNomenclature', order: 'asc' | 'desc' | '' = 'asc', search?):
        Observable<{ pageable: InventoryPagination; content: Nomenclature[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Nomenclature[] }>
        (`${ApiService.apiNomenclatures}/get-all-nomenclatures`, {
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
                this._nomenclatures.next(response.content);
            })
        );
    }

    /**
     * Delete the nomenclature
     *
     * @param nomenclature
     */
    deleteNomenclature(nomenclature: Nomenclature): Observable<boolean> {
        return this.nomenclatures$.pipe(
            take(1),
            switchMap(nomenclatureItem =>
                this._httpClient.delete(`${ApiService.apiNomenclatures}/${nomenclature.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = nomenclatureItem.findIndex(item => item.designationNomenclature === nomenclature.designationNomenclature);
                        // Delete the product
                        nomenclatureItem.splice(index, 1);
                        // Update the nomenclatureItem
                        this._nomenclatures.next(nomenclatureItem);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getNomenclature(): Observable<Nomenclature[]> {
        return this._httpClient.get<Nomenclature[]>(`codeNomenclature${ApiService.apiNomenclatures}`).pipe(
            tap((response: any) => {
                this._nomenclature.next(response);
            })
        );
    }

}
