import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, Subject} from 'rxjs';
import {Documents} from '../../../../../shared/model/documents.types';
import {
    InventoryBrand,
    InventoryCategory,
    InventoryPagination, InventoryVendor
} from '../../../apps/ecommerce/inventory/inventory.types';
import {Skills} from '../../../../../shared/model/skills.types';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {InventoryService} from '../../../apps/ecommerce/inventory/inventory.service';
import {DocumentsService} from '../../../../../shared/service/documents.service';
import {debounceTime, map, switchMap, takeUntil} from 'rxjs/operators';
import {ApiService} from '../../../../../shared/service/api.service';
import {DocumentStatus} from '../../../../../shared/model/document-status.enum';
import {DocumentRequestService} from '../../../../../shared/service/document-request.service';
import {UserService} from '../../../../../core/user/user.service';
import {Users} from '../../../../../shared/model/users.types';
import {DocumentRequest} from '../../../../../shared/model/document-requests.types';

@Component({
    selector: 'app-show-documents',
    templateUrl: './request-consult-documents.component.html',
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
                    grid-template-columns: 150px 150px 150px 200px auto;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class RequestConsultDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    documentLists$: Observable<DocumentRequest[]>;
    user$: Observable<Users>;
    apiImg = ApiService.apiPicture;
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredSkills: Skills[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selecteddocument: Documents | null = null;
    selectedProductForm: FormGroup;
    skills: Skills[];
    tagsEditMode: boolean = false;
    vendors: InventoryVendor[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _inventoryService: InventoryService,
        private _documentService: DocumentsService,
        private _userService: UserService,
        private _documentRequestService: DocumentRequestService,
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
        this._documentRequestService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: InventoryPagination) => {
                // Update the pagination
                this.pagination = pagination;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Get the products
        this.documentLists$ = this._documentRequestService.documentRequests$;
        // Get the vendors
        this.user$ = this._userService.get();

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    console.log('loading');
                    this.closeDetails();
                    this.isLoading = true;
                    return null;
                    // return this._documentService.getAlldocuments(0, 10, 'name', 'asc', query);
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
                    return null;
                    // return this._documentService.getAlldocuments(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
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
        this.selecteddocument = null;
    }


    /**
     * Filter tags
     *
     * @param event
     */
    filterSkills(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredSkills = this.skills.filter(tag => tag.title.toLowerCase().includes(value));
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedDocument(document: Documents): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete document',
            message: 'Are you sure you want to remove this document? This action cannot be undone!',
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
                this._documentService.deleteDocument(document).subscribe(() => {

                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
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


    getEnum(status: DocumentStatus | undefined): any {
        return DocumentStatus[status];
    }

    changeStatus(document: DocumentRequest, status: string): any {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Accepter demande de consultation document',
            message: 'Voulez Vous accepter cette demande de consultation?',
            actions: {
                confirm: {
                    label: 'Valider'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Delete the product on the server
                this._documentRequestService.changeRequestStatus(document, status).subscribe(() => {
                    // Close the details
                    this.closeDetails();
                });
            }
        });
    }
}
