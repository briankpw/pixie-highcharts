import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureComponent } from './configure.component';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PixieHighchartsModule } from '../../../lib/dist';
describe('ConfigureComponent', () => {
  let component: ConfigureComponent;
  let fixture: ComponentFixture<ConfigureComponent>;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [ConfigureComponent],
      imports: [
        RouterTestingModule,
        PixieHighchartsModule.forRoot(
          require('highcharts'),
          require('highcharts/highcharts-more'),
          require('highcharts/modules/boost'),
          require('highcharts/modules/exporting')
        ),
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
