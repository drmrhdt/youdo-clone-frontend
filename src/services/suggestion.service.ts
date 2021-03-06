import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'

import { baseUrl } from 'src/environments'

import { ISuggestionResponse, IPossibleExecutorSuggestion } from 'src/models'

@Injectable({
    providedIn: 'root'
})
export class SuggestionService {
    constructor(private _httpClient: HttpClient) {}

    addNewSuggestion(
        suggestion: IPossibleExecutorSuggestion
    ): Observable<ISuggestionResponse> {
        return this._httpClient.post<ISuggestionResponse>(
            `${baseUrl}/suggestions`,
            {
                suggestion
            }
        )
    }

    updateSuggestion(id: string, body): Observable<ISuggestionResponse> {
        return this._httpClient.patch<ISuggestionResponse>(
            `${baseUrl}/suggestions/${id}`,
            {
                body
            }
        )
    }

    deleteSuggestion(id: string): Observable<ArrayBuffer> {
        return this._httpClient.delete<ArrayBuffer>(
            `${baseUrl}/suggestions/${id}`
        )
    }
}
