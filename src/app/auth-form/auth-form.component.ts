import { Component, Input } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { AuthService } from 'src/services'

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
	@Input() authFormType: string = 'signUp'
	formSignUp: FormGroup
	formSignIn: FormGroup

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService
	) {
		this.formSignUp = this._formBuilder.group({
			personalInfo: this._formBuilder.group({
				firstName: ['', Validators.required],
				lastName: ['', Validators.required]
			}),
			contacts: this._formBuilder.group({
				email: ['', Validators.compose([Validators.required, Validators.email])]
			}),
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required]
		})

		this.formSignIn = this._formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		})
	}

	signUp(): void {
		this._authService.signUp(this.formSignUp.value)
	}

	signIn(): void {
		this._authService.signIn(this.formSignIn.value)
	}
}
