import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFooterOptionsComponent } from './form-footer-options.component';

describe('FormFooterOptionsComponent', () => {
  let component: FormFooterOptionsComponent;
  let fixture: ComponentFixture<FormFooterOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFooterOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFooterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
