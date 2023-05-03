import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CentreArchive} from '../../../../../shared/model/centre-archive.types';
import {Observable, Subject} from 'rxjs';
import {Trainers} from '../../../../../shared/model/trainers.types';
import {CentreArchiveService} from '../../../../../shared/service/centre-archive.service';
import {Router} from '@angular/router';
import {TrainerService} from '../../../../../shared/service/trainer.service';
import {CentrePreArchiveService} from '../../../../../shared/service/centre-pre-archive.service';

@Component({
    selector: 'app-add-centre-pre-archive',
    templateUrl: './add-centre-pre-archive.component.html',
    styleUrls: ['./add-centre-pre-archive.component.scss']
})
export class AddCentrePreArchiveComponent implements OnInit, OnDestroy {
    centreForm: FormGroup;
    center: CentreArchive;
    isUpdate = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _centerService: CentrePreArchiveService,
                private _router: Router,
                private _trainerService: TrainerService,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.centreForm = this._formBuilder.group({
            id: [],
            codeCentrePreArchive: ['',
                [
                    Validators.required,
                ]],
            libelleCentrePreArchive: ['', Validators.required],
        });
        this._centerService.centrePreArchive$.subscribe((res) => {
            console.log(res);
            if (res) {
                this.isUpdate = true;
                this.centreForm.patchValue({
                    id: res.id,
                    codeCentrePreArchive: res.codeCentrePreArchive,
                    libelleCentrePreArchive: res.libelleCentrePreArchive,
                });
            }
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
        this._centerService.addCentrePreArchive(this.centreForm.value).subscribe((newCentreArchive) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-centres-pre']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    editCentrePreArchive(): any {
        this._centerService.editCentrePreArchive(this.centreForm.value, this.centreForm.value.id).subscribe((newCentreArchive) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-centres-pre']);

        });

    }
}
