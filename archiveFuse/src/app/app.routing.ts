import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';
import {AddAgenceModule} from './modules/admin/pages/agence/add-agence/add-agence.module';

const roleAdmin = 'ROLE_ADMIN';
const roleUser = 'ROLE_USER';
const roleAgent = 'ROLE_AGENT';
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch: 'full', redirectTo: '/sign-in'},

    // Redirect signed-in user to the '/apps/academy'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full', redirectTo: 'dashboards/project'
    },

    // Auth routes for guests
    {
        path: '',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            },
            {
                path: 'apps',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {
                    role: [roleAdmin, roleUser]
                },
                resolve: {
                    initialData: InitialDataResolver,
                },
                children: [
                    {
                        path: 'academy',
                        data: {
                            role: [roleAdmin, roleUser]
                        },
                        loadChildren: () => import('app/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule)
                    },
                    {
                        path: 'ecommerce',
                        loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.module').then(m => m.ECommerceModule)
                    },
                    {
                        path: 'file-manager',
                        loadChildren: () => import('app/layout/file-manager/file-manager.module').then(m => m.FileManagerModule)
                    },

                ]
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            // Dashboards
            {
                path: 'dashboards', children: [
                    {
                        path: 'analytics',
                        loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule)
                    },
                    {
                        path: 'finance',
                        loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)
                    },
                    {
                        path: 'crypto',
                        loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule)
                    },
                ]
            },
            // Pages
            {
                path: 'pages',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                children: [


                    {
                        path: 'add-document',
                        canActivate: [AuthGuard],
                        // data: {
                        //     role: roleUser
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/add-document/add-document.module').then(m => m.AddDocumentModule)
                    },    {
                        path: 'request-documents',
                        canActivate: [AuthGuard],
                        // data: {
                        //     role: roleUser
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/request-document/request-document.module').then(m => m.RequestDocumentModule)
                    },

                    {
                        path: 'add-document/:id',
                        canActivate: [AuthGuard],
                        // data: {
                        //     role: roleUser
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/add-document/add-document.module').then(m => m.AddDocumentModule)
                    },
                    {
                        path: 'show-documents',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/show-documents/show-documents.module').then(m => m.ShowDocumentsModule)
                    },
                    {
                        path: 'show-nomenclatures',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/nomenclature/show-nomenclatures/show-nomenclature.module').then(m => m.ShowNomenclatureModule)
                    },
                    {
                        path: 'add-nomenclature',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/nomenclature/add-nomenclature/add-nomenclature.module').then(m => m.AddNomenclatureModule)
                    },
                    {
                        path: 'add-nomenclature/:id',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/nomenclature/add-nomenclature/add-nomenclature.module').then(m => m.AddNomenclatureModule)
                    },
                    {
                        path: 'show-structures',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/StructureCentral/show-structure-central/show-structure-central.module').then(m => m.ShowStructureCentralModule)
                    },
                    {
                        path: 'add-structure',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/StructureCentral/add-structure-central/add-structure-central.module').then(m => m.AddStructureCentralModule)
                    },
                    {
                        path: 'add-structure/:id',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/StructureCentral/add-structure-central/add-structure-central.module').then(m => m.AddStructureCentralModule)
                    },
                    {
                        path: 'add-centre',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/centre-archive/add-centre-archive/add-centre-archive.module')
                            .then(m => m.AddCentreArchiveModule)
                    }, {
                        path: 'add-centre/:id',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/centre-archive/add-centre-archive/add-centre-archive.module')
                            .then(m => m.AddCentreArchiveModule)
                    }, {
                        path: 'show-centre',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/centre-archive/show-centre-archive/show-centre-archive.module')
                            .then(m => m.ShowCentreArchiveModule)
                    },
                    {
                        path: 'add-agence',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/agence/add-agence/add-agence.module')
                            .then(m => m.AddAgenceModule)
                    }, {
                        path: 'add-agence/:id',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/agence/add-agence/add-agence.module')
                            .then(m => m.AddAgenceModule)
                    }, {
                        path: 'show-agences',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/agence/show-agences/show-agences.module')
                            .then(m => m.ShowAgenceModule)
                    },
                    {
                        path: 'add-centre-pre',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/centre-pre-archive/add-centre-pre-archive/add-centre-pre-archive.module')
                            .then(m => m.AddCentrePreArchiveModule)
                    }, {
                        path: 'add-centre-pre/:id',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/centre-pre-archive/add-centre-pre-archive/add-centre-pre-archive.module')
                            .then(m => m.AddCentrePreArchiveModule)
                    }, {
                        path: 'show-centres-pre',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/centre-pre-archive/show-centre-pre-archive/show-centre-pre-archive.module')
                            .then(m => m.ShowCentrePreArchiveModule)
                    },
                    {
                        path: 'consult-documents',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/consult-document/consult-document.module').then(m => m.ConsultDocumentModule)
                    },
                    {
                        path: 'request-consult-documents',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/request-consult-documents/request-consult-documents.module')
                            .then(m => m.RequestConsultDocumentsModule)
                    },
                    {
                        path: 'document_mature_premier_age',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/document_mature_premier_age/document-mature-premier-age.module')
                            .then(m => m.DocumentMaturePremierAgeModule)
                    },
                    {
                        path: 'request-versement-document',
                        // data: {
                        //     role: roleAdmin
                        // },
                        loadChildren: () => import('app/modules/admin/pages/document/request-versement-document/request-versement-document.module')
                            .then(m => m.RequestVersementDocumentModule)
                    },
                    {
                        path: 'show-direction-regional',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/direction-regional/show-direction-regional/show-direction-regional.module').then(m => m.ShowDirectionRegionalModule)
                    },
                    {
                        path: 'add-direction-regional',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/direction-regional/add-direction-regional/add-direction-regional.module').then(m => m.AddDirectionRegionalModule)
                    }, {
                        path: 'add-direction-regional/:id',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/direction-regional/add-direction-regional/add-direction-regional.module').then(m => m.AddDirectionRegionalModule)
                    },
                    {
                        path: 'add-user',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/user/add-user/add-user.module').then(m => m.AddUserModule)
                    },
                    {
                        path: 'add-user/:id',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/user/add-user/add-user.module').then(m => m.AddUserModule)
                    },
                    {
                        path: 'show-users',
                        data: {
                            role: roleAdmin
                        },
                        loadChildren: () => import('app/modules/admin/pages/user/show-users/show-users.module').then(m => m.ShowUsersModule)
                    },
                    // Error
                    {
                        path: 'error', children: [
                            {
                                path: '404',
                                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
                            },
                            {
                                path: '500',
                                loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)
                            }
                        ]
                    },
                    // Pricing
                    {
                        path: 'pricing',
                        data: {
                            role: roleUser,
                            layout: 'modern'

                        },
                        children: [

                            {
                                path: 'simple',
                                data: {
                                    role: roleUser
                                },
                                loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule)
                            },

                        ]
                    },

                    // Profile
                    {
                        path: 'profile',
                        loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)
                    },

                    // Settings
                    {
                        path: 'settings',
                        loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule)
                    },
                ]
            },

            // User Interface
            {
                path: 'ui', children: [

                    // Material Components
                    {
                        path: 'material-components',
                        loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule)
                    },

                    // Fuse Components
                    {
                        path: 'fuse-components',
                        loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule)
                    },

                    // Other Components
                    {
                        path: 'other-components',
                        loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule)
                    },


                    // Advanced Search
                    {
                        path: 'advanced-search',
                        loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule)
                    },

                    // Cards
                    {
                        path: 'cards',
                        loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule)
                    },

                    // Colors
                    {
                        path: 'colors',
                        loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule)
                    },

                    // Confirmation Dialog
                    {
                        path: 'confirmation-dialog',
                        loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule)
                    },


                    // Forms
                    {
                        path: 'forms', children: [
                            {
                                path: 'fields',
                                loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)
                            },
                            {
                                path: 'layouts',
                                loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)
                            },
                            {
                                path: 'wizards',
                                loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule)
                            }
                        ]
                    },

                    // Icons
                    {
                        path: 'icons',
                        loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule)
                    },

                    // Page Layouts
                    {
                        path: 'page-layouts',
                        loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
                    },

                ]
            },

            // Documentation
            {
                path: 'docs', children: [

                    // Changelog
                    {
                        path: 'changelog',
                        loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule)
                    },

                    // Guides
                    {
                        path: 'guides',
                        loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule)
                    }
                ]
            },

            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            },
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
