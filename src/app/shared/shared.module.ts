import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import {
    LayoutComponent,
    VerificationBannerComponent,
    ButtonComponent,
    CategoriesListComponent,
    SectionHeaderComponent,
    ModalComponent
} from '.'

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        LayoutComponent,
        VerificationBannerComponent,
        ButtonComponent,
        CategoriesListComponent,
        SectionHeaderComponent,
        ModalComponent
    ],
    exports: [
        LayoutComponent,
        VerificationBannerComponent,
        ButtonComponent,
        CategoriesListComponent,
        SectionHeaderComponent,
        ModalComponent
    ]
})
export class SharedModule {}
