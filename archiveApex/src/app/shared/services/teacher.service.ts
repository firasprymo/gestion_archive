import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

const teacherURL = environment.teachers;

@Injectable({
    providedIn: 'root'
})
export class TeacherService {

    constructor(private apiService: ApiService) {
    }

    addTeacher(body) {
        return this.apiService.post(`${teacherURL}`, body).pipe(map(res => res));
    }

    editTeacher(body, id) {
        return this.apiService.patch(`${teacherURL}/${id}`, body).pipe(map(res => res));
    }

    deleteTeacher(id) {
        return this.apiService.delete(`${teacherURL}`, id).pipe(map(res => res));
    }

    getAllTeachers() {
        return this.apiService.get(`${teacherURL}`).pipe(map(res => res));
    }

    getTeacherById(id) {
        return this.apiService.get(`${teacherURL}/${id}`).pipe(map(res => res));
    }
}
