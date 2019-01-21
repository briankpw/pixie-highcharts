import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureHighmapsComponent } from './configure-highmaps.component';

describe('ConfigureHighmapsComponent', () => {
  let component: ConfigureHighmapsComponent;
  let fixture: ComponentFixture<ConfigureHighmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureHighmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureHighmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
