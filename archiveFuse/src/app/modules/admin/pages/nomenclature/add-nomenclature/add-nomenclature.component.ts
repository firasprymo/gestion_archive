import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Nomenclature} from '../../../../../shared/model/nomenclature.types';
import {Documents} from '../../../../../shared/model/documents.types';
import {Observable, Subject} from 'rxjs';
import {NomenclatureService} from '../../../../../shared/service/nomenclature.service';
import {Router} from '@angular/router';
import {DocumentsService} from '../../../../../shared/service/documents.service';

@Component({
    selector: 'app-add-nomenclature',
    templateUrl: './add-nomenclature.component.html',
    styleUrls: ['./add-nomenclature.component.scss']
})
export class AddNomenclatureComponent implements OnInit, OnDestroy {
    nomenclatureForm: FormGroup;
    isUpdate = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _nomenclatureService: NomenclatureService,
                private _documentService: DocumentsService,
                private _router: Router,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.nomenclatureForm = this._formBuilder.group({
            id: [''],
            designationNomenclature: ['', Validators.required],
            dureeConservationPremAge: ['', Validators.required],
            dureeConservationSecAge: ['', Validators.required],
            valeurHistoriqueTroiAge: [false, Validators.required],
        });
        this._nomenclatureService.nomenclature$.subscribe((res) => {
            if (res) {
                this.isUpdate = true;
                this.nomenclatureForm.patchValue({
                    id: res.id,
                    designationNomenclature: res.designationNomenclature,
                    dureeConservationPremAge: res.dureeConservationPremAge,
                    dureeConservationSecAge: res.dureeConservationSecAge,
                    valeurHistoriqueTroiAge: res.valeurHistoriqueTroiAge,
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
    createNomenclature(): void {
        const body = {
            designationNomenclature: this.nomenclatureForm.value.designationNomenclature,
            dureeConservationPremAge: this.nomenclatureForm.value.dureeConservationPremAge,
            dureeConservationSecAge: this.nomenclatureForm.value.dureeConservationSecAge,
            valeurHistoriqueTroiAge: this.nomenclatureForm.value.valeurHistoriqueTroiAge,
        };
        // Create the product
        this._nomenclatureService.addNomenclature(body).subscribe((newNomenclature) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-nomenclatures']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    editNomenclature(): any {
        const body = {
            id: this.nomenclatureForm.value.id,
            designationNomenclature: this.nomenclatureForm.value.designationNomenclature,
            dureeConservationPremAge: this.nomenclatureForm.value.dureeConservationPremAge,
            dureeConservationSecAge: this.nomenclatureForm.value.dureeConservationSecAge,
            valeurHistoriqueTroiAge: this.nomenclatureForm.value.valeurHistoriqueTroiAge,
        };
        // Create the product
        this._nomenclatureService.editNomenclature(body, body.id).subscribe((newNomenclature) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-nomenclatures']);

        });
    }
}
