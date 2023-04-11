import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEnseignantComponent } from './show-enseignant.component';

describe('ShowEnseignantComponent', () => {
  let component: ShowEnseignantComponent;
  let fixture: ComponentFixture<ShowEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
