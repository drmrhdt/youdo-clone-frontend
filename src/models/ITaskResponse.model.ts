import { ITask, IResponseSingle } from 'src/models'

export interface ITaskResponse extends IResponseSingle {
    data: {
        task?: ITask
        updatedTask?: ITask
    }
}
