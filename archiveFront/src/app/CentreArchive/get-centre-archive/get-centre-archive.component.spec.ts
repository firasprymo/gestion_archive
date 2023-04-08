import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCentreArchiveComponent } from './get-centre-archive.component';

describe('GetCentreArchiveComponent', () => {
  let component: GetCentreArchiveComponent;
  let fixture: ComponentFixture<GetCentreArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCentreArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCentreArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
