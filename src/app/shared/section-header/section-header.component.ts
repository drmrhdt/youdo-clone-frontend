import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  OnDestroy,
} from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "src/services/categories.service";
import { ICategory } from "src/models/ICategory.model";

@Component({
  selector: "app-section-header",
  templateUrl: "./section-header.component.html",
  styleUrls: ["./section-header.component.scss"],
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = this.route.snapshot.paramMap.get("category");
  @Input() bodyComponent: TemplateRef<any>;

  categories: ICategory[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.categoriesService.categoriesListener$.subscribe(
      (response: ICategory[]) => (this.categories = response)
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setTitle();
      }
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.setTitle();
    });
  }

  ngOnDestroy(): void {}

  setTitle(): void {
    const path = location.pathname.split("/");
    const categoryFromUrl = path[3];

    const findedCategory = this.categories.find(
      (item: ICategory) => item.key === categoryFromUrl
    );

    this.title = findedCategory ? findedCategory.text : "Все категории";
  }
}
