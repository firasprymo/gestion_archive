import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: 'salles', title: 'Salle', icon: 'ft-align-left', class: 'has-sub', badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            {
                path: '/show-salle', title: 'Afficher', icon: 'ft-list', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            },
            {
                path: '/add-salle', title: 'Ajouter', icon: 'ft-plus', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            }
        ]
    },
    {
        path: 'enseignants', title: 'Enseignant', icon: 'ft-person', class: 'has-sub', badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            {
                path: '/enseignant/show-enseignant', title: 'Afficher', icon: 'ft-list', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            },
            {
                path: '/enseignant/add-enseignant', title: 'Ajouter', icon: 'ft-plus', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            }
        ]
    },
    {
        path: '/classes', title: 'Class', icon: 'ft-align-left', class: 'has-sub', badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            {
                path: '/classes/show-classes', title: 'Afficher', icon: 'ft-list', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            },
            {
                path: '/classes/add-classes', title: 'Ajouter', icon: 'ft-plus', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            }
        ]
    },
    {
        path: '/filieres', title: 'Filiére', icon: 'ft-align-left', class: 'has-sub', badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            {
                path: '/show-filieres', title: 'Afficher', icon: 'ft-list', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            },
            {
                path: '/add-filiere', title: 'Ajouter', icon: 'ft-plus', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            }
        ]
    },
    // {
    //     path: '', title: 'Examen', icon: 'ft-align-left', class: 'has-sub', badge: '',
    //     badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    //     submenu: [
    //         {
    //             path: 'javascript:;', title: 'Afficher', icon: 'ft-list', class: '', badge: '',
    //             badgeClass: '', isExternalLink: true, submenu: []
    //         },
    //         {
    //             path: 'javascript:;', title: 'Ajouter', icon: 'ft-plus', class: '', badge: '',
    //             badgeClass: '', isExternalLink: true, submenu: []
    //         }
    //     ]
    // },
    {
        path: '/examens', title: 'Examen', icon: 'ft-align-left', class: 'has-sub', badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            {
                path: '/show-examens', title: 'Afficher', icon: 'ft-list', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            },
            {
                path: '/add-examen', title: 'Ajouter', icon: 'ft-plus', class: '', badge: '',
                badgeClass: '', isExternalLink: true, submenu: []
            }
        ]
    }

];
