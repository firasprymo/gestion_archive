import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { categories as categoriesData, documents as documentsData, demodocumentSteps as demodocumentStepsData } from 'app/mock-api/apps/academy/data';

@Injectable({
    providedIn: 'root'
})
export class AcademyMockApi
{
    private _categories: any[] = categoriesData;
    private _documents: any[] = documentsData;
    private _demodocumentSteps: any[] = demodocumentStepsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academy/categories')
            .reply(() => {

                // Clone the categories
                const categories = cloneDeep(this._categories);

                // Sort the categories alphabetically by title
                categories.sort((a, b) => a.title.localeCompare(b.title));

                return [200, categories];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ documents - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academy/documents')
            .reply(() => {

                // Clone the documents
                const documents = cloneDeep(this._documents);

                return [200, documents];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ document - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academy/documents/document')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the documents and steps
                const documents = cloneDeep(this._documents);
                const steps = cloneDeep(this._demodocumentSteps);

                // Find the document and attach steps to it
                const document = documents.find(item => item.id === id);
                if ( document )
                {
                    document.steps = steps;
                }

                return [
                    200,
                    document
                ];
            });
    }
}
