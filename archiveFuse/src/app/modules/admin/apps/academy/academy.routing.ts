import { Route } from '@angular/router';
import { AcademyComponent } from 'app/modules/admin/apps/academy/academy.component';
import { AcademyCategoriesResolver } from 'app/modules/admin/apps/academy/academy.resolvers';
import {documentByIdResolver, } from '../../../../shared/resolver/documents.resolvers';

export const academyRoutes: Route[] = [
    {
        path     : '',
        component: AcademyComponent,
        data:{
            layout:'modern'
        },
        resolve  : {
            categories: AcademyCategoriesResolver
        },
        children : [
        ]
    }
];
