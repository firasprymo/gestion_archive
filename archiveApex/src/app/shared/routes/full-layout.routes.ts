import {Routes, RouterModule} from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
    {
        path: 'changelog',
        loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangeLogModule)
    },
    {
        path: 'full-layout',
        loadChildren: () => import('../../pages/full-layout-page/full-pages.module').then(m => m.FullPagesModule)
    },
    {
        path: 'show-salle',
        loadChildren: () => import('../../pages/full-layout-page/salle/salle-list/salle-list.module').then(m => m.SalleListModule)
    },
    {
        path: 'add-salle',
        loadChildren: () => import('../../pages/full-layout-page/salle/add-salle/add-salle.module').then(m => m.AddSalleModule)
    },
    {
        path: 'edit-salle/:id',
        loadChildren: () => import('../../pages/full-layout-page/salle/add-salle/add-salle.module').then(m => m.AddSalleModule)
    },
    {
        path: 'add-examen',
        loadChildren: () => import('../../pages/full-layout-page/examen/add-examen/add-examen.module').then(m => m.AddExamenModule)
    },
    {
        path: 'edit-examen/:id',
        loadChildren: () => import('../../pages/full-layout-page/examen/add-examen/add-examen.module').then(m => m.AddExamenModule)
    },
    {
        path: 'show-examens',
        loadChildren: () => import('../../pages/full-layout-page/examen/show-examen/show-examen.module').then(m => m.ShowExamenModule)
    },

    {
        path: 'add-filiere',
        loadChildren: () => import('../../pages/full-layout-page/filiere/add-filiere/add-filiere.module').then(m => m.AddFiliereModule)
    },
    {
        path: 'edit-filiere/:id',
        loadChildren: () => import('../../pages/full-layout-page/filiere/add-filiere/add-filiere.module').then(m => m.AddFiliereModule)
    },
    {
        path: 'show-filieres',
        loadChildren: () => import('../../pages/full-layout-page/filiere/show-filiere/show-filiere.module').then(m => m.ShowFiliereModule)
    },
    {
        path: 'classes',
        loadChildren: () => import('../../pages/full-layout-page/classes/classes.module')
            .then(m => m.ClassesModule)
    }, {
        path: 'enseignant',
        loadChildren: () => import('../../pages/full-layout-page/enseignant/enseignant.module')
            .then(m => m.EnseignantModule)
    },

];
