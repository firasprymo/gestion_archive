import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocumentsService} from '../../../../../shared/service/documents.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Documents} from '../../../../../shared/model/documents.types';
import {NomenclatureService} from '../../../../../shared/service/nomenclature.service';
import {Nomenclature} from '../../../../../shared/model/nomenclature.types';
import {Users} from '../../../../../shared/model/users.types';
import {UserService} from '../../../../../core/user/user.service';

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
    user$: Observable<Users>;
    notCorrectType = false;
    isUpdate = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _documentService: DocumentsService,
                private _userService: UserService,
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
            numDocument: ['', Validators.required],
            dateCreation: ['',],
            dateReception: ['',],
            codeLieuArchive: ['', Validators.required],
            nomenclature: ['', Validators.required],
            lieuArchive: ['', Validators.required],
        });
        this._documentService.document$.subscribe((res) => {
            console.log(res);
            if (res) {
                this.isUpdate = true;
                this.documentForm.patchValue({
                    id: res?.id,
                    nomberPage: res?.nomberPage,
                    numDocument: res?.numDocument,
                    codeLieuArchive: res?.codeLieuArchive,
                    lieuArchive: res?.lieuArchive
                });
            }
        });
        this._userService.get().subscribe((res: Users) => {
            console.log(res);
            if (res.agence) {
                this.documentForm.patchValue({
                    codeLieuArchive: res?.agence?.codeAgence,
                    lieuArchive: res?.agence?.lieuArchive
                });

            } else if (res.structureCentral) {
                this.documentForm.patchValue({
                    codeLieuArchive: res?.structureCentral?.codeStructure,
                    lieuArchive: res?.structureCentral?.lieuArchive
                });

            } else if (res.directionRegional) {
                this.documentForm.patchValue({
                    codeLieuArchive: res?.directionRegional?.codeDirection,
                    lieuArchive: res?.directionRegional?.lieuArchive
                });

            }
        });
        this.nomenclatures$ = this._nomenclatureService.nomenclatures$;
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
