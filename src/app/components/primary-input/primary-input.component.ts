import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password" | "number";

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PrimaryInputComponent),
    multi: true
  }],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";

  value: string = "";
  onChange: any = () => {};
  onTouch: any = () => {};

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouch();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if you want to handle disabled state
  }
}
