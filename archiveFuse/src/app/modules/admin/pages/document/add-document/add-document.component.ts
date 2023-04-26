import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DocumentsService} from '../../../../../shared/service/documents.service';
import {Observable, Subject} from 'rxjs';
import {Trainers} from '../../../../../shared/model/trainers.types';
import {TrainerService} from '../../../../../shared/service/trainer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Documents} from '../../../../../shared/model/documents.types';
import {NomenclatureService} from '../../../../../shared/service/nomenclature.service';
import {Nomenclature} from '../../../../../shared/model/nomenclature.types';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
    styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit, OnDestroy {
    documentForm: FormGroup;
    document: Documents;
    document$: Observable<Documents>;
    nomenclatures$: Observable<Nomenclature[]>;
    notCorrectType = false;
    isUpdate = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _documentService: DocumentsService,
                private _router: Router,
                private _nomenclatureService: NomenclatureService,
                private active: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.documentForm = this._formBuilder.group({
            id: [''],
            nomberPage: ['', Validators.required],
            dateCreation: ['',],
            dateReception: ['',],
            codeLieuArchive: ['', Validators.required],
            lieuArchive: ['', Validators.required],
        });
        this._documentService.document$.subscribe((res) => {
            this.isUpdate = true;
            this.documentForm.patchValue({
                id: res.id,
                nomberPage: res.nomberPage,
                codeLieuArchive: res.codeLieuArchive,
                lieuArchive: res.lieuArchive
            });
        });
        this.nomenclatures$=this._nomenclatureService.nomenclatures$;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Create product
     */
    createDocument(): void {
        // Create the product
        this._documentService.addDocument(this.documentForm.value).subscribe((newDocument) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-documents']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    updateDocument(): any {
        this._documentService.editDocument(this.documentForm.value, this.documentForm.value.id).subscribe((newDocument) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-documents']);

        });

    }
}
