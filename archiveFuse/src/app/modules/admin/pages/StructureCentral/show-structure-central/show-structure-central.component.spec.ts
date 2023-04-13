import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStructureCentralComponent } from './show-structure-central.component';

describe('ShowStructureCentralComponent', () => {
  let component: ShowStructureCentralComponent;
  let fixture: ComponentFixture<ShowStructureCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStructureCentralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStructureCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
