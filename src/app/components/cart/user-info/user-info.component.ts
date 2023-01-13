import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  @Output() onCheckoutSuccess: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required]],
      creditCard: ['', [Validators.required]],
    });
  }
  onSubmit = (): void => {
    this.onCheckoutSuccess.emit(this.formGroup.value.firstName);
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }
  get address() {
    return this.formGroup.get('address');
  }
  get creditCard() {
    return this.formGroup.get('creditCard');
  }
}
