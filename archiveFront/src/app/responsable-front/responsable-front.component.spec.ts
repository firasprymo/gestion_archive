import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableFrontComponent } from './responsable-front.component';

describe('ResponsableFrontComponent', () => {
  let component: ResponsableFrontComponent;
  let fixture: ComponentFixture<ResponsableFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
