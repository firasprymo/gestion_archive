import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DirectionRegionalService} from '../service/direction-regional.service';
import {DirectionRegional} from '../model/direction-regional.types';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DirectionRegionalResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _directionRegionalService: DirectionRegionalService) {
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
        Observable<{ pageable: InventoryPagination; content: DirectionRegional[] }> {
        return this._directionRegionalService.getAllDirectionRegionals();
    }
}


@Injectable({
    providedIn: 'root'
})
export class DirectionRegionalByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _directionRegionalService: DirectionRegionalService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DirectionRegional> {
        console.log(route.paramMap.get('idLesson'));
        return this._directionRegionalService.getDirectionRegionalById(route.paramMap.get('idDirectionRegional'))
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

