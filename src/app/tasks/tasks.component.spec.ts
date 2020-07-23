import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterModule } from '@angular/router'
import { TasksComponent } from './tasks.component'

describe('TasksComponent', () => {
    let component: TasksComponent
    let fixture: ComponentFixture<TasksComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TasksComponent],
            imports: [HttpClientTestingModule, RouterModule.forRoot([])]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
