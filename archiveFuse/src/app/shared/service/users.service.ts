import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {InventoryPagination} from '../../modules/admin/apps/ecommerce/inventory/inventory.types';
import {Users} from '../model/users.types';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Documents} from "../model/documents.types";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<Users[] | null> = new BehaviorSubject(null);
    private _user: BehaviorSubject<Users | null> = new BehaviorSubject(null);

    constructor(private _apiService: ApiService,
                private _httpClient: HttpClient) {
    }

    /**
     * Getter for products
     */
    get users$(): Observable<Users[]> {
        return this._users.asObservable();
    }
    /**
     * Getter for products
     */
    get user$(): Observable<Users> {
        return this._user.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination> {
        return this._pagination.asObservable();
    }

    addUser(body): Observable<any> {
        console.log(body);
        return this._apiService.post(`${ApiService.apiUser}/register`, body)
            .pipe(map(res => res));

    }

    editUser(body, id): Observable<Users> {
        console.log(id)
        return this._apiService.patch(`${ApiService.apiVersion}${ApiService.apiUser}/${id}`, body).pipe(map(res => res));
    }

    /**
     * Get user by id
     */
    getUserById(id: string): Observable<Users> {
        return this._httpClient.get<Users>(`${ApiService.apiVersion}${ApiService.apiUser}/${id}`).pipe(
            map((user) => {
                // Update the user
                this._user.next(user);

                // Return the user
                return user;
            }),
            switchMap((user) => {

                if (!user) {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(user);
            })
        );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getAllUsers(page: number = 0, size: number = 10, sort: string = 'username', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pageable: InventoryPagination; content: Users[] }> {
        return this._httpClient.get<{ pageable: InventoryPagination; content: Users[] }>
        (`${ApiService.apiVersion}${ApiService.apiUser}/get-all-users`, {
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
                this._users.next(response.content);
            })
        );
    }

    /**
     * Delete the user
     *
     * @param user
     */
    deleteUser(user: Users): Observable<boolean> {
        return this.users$.pipe(
            take(1),
            switchMap(users =>
                this._httpClient.delete(`${ApiService.apiVersion}${ApiService.apiUser}/delete-user/${user.id}`).pipe(
                    map(() => {
                        // Find the index of the deleted product
                        const index = users.findIndex(item => item.id === user.id);
                        // Delete the product
                        users.splice(index, 1);
                        // Update the users
                        this._users.next(users);
                        // Return the deleted status
                        return true;
                    })
                ))
        );
    }
}
