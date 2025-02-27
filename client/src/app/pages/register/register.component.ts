import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private service: HttpService = inject(HttpService);
  private $subscriptions: Subscription[] = [];
  
  public form!: FormGroup;
  public builder: FormBuilder = inject(FormBuilder);
  public error!: string;
  public success!: string;
  public loading: boolean = false;
  public router: Router = inject(Router);
  public $subs: Subscription[] = [];

  constructor() { }

  handleSubmit() {
    this.loading = true;
    this.form.disable();
    this.error = '';
    this.success = '';

    const $sub = this.service
    .registerUser(this.form.value.username, this.form.value.email, this.form.value.password)
    .subscribe(
      {
        next: (res) => {
          this.loading = false;
          this.success = 'User registered successfully! You can now login';
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.loading = false;
          console.log(err.error.message);
          this.error = 'Something went wrong! Please retry';
          this.form.enable();
        }
      }
    );
    this.$subscriptions.push($sub);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.builder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.$subscriptions.forEach(sub => sub.unsubscribe());
  }
}