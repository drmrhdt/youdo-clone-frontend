import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { baseUrl } from 'src/environments'

import { ITaskResponse, ITasksResponse } from 'src/models'

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(private httpClient: HttpClient) {}

	getTasksByFilter(values?): Observable<ITasksResponse> {
		return this.httpClient.get<ITasksResponse>(`${baseUrl}/tasks`, {
			params: values
		})
	}
	getTaskById(id: string): Observable<ITaskResponse> {
		return this.httpClient.get<ITaskResponse>(`${baseUrl}/tasks/${id}`)
	}

	createTask(formValues) {
		return this.httpClient.post(`${baseUrl}/tasks`, formValues)
	}

	updateTask(id, body): Observable<ITaskResponse> {
		return this.httpClient.patch<ITaskResponse>(`${baseUrl}/tasks`, {
			id,
			body
		})
	}
}
