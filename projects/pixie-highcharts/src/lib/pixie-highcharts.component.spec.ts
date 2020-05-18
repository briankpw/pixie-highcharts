import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixieHighchartsComponent } from './pixie-highcharts.component';

describe('PixieHighchartsComponent', () => {
  let component: PixieHighchartsComponent;
  let fixture: ComponentFixture<PixieHighchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixieHighchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixieHighchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
