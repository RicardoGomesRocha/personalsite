import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders } from 'ng-mocks';
import { ProjectService } from '../services/project.service';
import { IntroComponent } from './intro.component';

xdescribe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroComponent],

      providers: MockProviders(ProjectService),
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
