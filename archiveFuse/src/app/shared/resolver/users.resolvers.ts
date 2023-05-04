import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {UsersService} from '../service/users.service';
import {Users} from '../model/users.types';
import {UserService} from '../../core/user/user.service';
import {StructureCentralService} from "../service/structure-central.service";
import {StructureCentral} from "../model/structure-central.types";
import {catchError} from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class UsersResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _userService: UsersService)
    {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pageable: InventoryPagination; content: Users[] }>
    {
        return this._userService.getAllUsers();
    }
}
@Injectable({
    providedIn: 'root'
})
export class ActiveUserResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _userService: UserService)
    {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users>
    {
        return this._userService.get();
    }
}



@Injectable({
    providedIn: 'root'
})
export class UserByIdResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _usersService: UsersService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users> {
        if(!route.paramMap.get('id')) {return ;}
        return this._usersService.getUserById(route.paramMap.get('id'))
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


