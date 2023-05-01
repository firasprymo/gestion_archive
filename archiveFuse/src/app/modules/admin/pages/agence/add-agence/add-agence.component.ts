import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {AgenceService} from '../../../../../shared/service/agence.service';
import {Router} from '@angular/router';
import {StructureCentral} from '../../../../../shared/model/structure-central.types';
import {StructureCentralService} from '../../../../../shared/service/structure-central.service';

@Component({
    selector: 'app-add-agence',
    templateUrl: './add-agence.component.html',
    styleUrls: ['./add-agence.component.scss']
})
export class AddAgenceComponent implements OnInit, OnDestroy {
    agenceForm: FormGroup;

    structureCentrals$: Observable<StructureCentral[]>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _agenceService: AgenceService,
                private _structureCentralService: StructureCentralService,
                private _router: Router,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.agenceForm = this._formBuilder.group({
            codeAgence: ['', Validators.required],
            libelleAgence: ['',],
            lieuArchive: ['',],
            lieuArchiveSecAge: ['', Validators.required],
            structure: ['', Validators.required],
        });
        this.structureCentrals$ = this._structureCentralService.structureCentrals$;

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Create product
     */
    createAgence(): void {
        const body = {
            codeAgence: this.agenceForm.value.codeAgence,
            libelleAgence: this.agenceForm.value.libelleAgence,
            lieuArchive: this.agenceForm.value.lieuArchive,
            lieuArchiveSecAge: this.agenceForm.value.lieuArchiveSecAge,
            structure: {
                id: this.agenceForm.value.structure.id
            },
        };
        // Create the product
        this._agenceService.addAgence(body).subscribe((newAgence) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-agences']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


}
