import { IUser } from '.'

export interface IPossibleExecutorSuggestion {
    _id: string
    taskId: string
    executorId: IUser
    price: number
    paymentType: string
    commentary: string
}
