import { IPossibleExecutorSuggestion, IUser } from '.'

export interface ITask {
    _id: any
    description: string
    category: string // do I need it?
    subcategory: string
    comment: string
    executionTime: {
        startDate: number
        endDate: number
    }
    address: string // it will be FormArray
    budget: number
    author: IUser
    executor: IUser
    tel: string
    isBusiness: false
    additionalConditions: {
        isSubscribeSuggestions: false
        isShowOnlyToExecutors: false
    }
    reviews: {
        positive: number
        negative: number
    }
    isSbr: boolean
    createDate: number
    suggestions: IPossibleExecutorSuggestion[]
}
