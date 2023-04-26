import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Documents} from '../../../../shared/model/documents.types';
import {Category} from '../../../../shared/model/category.types';

@Injectable({
    providedIn: 'root'
})
export class AcademyService
{
    // Private
    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);
    private _document: BehaviorSubject<Documents | null> = new BehaviorSubject(null);
    private _documents: BehaviorSubject<Documents[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for categories
     */
    get categories$(): Observable<Category[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for documents
     */
    get documents$(): Observable<Documents[]>
    {
        return this._documents.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getCategories(): Observable<Category[]>
    {
        return this._httpClient.get<Category[]>('api/apps/academy/categories').pipe(
            tap((response: any) => {
                this._categories.next(response);
            })
        );
    }

}
