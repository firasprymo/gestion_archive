import {Component, OnInit} from '@angular/core';
import {FiliereService} from '../../../../shared/services/filiere.service';

@Component({
    selector: 'app-show-filiere',
    templateUrl: './show-filiere.component.html',
    styleUrls: ['./show-filiere.component.scss']
})
export class ShowFiliereComponent implements OnInit {
    filieres: any = [];

    constructor(private filiereService: FiliereService) {
    }

    ngOnInit() {
        this.getAllFilieres();
    }

    getAllFilieres() {
        this.filiereService.getAllFilieres().subscribe((res: any) => {
            // console.log(res)
            this.filieres = res;
        })
    }

    deleteFiliere(id: number) {
        this.filieres = [];
        this.filiereService.deleteFiliere(id).subscribe(res => {
            this.getAllFilieres();
            return res;
        });
    }
}
