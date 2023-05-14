import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, Subject} from 'rxjs';
import {ApiService} from '../../../../../shared/service/api.service';
import {
    InventoryBrand,
    InventoryCategory,
    InventoryPagination, InventoryVendor
} from '../../../apps/ecommerce/inventory/inventory.types';
import {Skills} from '../../../../../shared/model/skills.types';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {debounceTime, map, switchMap, takeUntil} from 'rxjs/operators';
import {DocumentRequest} from '../../../../../shared/model/document-requests.types';
import {DocumentRequestService} from '../../../../../shared/service/document-request.service';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {UserService} from '../../../../../core/user/user.service';
import {Users} from '../../../../../shared/model/users.types';
import {DocumentStatus} from '../../../../../shared/model/document-status.enum';

@Component({
    selector: 'app-consult-document',
    templateUrl: './request-versement-document.component.html',
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
                    grid-template-columns: 80px 120px 120px 80px 350px 130px 80px ;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class RequestVersementDocumentComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    documentRequests$: Observable<DocumentRequest[]>;
    user$: Observable<Users>;
    user: Users;
    apiImg = ApiService.apiPicture;
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredSkills: Skills[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: FormControl = new FormControl();
    selectedDocument: DocumentRequest | null = null;
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
        private userService: UserService,
        private _documentReqService: DocumentRequestService,
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
        this.user$ = this.userService.user$;
        // Get the pagination
        this._documentReqService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: InventoryPagination) => {
                // Update the pagination
                this.pagination = pagination;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // Get the products
        this.getDocumentRequest();
        // Get the vendors

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

    getDocumentRequest(): any {
        this.documentRequests$ = this._documentReqService.documentRequests$;

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
        this.selectedDocument = null;
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

    isRoleResponsibleInList(value): any {
        return this.user$.subscribe(user =>
            user.roles.some(obj => obj.roleName === value)
        );
    }

    getStatus(status: DocumentStatus | undefined): any {
        return DocumentStatus[status];
    }

    changeRequest(document: DocumentRequest, status): any {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Accepter Demande',
            message: 'êtes vous sûr d\'accepter ce versement?',
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

                // Get the product object

                // Delete the product on the server
                return this._documentReqService.changeStatus(document, status).subscribe((res: any) => {
                    this.getDocumentRequest();
                    this.closeDetails();

                    return res;
                });
            }
        });
    }
}
