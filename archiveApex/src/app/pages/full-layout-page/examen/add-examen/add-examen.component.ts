import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import {ExamenService} from '../../../../shared/services/examen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {ClassesService} from '../../../../shared/services/classes.service';
import {DatePipe, formatDate} from '@angular/common';
import {SalleService} from '../../../../shared/services/salle.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import * as moment from 'moment';

@Component({
    selector: 'app-add-examen',
    templateUrl: './add-examen.component.html',
    styleUrls: ['./add-examen.component.scss']
})
export class AddExamenComponent implements OnInit {
    regularForm: FormGroup;
    classes = [];
    salles = [];
    examens = [];
    teachers = [];
    idExamen: number;
    filesToUpload = null
    available = false;

    constructor(
        private examenService: ExamenService,
        private datePipe: DatePipe,
        private classesService: ClassesService,
        private salleService: SalleService,
        private teacherService: TeacherService,
        private active: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {


        this.active.params.subscribe((res: any) => {
            // console.log(res.id);
            if (res.id) {
                this.idExamen = res.id;
                this.getExamenById(res.id);
            }
        });

        this.regularForm = new FormGroup({
            'session': new FormControl(null, [Validators.required]),
            'title': new FormControl(null, [Validators.required]),
            'classes': new FormControl(null, [Validators.required]),
            'duration': new FormControl(null, [Validators.required]),
            'examsDate': new FormControl(null, [Validators.required]),
            'examsTime': new FormControl(null, [Validators.required]),
            'salles': new FormControl(null, [Validators.required]),
            'teachers': new FormControl(null, [Validators.required]),
            'student': new FormControl(null, [Validators.required])
        });
        forkJoin([
            this.classesService.getAllClasses(),
            this.salleService.getAllSalles(),
            this.teacherService.getAllTeachers(),
            this.examenService.getAllExamens()
        ]).subscribe(results => {
            this.classes = results[0];
            this.salles = results[1];
            this.teachers = results[2];
            this.examens = results[3];
            // this.getExamsDate();
        }, error => {
            console.log(error)
        });
    }

    addExamen() {
        const time = moment(this.regularForm.value.examsTime);
        console.log(time);
        // this.regularForm.controls.examsTime.setValue(this.regularForm.controls.examsDate.value
        //     + 'T' + this.regularForm.controls.examsTime.value);
        const fd = new FormData();
        fd.append('session', this.regularForm.value.session);
        fd.append('title', this.regularForm.value.title);
        fd.append('classes', this.regularForm.value.classes);
        fd.append('duration', this.regularForm.value.duration);
        fd.append('examsDate', this.regularForm.value.examsDate);
        fd.append('examsTime', this.regularForm.value.examsTime);
        fd.append('salles', this.regularForm.value.salles);
        fd.append('teachers', this.regularForm.value.teachers);
        fd.append('photo', this.filesToUpload[0], this.filesToUpload[0].name)
        this.examenService.addExamen(fd).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/show-examens');
        })
    }

    editExamen() {
        this.examenService.editExamen(this.regularForm.value, this.idExamen).subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/show-examens');
        })
    }

    getExamenById(id) {
        console.log(id)
        this.examenService.getExamenById(id).subscribe(res => {
            const toDate = this.datePipe.transform(res.examsDate, 'yyyy-MM-dd');
            this.regularForm.controls.session.setValue(res.session);
            this.regularForm.controls.title.setValue(res.title);
            this.regularForm.controls.classes.setValue(res.classes);
            this.regularForm.controls.duration.setValue(res.duration);
            this.regularForm.controls.examsDate.setValue(toDate);
            this.regularForm.controls.examsTime.setValue(res.examsTime);
            console.log(this.regularForm.value);

        })
    }

    fileChangeEvent(event) {
        // console.log(this.uploader['queue']);
        this.filesToUpload = <File>event.target.files;
        console.log(this.filesToUpload);
    }

    onDate() {
        // console.log(this.available);
        // this.salles = [];
        let i = 0;
        // console.log(this.regularForm.value);
        if (this.regularForm.value.examsDate && this.regularForm.value.duration && this.regularForm.value.examsTime) {
            // this.getSalles();
            console.log(this.examens);
            this.examens = this.examens.filter(r => {
                console.log(i);
                i++;
                const date = this.getExamsDate(this.regularForm.value.examsDate, r.examsDate,
                    this.regularForm.value.examsTime, r.examsTime);
                console.log('salles', this.salles);
                if (r.salles) { this.salles = this.salles.filter(salle => salle.id !== r.salles.id); }
                console.log('salles', this.salles);
                return !date;
                // console.log(this.available);
            });
            console.log(this.examens);
            this.available = true;
        }
    }

    getExamsDate(dateExams ?, date ?, timeExams ?, time ?) {
        // console.log('dateExams', dateExams, 'date', date, 'timeExams', timeExams, 'time', time);
        const format = 'YYYY-MM-DD hh:mm';
        // 1 extract date from examsdate ISO
        let getExamsDate: any = moment(date).toDate();
        // get hour and minute from time
        const hours = this.getHour(time);
        const minutes = this.getMinute(time);
        // add time to date
        getExamsDate.setHours(hours);
        getExamsDate.setMinutes(minutes);
        // 2 transfert date en Datetime
        const getDateExamAccess = moment(dateExams).toDate();
        // get hour and minute from timeexams
        const hoursExams = this.getHour(timeExams);
        const minutesExams = this.getMinute(timeExams);
        // add time to date
        getDateExamAccess.setHours(hoursExams);
        getDateExamAccess.setMinutes(minutesExams);
        const getDateExamExit = moment(getDateExamAccess).add({'hours': 2}).format(format);

        // console.log('getExamsDate', moment(getExamsDate).format(format));
        // console.log('getDateExamAccess', moment(getDateExamAccess).format(format));
        // console.log('getDateExamExit', getDateExamExit);
        console.log('getDateExam', moment(getDateExamAccess).isBefore(getExamsDate));
        return moment(getDateExamAccess).isBefore(getExamsDate);

    }

    getHour(time) {
        const hours = parseInt(time.split(':')[0]);
        return hours;
    }

    getMinute(time) {
        const minutes = parseInt(time.split(':')[1]);
        return minutes;
    }

    // getSalles() {
    //     this.salleService.getAllSalles().subscribe(res => {
    //         this.salles = res;
    //     })
    // }
}
