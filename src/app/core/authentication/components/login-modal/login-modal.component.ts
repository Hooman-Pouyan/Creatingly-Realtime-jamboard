import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [NzFormModule, NzInputModule, ReactiveFormsModule, SharedModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    this.authService.login(this.validateForm.value);
    console.log('submit', this.validateForm.value);
    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
