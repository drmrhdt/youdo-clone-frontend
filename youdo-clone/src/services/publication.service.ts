import { Injectable } from "@angular/core";
import { Application } from "../models/Application.model";

@Injectable({
  providedIn: "root"
})
export class PublicationService {
  applications: Application[] = [];

  constructor() {}
}
