import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixieHighChartsComponent } from './pixie-highcharts.component';

describe('PixieHighChartsComponent', () => {
  let component: PixieHighChartsComponent;
  let fixture: ComponentFixture<PixieHighChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixieHighChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixieHighChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
