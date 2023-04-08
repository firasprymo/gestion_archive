import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { DirectionRegional } from '../auth/models/direction-regional-model';
import { DirectionRegionale } from 'src/app/models/direction-regional.model';


@Injectable({
  providedIn: 'root',
})
export class DirectionRegionalService {
  private apiUrl = environment.api_url + '/api/direction-regional';
  private directionRegionalsSubject = new BehaviorSubject<DirectionRegionale[]>([]);
  directionRegionals$ = this.directionRegionalsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllDirectionRegional(): Observable<DirectionRegional[]> {
    return this.http.get<DirectionRegional[]>(this.apiUrl + '/get-direction');
  }
  deleteDirectionRegional(codeDirection: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${codeDirection}`);
  }
  updateDirectionRegional(directionRegional: DirectionRegional): Observable<DirectionRegional> {
    return this.http.put<DirectionRegional>(`${this.apiUrl}/update/${directionRegional.codeDirection}`, directionRegional);
  }

  createDirectionRegional(directionRegionale: DirectionRegionale): Observable<DirectionRegionale> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<DirectionRegional>(url, directionRegionale);
  }
  setDirectionRegionals(directionRegionals: DirectionRegionale[]): void {
    this.directionRegionalsSubject.next(directionRegionals);
  }
}
