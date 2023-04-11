import {Component, OnInit} from '@angular/core';
import {ExamenService} from '../../../../shared/services/examen.service';

@Component({
    selector: 'app-show-examen',
    templateUrl: './show-examen.component.html',
    styleUrls: ['./show-examen.component.scss']
})
export class ShowExamenComponent implements OnInit {
    examens: any = [];

    constructor(private examenService: ExamenService) {
    }

    ngOnInit() {
        this.getAllExamens();
    }

    getAllExamens() {
        this.examenService.getAllExamens().subscribe((res: any) => {
            // console.log(res)
            this.examens = res;
        })
    }

    deleteExamen(id: number) {
        this.examens = [];
        this.examenService.deleteExamen(id).subscribe(res => {
            this.getAllExamens();
            return res;
        });
    }
}
