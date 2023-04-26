import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AcademyService} from 'app/modules/admin/apps/academy/academy.service';
import {DocumentsService} from '../../../../shared/service/documents.service';
import {Documents} from '../../../../shared/model/documents.types';
import {Category} from '../../../../shared/model/category.types';

@Injectable({
    providedIn: 'root'
})
export class AcademyCategoriesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _academyService: AcademyService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._academyService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AcademydocumentsResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _documentService: DocumentsService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Documents[]> {
        return this._documentService.getDocuments();
    }
}


