import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DocumentsService} from '../../../../../shared/service/documents.service';
import {Observable, Subject} from 'rxjs';
import {Trainers} from '../../../../../shared/model/trainers.types';
import {TrainerService} from '../../../../../shared/service/trainer.service';
import {Router} from '@angular/router';
import {Document} from '../../../../../shared/model/documents.types';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
    styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit, OnDestroy {
    documentForm: FormGroup;
    document: Document;
    trainers$: Observable<Trainers[]>;
    notCorrectType = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _documentService: DocumentsService,
                private _router: Router,
                private _trainerService: TrainerService,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.documentForm = this._formBuilder.group({
            codeNomenclature: ['', Validators.required],
            nomberPage: ['', Validators.required],
            dateCreation: ['', ],
            dateReception: ['', ],
            codeLieuArchive: ['', Validators.required],
            lieuArchive: ['', Validators.required],
        });
        this.trainers$ = this._trainerService.trainers$;

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

    uploadImage(fileList): void {
        // Return if canceled
        if (fileList.length === 0) {
            return;
        }
        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }
        if (file.filename !== 0) {
            this.documentForm.patchValue({
                coverFile: file
            });
            console.log(this.documentForm.value);
        } else {
            this.documentForm.patchValue({
                coverFile: ''
            });
        }
    }

    uploadVideo(fileList): void {
        console.log(fileList);
        // Return if canceled
        if (fileList.length === 0) {
            return;
        }
        const allowedTypes = ['video/mp4'];
        const file = fileList[0];
        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            this.notCorrectType = true;
            return;
        }
        if (file.filename !== 0) {
            this.notCorrectType = false;
            this.documentForm.patchValue({
                videoFile: file
            });
            console.log(this.documentForm.value);
        } else {
            this.documentForm.patchValue({
                videoFile: ''
            });
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


}
