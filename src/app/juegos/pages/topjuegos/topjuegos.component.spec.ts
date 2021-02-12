import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopjuegosComponent } from './topjuegos.component';

describe('TopjuegosComponent', () => {
  let component: TopjuegosComponent;
  let fixture: ComponentFixture<TopjuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopjuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopjuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
