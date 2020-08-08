import { IResponseSingle, IPossibleExecutorSuggestion } from 'src/models'

export interface ISuggestionResponse extends IResponseSingle {
    data: {
        suggestion?: IPossibleExecutorSuggestion
        updatedSuggestion?: IPossibleExecutorSuggestion
    }
}
