import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { CategoriesService } from "../../services/categories.service";
import { TaskPreview } from "../../models/TaskPreview.model";
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

  tasksPreviews: TaskPreview[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this.taskService.getTasksPreviewList().subscribe(response => {
      this.tasksPreviews = response.tasksPreview;
    });

    this.categories = this.categoriesService.categories;
  }
}
