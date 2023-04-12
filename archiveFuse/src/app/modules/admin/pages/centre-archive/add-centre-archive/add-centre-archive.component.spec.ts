import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentreArchiveComponent } from './add-centre-archive.component';

describe('AddCentreArchiveComponent', () => {
  let component: AddCentreArchiveComponent;
  let fixture: ComponentFixture<AddCentreArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCentreArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentreArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
