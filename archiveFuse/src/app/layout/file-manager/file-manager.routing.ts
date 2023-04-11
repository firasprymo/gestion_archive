import {Route} from '@angular/router';
import {FileManagerComponent} from './file-manager.component';
import {FileManagerListComponent} from './list/list.component';
import {FileManagerDetailsComponent} from './details/details.component';
import {CanDeactivateFileManagerDetails} from './file-manager.guards';

export const fileManagerRoutes: Route[] = [
    {
        path: '',
        component: FileManagerComponent,
        data: {
            layout: 'modern'
        },
        children: [
            {
                path: 'folders/:folderId',
                component: FileManagerListComponent,
                resolve: {
                },
                children: [
                    {
                        path: 'details/:id',
                        component: FileManagerDetailsComponent,
                        resolve: {

                        },
                        canDeactivate: [CanDeactivateFileManagerDetails]
                    }
                ]
            },
            {
                path: '',
                component: FileManagerListComponent,
                resolve: {
                },
                children: [
                    {
                        path: 'details/:id',
                        component: FileManagerDetailsComponent,
                        resolve: {

                        },
                        canDeactivate: [CanDeactivateFileManagerDetails]
                    }
                ]
            }
        ]
    }
];
