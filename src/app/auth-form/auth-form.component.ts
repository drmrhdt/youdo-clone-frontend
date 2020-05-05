import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
})
export class AuthFormComponent implements OnInit {
  @Input() authFormType: string = "signUp";
  formSignUp: FormGroup;
  formSignIn: FormGroup;

  constructor(private authService: AuthService, formBuilder: FormBuilder) {
    this.formSignUp = formBuilder.group({
      personalInfo: formBuilder.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
      }),
      contacts: formBuilder.group({
        email: [
          "",
          Validators.compose([Validators.required, Validators.email]),
        ],
      }),
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
    });

    this.formSignIn = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required],
    });
  }

  signUp(): void {
    this.authService.signUp(this.formSignUp.value);
  }

  signIn(): void {
    this.authService.signIn(this.formSignIn.value);
  }

  ngOnInit(): void {}
}
