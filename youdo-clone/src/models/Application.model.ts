export interface Application {
  description: string;
  category: string;
  subcategory: string;
  comment: string;
  time: string; // string or number ?
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  address?: string;
  isBusiness: boolean;
  budget: number;
  fullName: string;
  tel: string;
  email: string;
  isSubscribeSuggestions: boolean;
  isShowOnlyToExecutors: boolean;
}
