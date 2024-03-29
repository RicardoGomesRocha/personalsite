import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogPostViewComponent } from './blog-post-view.component';

xdescribe('BlogPostViewComponent', () => {
  let component: BlogPostViewComponent;
  let fixture: ComponentFixture<BlogPostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogPostViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
