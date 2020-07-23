import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

import { IUser } from 'src/models'

@Component({
    selector: 'app-executor-preview',
    templateUrl: './executor-preview.component.html',
    styleUrls: ['./executor-preview.component.scss']
})
export class ExecutorPreviewComponent implements OnInit {
    @Input() executor: IUser

    constructor(private _router: Router) {}

    // TODO rewrite with routerLink
    navigateToUserProfile(id: string): void {
        this._router.navigateByUrl(`/profile/${id}`)
    }

    ngOnInit(): void {}
}
