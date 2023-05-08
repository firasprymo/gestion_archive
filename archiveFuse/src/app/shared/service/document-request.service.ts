import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {DocumentRequest} from '../model/document-requests.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Documents} from "../model/documents.types";

@Injectable({
    providedIn: 'root'
})
export class DocumentRequestService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _documentRequests: BehaviorSubject<DocumentRequest[] | null> = new BehaviorSubject(null);
    private _documentRequest: BehaviorSubject<DocumentRequest | null> = new BehaviorSubject(null);
    private _DirectionRegionaldocument: BehaviorSubject<DocumentRequest | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for documents
     */
    get documentRequests$(): Observable<DocumentRequest[]> {
        return this._documentRequests.asObservable();
    }

    /**
     * Getter for item
     */
    get documentRequest$(): Observable<DocumentRequest> {
        return this._documentRequest.asObservable();
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
    addDocumentRequest(document): Observable<DocumentRequest> {
        return this.documentRequests$.pipe(
            take(1),
            switchMap(documents =>
                this._httpClient.post<DocumentRequest>(`${ApiService.apiDocumentRequests}/create`, document)
                    .pipe(
                        map((newDocumentRequest) => {

                            // Update the documents with the new product-
                            this._documentRequests.next([newDocumentRequest]);

                            // Return the new product
                            return newDocumentRequest;
                        })
                    ))
        );
    }

    editDocumentRequest(body, id): Observable<DocumentRequest> {
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiDocumentRequests}/${id}`, body)
            .pipe(map(res => res));
    }

    /**
     * Get document by id
     */
    getdocumentById(id: string): Observable<DocumentRequest> {
        return this._httpClient
            .get<DocumentRequest>(`${ApiService.apiVersion}${ApiService.apiDocumentRequests}/find-document/${id}`)
            .pipe(
                map((document) => {
                    // Update the document
                    this._documentRequest.next(document);

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
    getAllDocuments(page: number = 0, size: number = 5, sort: string = 'id', order: 'asc' | 'desc'
        | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: DocumentRequest[] }>
        (`${ApiService.apiDocumentRequests}/get-all-documents`, {
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
                this._documentRequests.next(response.content);
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
    getAllRequestDocuments(page: number = 0, size: number = 5, sort: string = 'id', order: 'asc' | 'desc'
        | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: DocumentRequest[] }>
        (`${ApiService.apiDocumentRequests}/get-all-request-documents`, {
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
                this._documentRequests.next(response.content);
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
    getAllRequestConsultDocuments(page: number = 0, size: number = 5, sort: string = 'id', order: 'asc' | 'desc'
        | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: DocumentRequest[] }>
        (`${ApiService.apiDocumentRequests}/get-all-request-consult-documents`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                console.log(response)
                this._pagination.next(response.pageable);
                this._documentRequests.next(response.content);
            })
        );
    }

    /**
     * Delete the document
     *
     * @param document
     */
    deleteDocumentRequest(document: DocumentRequest): Observable<boolean> {
        return this.documentRequests$.pipe(
            take(1),
            switchMap(documents =>
                this._httpClient.delete(`${ApiService.apiDocumentRequests}/${document.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = documents.findIndex(item => item.id === document.id);
                        // Delete the product
                        documents.splice(index, 1);
                        // Update the documents
                        this._documentRequests.next(documents);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }

    getDocumentRequests(): Observable<DocumentRequest[]> {
        return this._httpClient.get<DocumentRequest[]>(`${ApiService.apiVersion}${ApiService.apiDocumentRequests}`).pipe(
            tap((response: any) => {
                this._documentRequests.next(response);
            })
        );
    }

    changeStatus(document): any {
        console.log(document?.document);
        return this._httpClient.put<DocumentRequest[]>
        (`${ApiService.apiDocumentRequests}/change-status/${document?.id}`,
            document?.document?.status).pipe(
            tap((response: any) => {
                this._documentRequests.next(response);
            })
        );

    }

    changeRequestStatus(document, statusRequest): any {
        console.log(statusRequest);
        console.log(document);
        const status = {
            status: statusRequest
        };
        return this._httpClient.put<DocumentRequest[]>
        (`${ApiService.apiDocumentRequests}/change-request-status/${document?.id}`,
            status).pipe(
            tap((response: any) => {
                this._documentRequests.next(response);
            })
        );

    }

    requestConsultDocument(document: any): Observable<any> {
        return this._httpClient.post<any[]>(`${ApiService.apiDocumentRequests}/request-consult`, document).pipe(
            tap((response: any) => response)
        );

    }
}
