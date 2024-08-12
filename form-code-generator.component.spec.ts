import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCodeGeneratorComponent } from './form-code-generator.component';

describe('FormCodeGeneratorComponent', () => {
  let component: FormCodeGeneratorComponent;
  let fixture: ComponentFixture<FormCodeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCodeGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
