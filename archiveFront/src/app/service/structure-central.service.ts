import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StructureCentral } from '../models/structure-central.model';

@Injectable({
  providedIn: 'root'
})
export class StructureCentralService {
  private apiUrl = environment.api_url + '/api/structure-central';
  private structureCentralsSubject = new BehaviorSubject<StructureCentral[]>([]);
  directionRegionals$ = this.structureCentralsSubject.asObservable();
  constructor(private http: HttpClient) { }
  getAllStructureCentral(): Observable<StructureCentral[]>{
    return this.http.get<StructureCentral[]>(this.apiUrl + '/get-structure');
  }
  deleteStructureCentral(codeStructure: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${codeStructure}`);
  }
  updateStructureCentral(structure:StructureCentral):Observable<StructureCentral>{
    return this.http.put<StructureCentral>(`${this.apiUrl}/update/${structure.codeStructure}`, structure);
  }
}
