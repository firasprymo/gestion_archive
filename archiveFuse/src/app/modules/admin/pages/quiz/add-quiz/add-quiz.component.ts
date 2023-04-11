import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {QuizService} from '../../../../../shared/service/quiz.service';
import {DirectionRegionalService} from '../../../../../shared/service/direction-regional.service';
import {DirectionRegional} from '../../../../../shared/model/direction-regional.types';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.component.html',
    styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
    done = false;
    idLesson: number;
    directionRegional$: Observable<DirectionRegional>;

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
                private _active: ActivatedRoute,
                private _router: Router,
                private _DirectionRegionalService: DirectionRegionalService,
                private quizService: QuizService) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._active.params.subscribe((res) => {
            this.idLesson = res.idLesson;
            this.directionRegional$ = this._DirectionRegionalService.directionRegional$;

        });

    }

    submit(step): void {
        const quizsListItems = [];
        for (const item of step.quizs) {
            quizsListItems.push(
                {
                    questions: [
                        {
                            question: item.questions,
                            answers: [
                                {
                                    answer: item.answer1,
                                    correctRequest: true
                                },
                                {
                                    answer: item.answer2,
                                    correctRequest: false
                                },
                                {
                                    answer: item.answer3,
                                    correctRequest: false
                                }
                            ]
                        }
                    ]
                });
        }
        console.log(quizsListItems);
        const body = {
            quizsList: quizsListItems,
            lesson: {
                id: this.idLesson
            }
        };
        console.log(typeof body.quizsList);
        this.quizService.addQuiz(body).subscribe((res: any) => {
            console.log(res);
            this._router.navigateByUrl('/pages/show-DirectionRegional');
        });
    }

}

