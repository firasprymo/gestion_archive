import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DocumentsService} from '../service/documents.service';
import {Documents} from '../model/documents.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';
import {CentreArchiveService} from '../service/centre-archive.service';
import {CentreArchive} from '../model/centre-archive.types';

@Injectable({
    providedIn: 'root'
})
export class CentreArchivesResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _centreArchiveService: CentreArchiveService) {
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
        Observable<{ pageable: InventoryPagination; content: CentreArchive[] }> {
        return this._centreArchiveService.getAllCentreArchives();
    }
}



@Injectable({
    providedIn: 'root'
})
export class centreArchivesByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _centreArchiveService: CentreArchiveService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CentreArchive> {
        return this._centreArchiveService.getCentreArchiveById(route.paramMap.get('id'))
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
