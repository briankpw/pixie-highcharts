import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureHighstockComponent } from './configure-highstock.component';

describe('ConfigureHighstockComponent', () => {
  let component: ConfigureHighstockComponent;
  let fixture: ComponentFixture<ConfigureHighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureHighstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureHighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
