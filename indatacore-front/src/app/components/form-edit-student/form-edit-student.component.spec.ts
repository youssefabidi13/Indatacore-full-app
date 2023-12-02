import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditStudentComponent } from './form-edit-student.component';

describe('FormEditStudentComponent', () => {
  let component: FormEditStudentComponent;
  let fixture: ComponentFixture<FormEditStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
