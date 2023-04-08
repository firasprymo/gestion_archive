import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAgenceComponent } from './get-agence.component';

describe('GetAgenceComponent', () => {
  let component: GetAgenceComponent;
  let fixture: ComponentFixture<GetAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
