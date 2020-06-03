import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TaskService } from "../../services/task.service";
import { UserService } from "src/services/user.service";
import { ITask } from "../../models/ITask.model";
import { ITasksResponse } from "src/models/ITasksResponse";
import { IUser } from "src/models/IUser.model";
import { CategoriesService } from "src/services/categories.service";
import { ICategory } from "src/models/ICategory.model";

@Component({
  selector: "app-tasks-page",
  templateUrl: "./tasks-page.component.html",
  styleUrls: ["./tasks-page.component.scss"],
})
export class TasksPageComponent implements OnInit, OnDestroy {
  // isLoading: boolean = true;
  tasks: ITask[] = [];
  signedInUserId: string;
  title: string;
  categories: ICategory[] = [];

  get isMyTasks() {
    return this.route.snapshot.url[2].path === "my";
  }

  private _unsubscriber$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private categoriesService: CategoriesService,
    private userService: UserService
  ) {
    // TODO set title for isMyTasks
    // if (this.isMyTasks) {
    //   this.title = "Мои заказы";
    // }
    this.userService.currentUserListener$.subscribe((response: IUser) => {
      if (response) this.signedInUserId = response._id;
      if (this.isMyTasks) {
        // TODO get tasks according to tasks field and category,subcategory in url
        // и раз уж мне тут подписывать на изменения урла, то, видимо, имеет смысл
        // убрать подсписку на изменение урла в section-header, и передавать title
        // отсюда в section-header, тем более, что section header ни за что не отвечает
        // у нужен ли тогда компонент section header? если всё упирается в тот стиль,
        // то можно просто сделать его глобальным
        // this.taskService
        //   .getTasksListByFilter("authorId", this.signedInUserId)
        //   .pipe(takeUntil(this._unsubscriber$))
        //   .subscribe((response: ITasksResponse) => {
        //     this.tasks = response.data.tasks;
        //     this.isLoading = false;
        //   });
      } else {
        // this.taskService
        //   .getTasksList()
        //   .pipe(takeUntil(this._unsubscriber$))
        //   .subscribe((response: ITasksResponse) => {
        //     this.tasks = response.data.tasks;
        //     this.isLoading = false;
        //   });
      }
    });

    this.categoriesService.categoriesListener$
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: ICategory[]) => (this.categories = response));

    this.router.events
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setTitle();
        }
      });

    this.route.params
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((params) => {
        this.taskService
          .getTasksByCategoryAndSubcategory(
            params.category,
            params.subcategory,
            this.signedInUserId
          )
          .pipe(takeUntil(this._unsubscriber$))
          .subscribe((response) => (this.tasks = response.data.tasks));
      });
  }

  ngOnInit(): void {
    this.route.url
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe(() => this.setTitle());
  }

  setTitle(): void {
    if (this.categories) {
      const path = location.pathname.split("/");
      const categoryFromUrl = path[3];

      const findedCategory = this.categories.find(
        (item: ICategory) => item.key === categoryFromUrl
      );

      this.title = findedCategory ? findedCategory.text : "Все категории";
    }
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }
}
