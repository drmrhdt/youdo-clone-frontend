import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, Observable } from 'rxjs'

import { baseUrl } from 'src/environments'

import { IUsersResponse, IUserResponse } from 'src/models'

@Injectable({
	providedIn: 'root'
})
export class UserService {
	currentUserListener$ = new BehaviorSubject(null)

	constructor(private httpClient: HttpClient) {}

	getCurrentUserInfo(): Observable<IUserResponse> {
		return this.httpClient.get<IUserResponse>(`${baseUrl}/users/me/info`)
	}

	getUserInfoById(id: string) {
		return this.httpClient.get<IUserResponse>(`${baseUrl}/users/${id}`)
	}

	getUsersByFilter(filter: string, value: any): Observable<IUsersResponse> {
		return this.httpClient.get<IUsersResponse>(
			`${baseUrl}/users?${filter}=${value}`
		)
	}

	updateMe(body): Observable<IUserResponse> {
		return this.httpClient.patch<IUserResponse>(
			`${baseUrl}/users/updateMe`,
			body
		)
	}
}
