import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStudentComponent } from './gestion-student.component';

describe('GestionStudentComponent', () => {
  let component: GestionStudentComponent;
  let fixture: ComponentFixture<GestionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
