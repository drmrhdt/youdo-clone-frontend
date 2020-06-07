import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil, flatMap } from "rxjs/operators";
import { TaskService } from "../../services/task.service";
import { UserService } from "src/services/user.service";
import { CategoriesService } from "src/services/categories.service";
import { ITask } from "../../models/ITask.model";
import { ITasksResponse } from "src/models/ITasksResponse";
import { IUser } from "src/models/IUser.model";
import { ICategory } from "src/models/ICategory.model";
import { Filters } from "src/models/enum/Filters";

@Component({
  selector: "app-tasks-page",
  templateUrl: "./tasks-page.component.html",
  styleUrls: ["./tasks-page.component.scss"],
})
export class TasksPageComponent implements OnDestroy {
  isLoading: boolean = true;
  tasks: ITask[] = [];
  signedInUserId: string;
  title: string;
  categories: ICategory[] = [];
  filters = Filters;
  tab: Filters;

  get isMyTasks(): boolean {
    return location.pathname.split("/").includes("tasks-my");
  }

  private _unsubscriber$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private categoriesService: CategoriesService,
    private userService: UserService
  ) {
    this.userService.currentUserListener$
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: IUser) => {
        if (response) this.signedInUserId = response._id;
        this.getTasks(this.route.snapshot.params);
      });

    this.categoriesService.categoriesListener$
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.setTitle();
        this.setInitialTab();
      });

    this.route.params
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((params) => {
        this.getTasks(params);
        this.setTitle();
      });
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }

  getTasks(params): void {
    const filters = this.filterParams(params);
    this.isLoading = true;

    this.taskService
      .getTasksByFilter(filters)
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: ITasksResponse) => {
        this.tasks = response.data.tasks;
        this.isLoading = false;
      });
  }

  filterParams(params): object {
    const filters = this.isMyTasks ? { authorId: this.signedInUserId } : {};
    for (const key in params) {
      if (
        key === "page" ||
        params[key] === null ||
        (key === "category" && params[key] === "all")
      ) {
        continue;
      } else filters[key] = params[key];
    }

    return filters;
  }

  setTitle(): void {
    if (this.categories) {
      const categoryFromUrl = this.route.snapshot.params.category;

      const findedCategory = this.categories.find(
        (item: ICategory) => item.key === categoryFromUrl
      );

      this.title = findedCategory ? findedCategory.text : "Все категории";
    }
  }

  setInitialTab(): void {
    this.tab = this.isMyTasks ? this.filters.Executor : this.filters.Rating;
  }

  onTabClick(filter: Filters): void {
    this.tab = filter;
  }
}
