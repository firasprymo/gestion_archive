import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DirectionRegionalService} from '../../../../../shared/service/direction-regional.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmationDialogComponent} from '@fuse/services/confirmation/dialog/dialog.component';
import {merge} from 'lodash-es';
import {DOCUMENT} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-direction-regional',
    templateUrl: './add-direction-regional.component.html',
    styleUrls: ['./add-direction-regional.component.scss'],
})

export class AddDirectionRegionalComponent implements OnInit {
    idDirectionRegional: string;
    directionRegionalForm: FormGroup;
    directionRegional: any;
    isUpdate = false;

    constructor(@Inject(DOCUMENT) private _document: Document,
                private _formBuilder: FormBuilder,
                private fuseConfirmationService: FuseConfirmationService,
                private _directionRegionalervice: DirectionRegionalService,
                private _router: Router,
                private _active: ActivatedRoute,
                private _matDialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.directionRegionalForm = this._formBuilder.group({
            codeDirection: ['', [Validators.required]],
            libelleDirection: ['', [Validators.required]],
            lieuArchive: ['', Validators.required],
            lieuArchiveSecAge: ['', Validators.required],
        });

        this._directionRegionalervice.directionRegional$.subscribe((res) => {
            console.log(res);
            this.directionRegional = res.id;
            if (res) {
                this.isUpdate = true;
                this.directionRegionalForm.patchValue({
                    id: res.id,
                    codeDirection: res.codeDirection,
                    libelleDirection: res.libelleDirection,
                    lieuArchive: res.lieuArchive,
                    lieuArchiveSecAge: res.lieuArchiveSecAge,
                });
            }
        });
    }

    /**
     * Create product
     */
    createDirectionRegional(): void {
        this._directionRegionalervice.addDirectionRegional(this.directionRegionalForm.value).subscribe((res) => {
            console.log(res);
            this.directionRegionalForm.reset();
            this._router.navigate(['pages/show-direction-regional']);
        });
    }

    open(step): MatDialogRef<FuseConfirmationDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, {
            title: 'Confirm action',
            message: 'Please add step' + (step + 1),
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirm',
                    color: 'warn'
                },
                cancel: {
                    show: true,
                    label: 'Cancel'
                }
            },
            dismissible: false
        });

        // Open the dialog
        return this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel'
        });
    }




    editDirectionRegional(): any {
        this._directionRegionalervice.editDirectionRegional(this.directionRegionalForm.value, this.directionRegional).subscribe((res) => {
            console.log(res);
            this.directionRegionalForm.reset();
            this._router.navigate(['pages/show-direction-regional']);
        });

    }
}
