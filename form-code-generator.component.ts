import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Field {
  name: string;
  label: string;
  type: string;
  value: any;
  validators: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface FormConfig {
  formName: string;
  fields: Field[];
}

@Component({
  selector: 'app-form-code-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-code-generator.component.html',
  styleUrls: ['./form-code-generator.component.css'],
})
export class FormCodeGeneratorComponent implements OnInit {
  formConfig: FormConfig = {
    formName: 'userForm',
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        value: '',
        validators: {
          required: true,
          minLength: 5,
        },
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        value: '',
        validators: {
          required: true,
          pattern: '^\\S+@\\S+\\.\\S+$',
        },
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        value: '',
        validators: {
          required: true,
          minLength: 8,
        },
      },
    ],
  };

  generatedCode: string = '';

  constructor() {}

  ngOnInit(): void {
    this.generatedCode = this.generateFormCode(this.formConfig);
  }

  generateFormCode(config: FormConfig): string {
    const controls = config.fields
      .map((field) => {
        let validators = [];
        if (field.validators.required) {
          validators.push('Validators.required');
        }
        if (field.validators.minLength) {
          validators.push(
            `Validators.minLength(${field.validators.minLength})`
          );
        }
        if (field.validators.maxLength) {
          validators.push(
            `Validators.maxLength(${field.validators.maxLength})`
          );
        }
        if (field.validators.pattern) {
          validators.push(`Validators.pattern('${field.validators.pattern}')`);
        }
        const validatorsString = validators.length
          ? `[${validators.join(', ')}]`
          : '[]';

        return `${field.name}: new FormControl('${
          field.value || ''
        }', ${validatorsString})`;
      })
      .join(',\n  ');

    return `${config.formName}: new FormGroup({
  ${controls}
});`;
  }
}
