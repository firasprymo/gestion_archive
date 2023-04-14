import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fuseAnimations} from '@fuse/animations';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {InventoryService} from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import {
    InventoryPagination,
} from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import {Agence} from 'app/shared/model/agence.types';
import {ApiService} from 'app/shared/service/api.service';
import {AgenceService} from 'app/shared/service/agence.service';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, map, switchMap, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-agences',
    templateUrl: './show-agences.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class ShowAgenceComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    agences$: Observable<Agence[]>;
    apiImg = ApiService.apiPicture;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedAgence: Agence | null = null;
    selectedProductForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _agenceService: AgenceService,
    ) {
    }

// -----------------------------------------------------------------------------------------------------
// @ Lifecycle hooks
// -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the selected product form
        this.selectedProductForm = this._formBuilder.group({
            id: [''],
            category: [''],
            name: ['', [Validators.required]],
            description: [''],
            skills: [[]],
            sku: [''],
            barcode: [''],
            brand: [''],
            vendor: [''],
            stock: [''],
            reserved: [''],
            cost: [''],
            basePrice: [''],
            taxPercent: [''],
            price: [''],
            weight: [''],
            thumbnail: [''],
            images: [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active: [false]
        });


        // Get the pagination
        this._agenceService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: InventoryPagination) => {
                // Update the pagination
                this.pagination = pagination;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Get the products
        this.agences$ = this._agenceService.agences$;
        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    console.log('loading');
                    this.closeDetails();
                    this.isLoading = true;
                    return this._agenceService.getAllAgences(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._agenceService.getAllAgences(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
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
     * Close the details
     */
    closeDetails(): void {
        this.selectedAgence = null;
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

    deleteSelectedAgence(agence: Agence): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Direction',
            message: 'Are you sure you want to remove this direction? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {

                // Get the product object

                // Delete the product on the server
                this._agenceService.deleteAgence(agence).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }
}
