import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectionRegionalComponent } from './add-direction-regional.component';

describe('AddDirectionRegionalComponent', () => {
  let component: AddDirectionRegionalComponent;
  let fixture: ComponentFixture<AddDirectionRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDirectionRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDirectionRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
