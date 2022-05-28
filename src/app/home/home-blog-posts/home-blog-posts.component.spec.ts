import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBlogPostsComponent } from './home-blog-posts.component';

xdescribe('HomeBlogPostsComponent', () => {
  let component: HomeBlogPostsComponent;
  let fixture: ComponentFixture<HomeBlogPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBlogPostsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
