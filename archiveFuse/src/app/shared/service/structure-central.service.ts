import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryPagination } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { StructureCentral } from '../model/structure-central.types';
import { ApiService } from './api.service';
import {Nomenclature} from "../model/nomenclature.types";

@Injectable({
  providedIn: 'root'
})
export class StructureCentralService {
  private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
  private _structureCentrals: BehaviorSubject<StructureCentral[] | null> = new BehaviorSubject(null);
  private _structureCentral: BehaviorSubject<StructureCentral | null> = new BehaviorSubject(null);

  constructor(private _apiService: ApiService,
              private _httpClient: HttpClient) {
  }

  /**
   * Getter for DirectionRegional
   */
  get structureCentrals$(): Observable<StructureCentral[]> {
      return this._structureCentrals.asObservable();
  }

  /**
   * Getter for item
   */
  get structureCentral$(): Observable<StructureCentral> {
      return this._structureCentral.asObservable();
  }

  /**
   * Getter for pagination
   */
  get pagination$(): Observable<InventoryPagination> {
      return this._pagination.asObservable();
  }

  /**
   * Create product
   */
  addStructureCentral(structureCentral): Observable<StructureCentral> {
      return this._httpClient.post<StructureCentral>(
          `${ApiService.apiStructureCentral}/create`,
          structureCentral)
          .pipe(
              map(newStructureCentral =>
                  newStructureCentral
              )
          );
  }

  editStructureCentral(body, id): Observable<StructureCentral> {
      return this._apiService.patch(`${ApiService.apiStructureCentral}/${id}`, body)
          .pipe(map(res => res));
  }

  /**
   * Get directionRegional by id
   */
  getStructureCentralById(id): Observable<StructureCentral> {
      return this._httpClient.get<StructureCentral>(`${ApiService.apiStructureCentral}/${id}`).pipe(
          map((structureCentral) => {
              // Update the structureCentral
              this._structureCentral.next(structureCentral);

              // Return the structureCentral
              return structureCentral;
          }),
          switchMap((structureCentralItem) => {

              if (!structureCentralItem) {
                  return throwError('Could not found product with id of ' + id + '!');
              }

              return of(structureCentralItem);
          })
      );
  }

  /**
   * Get DirectionRegional
   *
   *
   * @param page
   * @param size
   * @param sort
   * @param order
   * @param search
   */
  getAllStructureCentrals(page = 0, size = 0, sort: string = 'codeStructure', order: 'asc' | 'desc' | '' = 'asc', search?):
      Observable<{ pageable: InventoryPagination; content: StructureCentral[] }> {
      return this._httpClient.get<{ pageable: InventoryPagination; content: StructureCentral[] }>
      (`${ApiService.apiStructureCentral}/get-all-structure-central`, {
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
              this._structureCentrals.next(response.content);
          })
      );
  }

  /**
   * Delete the directionRegional
   *
   * @param structureCentral
   */
  deleteStructureCentral(structureCentral: StructureCentral): Observable<boolean> {
    return this.structureCentrals$.pipe(
        take(1),
        switchMap(structureCentralItem =>
            this._httpClient.delete(`${ApiService.apiStructureCentral}/${structureCentral.id}`).pipe(
                map(() => {
                    // Find the index of the deleted product
                    const index = structureCentralItem.findIndex(item => item.codeStructure === structureCentral.codeStructure);
                    // Delete the product
                    structureCentralItem.splice(index, 1);
                    // Update the directionRegionalItem
                    this._structureCentrals.next(structureCentralItem);
                    // Return the deleted status
                    return true;
                })
            ))
    );
}


  getStructureCentral(): Observable<StructureCentral[]> {
      return this._httpClient.get<StructureCentral[]>(`${ApiService.apiVersion}${ApiService.apiStructureCentral}`).pipe(
          tap((response: any) => {
              this._structureCentral.next(response);
          })
      );
  }

}
