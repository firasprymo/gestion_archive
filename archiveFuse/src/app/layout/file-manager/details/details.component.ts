import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {MatDrawerToggleResult} from '@angular/material/sidenav';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FileManagerListComponent} from 'app/layout/file-manager/list/list.component';
import {FileManagerService} from 'app/layout/file-manager/file-manager.service';
import {Documents} from '../../../shared/model/documents.types';
import {DocumentsService} from '../../../shared/service/documents.service';

@Component({
    selector: 'file-manager-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerDetailsComponent implements OnInit, OnDestroy {
    item: Documents;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fileManagerListComponent: FileManagerListComponent,
        private _fileManagerService: FileManagerService,
        private _documentService: DocumentsService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._fileManagerListComponent.matDrawer.open();

        // Get the item
        this._documentService.document$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((document: Documents) => {
                // Open the drawer in case it is closed
                this._fileManagerListComponent.matDrawer.open();
                // Get the item
                this.item = document;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._fileManagerListComponent.matDrawer.close();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
