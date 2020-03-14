import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { CategoriesService } from "../../services/categories.service";
import { Task } from "../../models/Task.model";
import { Category } from "../../models/Category.model";

@Component({
  selector: "app-tasks-page",
  templateUrl: "./tasks-page.component.html",
  styleUrls: ["./tasks-page.component.scss"]
})
export class TasksPageComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private categoriesService: CategoriesService
  ) {}

  tasks: Task[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this.taskService.getTasksList().subscribe(response => {
      this.tasks = response.data.tasks;
    });

    this.categories = this.categoriesService.categories;
  }
}
