import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders } from 'ng-mocks';
import { ProjectService } from 'src/app/services/project.service';
import { HomeProjectsComponent } from './home-projects.component';

describe('HomeProjectsComponent', () => {
  let component: HomeProjectsComponent;
  let fixture: ComponentFixture<HomeProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProjectsComponent],
      providers: MockProviders(ProjectService),
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
