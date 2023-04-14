import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureCentral} from '../../../../../shared/model/structure-central.types';
import {Observable, Subject} from 'rxjs';
import {StructureCentralService} from '../../../../../shared/service/structure-central.service';
import {Router} from '@angular/router';
import {DirectionRegionalService} from '../../../../../shared/service/direction-regional.service';
import {DirectionRegional} from '../../../../../shared/model/direction-regional.types';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-add-structure-central',
    templateUrl: './add-structure-central.component.html',
    styleUrls: ['./add-structure-central.component.scss']
})
export class AddStructureCentralComponent implements OnInit, OnDestroy {
    structureCentralForm: FormGroup;
    structureCentrals$: Observable<StructureCentral[]>;
    directions$: Observable<DirectionRegional[]>;
    notCorrectType = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef,
                private _structureCentralService: StructureCentralService,
                private _directionRegionalService: DirectionRegionalService,
                private _router: Router,
    ) {
    }

    ngOnInit(): void {
        // Horizontal stepper form
        this.structureCentralForm = this._formBuilder.group({
            codeStructure: ['', Validators.required],
            libelleStructure: ['',],
            lieuArchive: ['',],
            lieuArchiveSecAge: ['', Validators.required],
            directeur: ['', Validators.required],
        });
        this.structureCentrals$ = this._structureCentralService.structureCentrals$;
        this.directions$ = this._directionRegionalService.directionRegionals$;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Create product
     */
    createStructureCentral(): void {
        const body = {
            codeStructure: this.structureCentralForm.value.codeStructure,
            libelleStructure: this.structureCentralForm.value.libelleStructure,
            lieuArchive: this.structureCentralForm.value.lieuArchive,
            lieuArchiveSecAge: this.structureCentralForm.value.lieuArchiveSecAge,
            directeur: {
                id: this.structureCentralForm.value.directeur.id
            },
        };
        // Create the product
        this._structureCentralService.addStructureCentral(body).subscribe((newStructureCentral) => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
            this._router.navigate(['pages/show-structure-central']);

        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


}
