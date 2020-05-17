export interface IPossibleExecutorSuggestion {
  _id: string;
  taskId: string;
  executorId: string;
  price: number;
  paymentType: string;
  commentary: string;
}
