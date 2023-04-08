import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDirectionRegionalComponent } from './get-direction-regional.component';

describe('GetDirectionRegionalComponent', () => {
  let component: GetDirectionRegionalComponent;
  let fixture: ComponentFixture<GetDirectionRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDirectionRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDirectionRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
