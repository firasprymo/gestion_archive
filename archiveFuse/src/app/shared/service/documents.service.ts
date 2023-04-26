import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Documents} from '../model/documents.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _documents: BehaviorSubject<Documents[] | null> = new BehaviorSubject(null);
    private _document: BehaviorSubject<Documents | null> = new BehaviorSubject(null);
    private _DirectionRegionaldocument: BehaviorSubject<Documents | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for documents
     */
    get documents$(): Observable<Documents[]> {
        return this._documents.asObservable();
    }

    /**
     * Getter for item
     */
    get document$(): Observable<Documents> {
        return this._document.asObservable();
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
    addDocument(document): Observable<Documents> {
        return this.documents$.pipe(
            take(1),
            switchMap(documents =>
                this._httpClient.post<Documents>(`${ApiService.apiDocuments}/create`, document)
                .pipe(
                    map((newDocument) => {

                        // Update the documents with the new product-
                        this._documents.next([newDocument]);

                        // Return the new product
                        return newDocument;
                    })
                ))
        );
    }

    editDocument(body, id): Observable<Documents> {
        return this._apiService.patch(`${ApiService.apiDocuments}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get document by id
     */
    getdocumentById(id: string): Observable<Documents> {
        return this._httpClient.get<Documents>(`${ApiService.apiDocuments}/get-document/${id}`).pipe(
            map((document) => {
                // Update the document
                this._document.next(document);

                // Return the document
                return document;
            }),
            switchMap((document) => {

                if (!document) {
                    return throwError('Could not found document with id of ' + id + '!');
                }

                return of(document);
            })
        );
    }

    /**
     * Get documents
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllDocuments(page: number = 0, size: number = 5, sort: string = 'nomberPage', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Documents[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Documents[] }>
        (`${ApiService.apiDocuments}/get-all-documents`, {
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
                this._documents.next(response.content);
            })
        );
    }

    /**
     * Delete the document
     *
     * @param document
     */
    deleteDocument(document: Documents): Observable<boolean> {
        return this.documents$.pipe(
            take(1),
            switchMap(documents =>
                this._httpClient.delete(`${ApiService.apiDocuments}/${document.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = documents.findIndex(item => item.id === document.id);
                        // Delete the product
                        documents.splice(index, 1);
                        // Update the documents
                        this._documents.next(documents);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getDocuments(): Observable<Documents[]> {
        return this._httpClient.get<Documents[]>(`${ApiService.apiVersion}${ApiService.apiDocuments}`).pipe(
            tap((response: any) => {
                this._documents.next(response);
            })
        );
    }

}
