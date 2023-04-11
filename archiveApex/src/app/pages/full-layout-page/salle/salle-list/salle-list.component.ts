import {Component, OnInit} from '@angular/core';
import {SalleService} from '../../../../shared/services/salle.service';

@Component({
    selector: 'app-salle-list',
    templateUrl: './salle-list.component.html',
    styleUrls: ['./salle-list.component.scss']
})
export class SalleListComponent implements OnInit {
    salles: any = [];

    constructor(private salleService: SalleService) {
    }

    ngOnInit() {

        this.getAllSalles();
    }

    getAllSalles() {
        this.salleService.getAllSalles().subscribe(res => {
            // console.log(res);
            this.salles = res;
        });
    }

    deleteSalle(id: number) {
        this.salles = [];
        this.salleService.deleteSalle(id).subscribe(res => {
            console.log(res);
            this.getAllSalles();
        })

    }
}
