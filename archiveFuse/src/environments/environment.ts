// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl : 'http://localhost:8080/',
    apiImg: 'http://localhost:8061/',
    users: 'users',
    username: 'username',
    auth: 'auth',
    accessToken: 'accessToken',
    directionRegional: 'api/direction-regional',
    trainers: 'trainers',
    skills: 'skills',
    documents: 'api/documents',
    centreArchives: 'api/centre-archives',
    centrePreArchives: 'api/centre-pre-archives',
    documentRequests: 'api/document-requests',
    quizs: 'quizs',
    steps: 'steps',
    activeUser: 'activeUser',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
