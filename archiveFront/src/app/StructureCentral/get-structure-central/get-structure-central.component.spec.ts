import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStructureCentralComponent } from './get-structure-central.component';

describe('GetStructureCentralComponent', () => {
  let component: GetStructureCentralComponent;
  let fixture: ComponentFixture<GetStructureCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStructureCentralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStructureCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
