import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CentreArchive} from '../../../../../shared/model/centre-archive.types';
import {Observable, Subject} from 'rxjs';
import {CentreArchiveService} from '../../../../../shared/service/centre-archive.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-centre-archive',
    templateUrl: './add-centre-archive.component.html',
    styleUrls: ['./add-centre-archive.component.scss']
})
export class AddCentreArchiveComponent implements OnInit, OnDestroy {
    centreForm: FormGroup;
    center: CentreArchive;
    isUpdate = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _centerService: CentreArchiveService,
                private _router: Router,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.centreForm = this._formBuilder.group({
            id: [],
            codeCentreArchive: ['',
                [
                    Validators.required,
                ]],
            libelleCentreArchive: ['', Validators.required],
        });

        this._centerService.centreArchive$.subscribe((res) => {
            if (res) {
                this.isUpdate = true;
                this.centreForm.patchValue({
                    id: res.id,
                    codeCentreArchive: res.codeCentreArchive,
                    libelleCentreArchive: res.libelleCentreArchive,
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
        this._centerService.addCentreArchive(this.centreForm.value).subscribe((newCentreArchive) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-centre']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    editCentreArchive(): any {
        this._centerService.editCentreArchive(this.centreForm.value, this.centreForm.value.id).subscribe((newCentreArchive) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-centre']);

        });

    }
}
