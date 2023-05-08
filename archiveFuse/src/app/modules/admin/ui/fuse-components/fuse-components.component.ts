import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FuseNavigationItem} from '@fuse/components/navigation';
import {MatDrawer} from '@angular/material/sidenav';
import {Subject} from 'rxjs';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'fuse-components',
    templateUrl: './fuse-components.component.html',
    styleUrls: ['./fuse-components.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseComponentsComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;
    menuData: FuseNavigationItem[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
        this.menuData = [
            {
                id: 'fuse-components.libraries',
                title: 'Libraries',
                type: 'group',
                meta: [''],
                children: [
                    {
                        id: 'fuse-components.libraries.mock-api',
                        title: 'MockAPI',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/libraries/mock-api'
                    }
                ]
            },
            {
                id: 'fuse-components.components',
                title: 'Components',
                type: 'group',
                meta: [''],
                children: [
                    {
                        id: 'fuse-components.components.alert',
                        title: 'Alert',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/alert'
                    },
                    {
                        id: 'fuse-components.components.card',
                        title: 'Card',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/card'
                    },
                    {
                        id: 'fuse-components.components.date-range',
                        title: 'DateRange',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/date-range'
                    },
                    {
                        id: 'fuse-components.components.drawer',
                        title: 'Drawer',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/drawer'
                    },
                    {
                        id: 'fuse-components.components.fullscreen',
                        title: 'Fullscreen',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/fullscreen'
                    },
                    {
                        id: 'fuse-components.components.highlight',
                        title: 'Highlight',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/highlight'
                    },
                    {
                        id: 'fuse-components.components.masonry',
                        title: 'Masonry',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/components/masonry'
                    },
                    {
                        id: 'fuse-components.components.navigation',
                        title: 'Navigation',
                        type: 'basic',
                        meta: [''],
                        link: '/ui/fuse-components/components/navigation'
                    }
                ]
            },
            {
                id: 'fuse-components.directives',
                title: 'Directives',
                type: 'group',
                meta: [''],
                children: [
                    {
                        id: 'fuse-components.directives.scrollbar',
                        title: 'Scrollbar',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/directives/scrollbar'
                    },
                    {
                        id: 'fuse-components.directives.scroll-reset',
                        title: 'ScrollReset',
                        meta: [''],
                        type: 'basic',
                        link: '/ui/fuse-components/directives/scroll-reset'
                    }
                ]
            },
            {
                id: 'fuse-components.services',
                title: 'Services',
                type: 'group',
                meta: [''],
                children: [
                    {
                        id: 'fuse-components.services.config',
                        title: 'Config',
                        type: 'basic',
                        meta: [''],
                        link: '/ui/fuse-components/services/config'
                    },
                    {
                        id: 'fuse-components.services.confirmation',
                        title: 'Confirmation',
                        type: 'basic',
                        meta: [''],
                        link: '/ui/fuse-components/services/confirmation'
                    },
                    {
                        id: 'fuse-components.services.splash-screen',
                        title: 'SplashScreen',
                        type: 'basic',
                        meta: [''],
                        link: '/ui/fuse-components/services/splash-screen'
                    },
                    {
                        id: 'fuse-components.services.media-watcher',
                        title: 'MediaWatcher',
                        type: 'basic',
                        link: '/ui/fuse-components/services/media-watcher',
                        meta: [''],
                    }
                ]
            },
            {
                id: 'fuse-components.pipes',
                title: 'Pipes',
                type: 'group',
                meta: [''],
                children: [
                    {
                        id: 'fuse-components.pipes.find-by-key',
                        title: 'FindByKey',
                        type: 'basic',
                        link: '/ui/fuse-components/pipes/find-by-key',
                        meta: [''],
                    }
                ]
            },
            {
                id: 'fuse-components.validators',
                title: 'Validators',
                type: 'group',
                meta: [''],
                children: [
                    {
                        id: 'fuse-components.validators.must-match',
                        title: 'MustMatch',
                        type: 'basic',
                        link: '/ui/fuse-components/validators/must-match',
                        meta: [''],
                    }
                ]
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('md')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

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
}
