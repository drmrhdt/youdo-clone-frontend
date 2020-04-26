export interface IUser {
    personalInfo: {
      firstName: String,
      middleName: String,
      lastName: String,
      username: String,
      gender: String,
      birthday: String,
      age: Number,
      description: String,
      avatar: {
        id: String,
      },
      city: {
        id: String,
        name: String,
      },
    },
    contacts: {
      phone: String,
      email:  String,
        
    },
    workInfo: {
      isMaster:  Boolean,
      isExecutor: Boolean,
      isAvailable: Boolean,
      categories: Number,
      subcategories: Number,
      serviceExamples: String,
      сompanyName: String,
      reviews: {
        positive: Number,
        negative: Number,
        total: Number,
      },
    },
    taskInfo: {
      total: Number,
      inProcess: Number,
      finishedTasks: Number,
      successfulTasks: Number,
      failedTasks: Number,
    },
    moderationInfo: {
      isBanned: Boolean,
      role: String
      },
    lastActivityDate: String,
    viewsCounter: Number,
    isOnline: Boolean,
    password: String,
    passwordConfirm: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActiveAccount: Boolean
  };