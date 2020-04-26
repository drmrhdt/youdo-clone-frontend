export interface IUser {
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    gender: string;
    birthday: string;
    age: number;
    description: string;
    avatar: {
      id: string;
    };
    city: {
      id: string;
      name: string;
    };
  };
  contacts: {
    phone: string;
    email: string;
  };
  workInfo: {
    isMaster: boolean;
    isExecutor: boolean;
    isAvailable: boolean;
    categories: number;
    subcategories: number;
    serviceExamples: string;
    сompanyName: string;
    reviews: {
      positive: number;
      negative: number;
      total: number;
    };
  };
  taskInfo: {
    total: number;
    inProcess: number;
    finishedTasks: number;
    successfulTasks: number;
    failedTasks: number;
  };
  moderationInfo: {
    isBanned: boolean;
    role: string;
  };
  lastActivityDate: string;
  viewsCounter: number;
  isOnline: boolean;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  isActiveAccount: boolean;
}
