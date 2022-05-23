import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockProviders } from 'ng-mocks';
import { ProjectService } from 'src/app/services/project.service';
import { RouteService } from 'src/app/services/route.service';
import { EditProjectComponent } from './edit-project.component';

xdescribe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProjectComponent],
      providers: MockProviders(ProjectService, ActivatedRoute, RouteService),
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
