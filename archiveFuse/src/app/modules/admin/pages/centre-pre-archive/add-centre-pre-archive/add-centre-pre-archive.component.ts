import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CentreArchive} from '../../../../../shared/model/centre-archive.types';
import {Observable, Subject} from 'rxjs';
import {Trainers} from '../../../../../shared/model/trainers.types';
import {CentreArchiveService} from '../../../../../shared/service/centre-archive.service';
import {Router} from '@angular/router';
import {TrainerService} from '../../../../../shared/service/trainer.service';

@Component({
    selector: 'app-add-centre-pre-archive',
    templateUrl: './add-centre-pre-archive.component.html',
    styleUrls: ['./add-centre-pre-archive.component.scss']
})
export class AddCentrePreArchiveComponent implements OnInit, OnDestroy {
    centreForm: FormGroup;
    center: CentreArchive;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _centerService: CentreArchiveService,
                private _router: Router,
                private _trainerService: TrainerService,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.centreForm = this._formBuilder.group({
            codeCentreArchive: ['',
                [
                    Validators.required,
                    Validators.pattern('[0-9]+')
                ]],
            libelleCentreArchive: ['', Validators.required],
        });

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Create product
     */
    createCentreArchive(): void {
        // Create the product
        this._centerService.addCentreArchive(this.centreForm.value).subscribe((newCentreArchive) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-centres-pre']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


}
