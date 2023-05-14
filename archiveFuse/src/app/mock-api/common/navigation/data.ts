/* eslint-disable */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [

    // {
    //     id: 'home',
    //     title: 'Home',
    //     type: 'basic',
    //     icon: 'heroicons_outline:home',
    //     link: '/dashboards/project',
    //     meta: ['ROLE_ADMIN', 'ROLE_RESOPONSABLE', 'ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE'],
    //
    // },
    {
        id: 'documents',
        title: 'Documents',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_RESOPONSABLE', 'ROLE_RESOPONSABLE_CENTRE_ARCHIVE', 'ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE'],
        children: [
            {
                id: 'documents.add',
                title: 'Add document',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-document',
                meta: ['ROLE_AGENT'],

            },
            {
                id: 'documents.show',
                title: 'Show documents',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-documents',
                meta: ['ROLE_AGENT','ROLE_RESOPONSABLE'],
            },
            {
                id: 'documents.showlieu',
                title: 'Show documents',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-documents-lieu-affectation',
                meta: ['ROLE_RESOPONSABLE_CENTRE_ARCHIVE','ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE'],
            },
            {
                id: 'documents.consult',
                title: 'Consult documents',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/consult-documents',
                meta: [],
            },
            {
                id: 'documents.request',
                title: 'Valider document',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/request-documents',
                meta: ['ROLE_RESOPONSABLE'],
            },
            {
                id: 'documents.requestconsult',
                title: 'Demande de consultation document',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/request-consult-documents',
                meta: ['ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE', 'ROLE_RESOPONSABLE_CENTRE_ARCHIVE'],
            },
            {
                id: 'documents.Document_mature_premiér_âge',
                title: 'Document mature premiér âge',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/document_mature_premier_age',
                meta: ['ROLE_RESOPONSABLE'],
            },
            {
                id: 'documents.request-versement-document',
                title: 'Accepter demande de versement',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/request-versement-document',
                meta: ['ROLE_RESOPONSABLE_CENTRE_ARCHIVE'],
            },
            {
                id: 'request-versement-document-deuxieme',
                title: 'Accepter demande de versement deuxiéme âge',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/request-versement-document-deuxieme',
                meta: ['ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE'],
            },
            {
                id: 'request-versement-document-deuxieme',
                title: 'Passer demande de versement troisiéme âge',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/request-versement-document-troisieme',
                meta: ['ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE'],
            },

        ]
    },
    {
        id: 'users',
        title: 'Utilisateurs',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'users.add',
                title: 'Ajouter utilisateur',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-user',
                meta: ['ROLE_ADMIN'],

            },
            {
                id: 'users.show',
                title: 'Afficher utilisateur',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-users',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    {
        id: 'structures',
        title: 'Structure central',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'structures.add',
                title: 'Ajouter structure',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-structure',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'structures.show',
                title: 'Afficher structure',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-structures',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    // {
    //     id: 'quizes',
    //     title: 'Quiz',
    //     subtitle: '',
    //     type: 'group',
    //     icon: 'heroicons_outline:home',
    //     meta: ['ROLE_ADMIN'],
    //     children: [
    //         {
    //             id: 'quizes.add',
    //             title: 'Add quiz',
    //             type: 'basic',
    //             icon: 'heroicons_outline:pencil-alt',
    //             link: '/pages/add-quiz',
    //             meta: ['ROLE_ADMIN'],
    //         },
    //         {
    //             id: 'quizes.show',
    //             title: 'Show quizes',
    //             type: 'basic',
    //             icon: 'heroicons_outline:chart-pie',
    //             link: '/pages/show-quizes',
    //             meta: ['ROLE_ADMIN'],
    //         },
    //     ]
    // },
    {
        id: 'Direction Regional',
        title: 'Direction Régional',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'DirectionRegional.add',
                title: 'Ajouter direction régional',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-direction-regional',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'DirectionRegional.show',
                title: 'Afficher direction régional',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-direction-regional',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    {
        id: 'agences',
        title: 'Agences',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [

            {
                id: 'agences.add',
                title: 'Ajouter agence',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/pages/add-agence',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'agences.show',
                title: 'Afficher agences',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/pages/show-agences',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    {
        id: 'prearchives',
        title: 'Centre Pré-archive',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'prearchives.add',
                title: 'Ajouter centre pré archive',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/add-centre-pre',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'prearchives.show',
                title: 'Afficher centre pré archive',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/show-centres-pre',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    {
        id: 'archives',
        title: 'Centre archive',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'archives.add',
                title: 'Ajouter centre archive',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/add-centre',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'archives.show',
                title: 'Afficher centre archive',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/show-centre',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    {
        id: 'nomenclatures',
        title: 'Nomenclature',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'nomenclatures.add',
                title: 'Ajouter nomenclature',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/add-nomenclature',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'nomenclatures.show',
                title: 'Afficher nomenclature',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/pages/show-nomenclatures',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
    {
        id: 'mouvements',
        title: 'Mouvements',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        children: [
            {
                id: 'mouvements.add',
                title: 'Mouvement',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/add-mouvements',
                meta: ['ROLE_ADMIN'],
            },
            {
                id: 'mouvements.show',
                title: 'Afficher Mouvements',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/show-mouvements',
                meta: ['ROLE_ADMIN'],
            },
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'basic',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_ADMIN'],
        link: '/dashboards/project',
    },
    {
        id: 'agences',
        title: 'Resources',
        subtitle: '',
        type: 'group',
        meta: ['ROLE_USER'],
        icon: 'heroicons_outline:home',
        children: [

            {
                id: 'resources.show',
                title: 'Show resources',
                type: 'basic',
                meta: [''],
                icon: 'heroicons_outline:chart-pie',
                link: '/apps/file-manager'
            },
        ]
    }

];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        meta: ['ROLE_ADMIN'],
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'resources',
        title: 'Resources',
        meta: ['ROLE_USER'],
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [

            {
                id: 'resources.show',
                title: 'Show resources',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/apps/file-manager',
                meta: ['']
            },
        ]
    }

];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        meta: ['ROLE_ADMIN'],
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboards/project',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },

    {
        id: 'apps',
        title: 'Academy',
        subtitle: '',
        type: 'basic',
        icon: 'heroicons_outline:home',
        meta: ['ROLE_USER'],
        link: '/apps/academy',
    },
    {
        id: 'resources',
        title: 'Resources',
        subtitle: '',
        type: 'basic',
        meta: ['ROLE_USER'],
        icon: 'heroicons_outline:folder',
        link: '/apps/file-manager'
    },
    {
        id: 'pricing',
        title: 'Offers',
        subtitle: '',
        type: 'basic',
        icon: 'heroicons_outline:shopping-bag',
        meta: ['ROLE_USER'],
        link: '/pages/pricing/simple',
    }
];
