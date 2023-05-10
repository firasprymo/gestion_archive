import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DocumentsService} from '../service/documents.service';
import {Documents} from '../model/documents.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';
import {UserService} from '../../core/user/user.service';
import {DocumentRequestService} from "../service/document-request.service";

@Injectable({
    providedIn: 'root'
})
export class DocumentsResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentsService: DocumentsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Documents[] }> {
        return this._documentsService.getAllDocuments();
    }
}


@Injectable({
    providedIn: 'root'
})
export class DocumentsByLieuAffectationResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentsService: DocumentsService,
                private _userService: UserService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Documents[] }> {

        return this._documentsService.getDocumentsByLieuAffectation();
    }
}


@Injectable({
    providedIn: 'root'
})
export class documentByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _documentService: DocumentsService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Documents> {
        console.log(!route.paramMap.get('id'));
        if (!route.paramMap.get('id')) {
            return;
        }
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
