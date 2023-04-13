import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructureCentralComponent } from './add-structure-central.component';

describe('AddStructureCentralComponent', () => {
  let component: AddStructureCentralComponent;
  let fixture: ComponentFixture<AddStructureCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStructureCentralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructureCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
