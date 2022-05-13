import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBlogPostComponent } from './home-blog-post.component';

describe('HomeBlogPostComponent', () => {
  let component: HomeBlogPostComponent;
  let fixture: ComponentFixture<HomeBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBlogPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
