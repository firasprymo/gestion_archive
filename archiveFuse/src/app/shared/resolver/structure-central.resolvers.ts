import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DocumentsService} from '../service/documents.service';
import {Documents} from '../model/documents.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';
import {StructureCentralService} from '../service/structure-central.service';
import {StructureCentral} from '../model/structure-central.types';

@Injectable({
    providedIn: 'root'
})
export class StructureCentralResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _structureCentralService: StructureCentralService) {
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
        Observable<{ pageable: InventoryPagination; content: StructureCentral[] }> {
        return this._structureCentralService.getAllStructureCentrals();
    }
}



@Injectable({
    providedIn: 'root'
})
export class structureCentralByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _structureCentralService: StructureCentralService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StructureCentral> {
        if(!route.paramMap.get('id')) {return ;}
        return this._structureCentralService.getStructureCentralById(route.paramMap.get('id'))
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
