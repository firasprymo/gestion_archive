import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';
import {NomenclatureService} from '../service/nomenclature.service';
import {Nomenclature} from '../model/nomenclature.types';

@Injectable({
    providedIn: 'root'
})
export class NomenclatureResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _nomenclatureService: NomenclatureService) {
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
        Observable<{ pageable: InventoryPagination; content: Nomenclature[] }> {
        return this._nomenclatureService.getAllNomenclatures();
    }
}


@Injectable({
    providedIn: 'root'
})
export class NomenclatureByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _nomenclatureService: NomenclatureService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nomenclature> {
        console.log(route.paramMap.get('id'));
        if (!route.paramMap.get('id')) {return;}
        return this._nomenclatureService.getNomenclatureById(route.paramMap.get('id'))
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
