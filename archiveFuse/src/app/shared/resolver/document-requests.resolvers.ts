import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DocumentsService} from '../service/documents.service';
import {Documents} from '../model/documents.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';
import {DocumentRequestService} from '../service/document-request.service';
import {DocumentRequest} from '../model/document-requests.types';

@Injectable({
    providedIn: 'root'
})
export class DocumentRequestsResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentsService: DocumentRequestService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._documentsService.getAllDocuments();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DocumentMaturePremierAgeResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentsService: DocumentRequestService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._documentsService.documentMaturePremierAge();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DocumentPendingRequestsResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentsService: DocumentRequestService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._documentsService.getAllRequestDocuments();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DocumentRequestsConsultResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentsService: DocumentRequestService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<{ pageable: InventoryPagination; content: DocumentRequest[] }> {
        return this._documentsService.getAllRequestConsultDocuments();
    }
}



@Injectable({
    providedIn: 'root'
})
export class DocumentRequestByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _documentService: DocumentRequestService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentRequest> {
        return this._documentService.getdocumentById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested task is not available
                catchError((error) => {

                    // Log the error
                    console.error(error);

                    // Get the parent url
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);

                    // Throw an error
                    return throwError(error);
                })
            );
    }
}

