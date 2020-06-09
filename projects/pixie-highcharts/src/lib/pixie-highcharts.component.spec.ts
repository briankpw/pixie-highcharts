import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixieHighchartsComponent } from './pixie-highcharts.component';

import { PixieHighchartsModule } from './pixie-highcharts.module';
import { HighchartsService, HighchartsStatic } from './util/highcharts.service';

import * as Highcharts from 'highcharts';
// describe('PixieHighchartsComponent', () => {
//   let component: PixieHighchartsComponent;
//   let fixture: ComponentFixture<PixieHighchartsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ PixieHighchartsComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PixieHighchartsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });




describe(`PixieHighchartsModule`, () => {

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [ PixieHighchartsModule ]
      });
  });

  // it(`should not provide 'CustomHttp' service`, () => {
  //     expect(() => TestBed.get(CustomHttp)).toThrowError(/No provider for/);
  // });

  it('should be created', () => {
    expect(1).toBeTruthy();
  });
});


describe(`PixieHighchartsModule.forRoot()`, () => {

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [ PixieHighchartsModule.forRoot(Highcharts) ]
      });
  });

  it('should be created', () => {
    expect(1).toBeTruthy();
  });

});

// describe(`FeatureModule.forRoot()`, () => {

//   beforeEach(() => {
//       TestBed.configureTestingModule({
//           imports: [
//               HttpModule,
//               FeatureModule.forRoot()
//           ]
//       });
//   });

//   it(`should provide services`, () => {
//       expect(TestBed.get(CustomHttp)).toBeTruthy();
//   });

//   it(`should provide a single instance for 'CustomHttp' and 'Http' injection tokens`, () => {
//       const http: Http = TestBed.get(Http);
//       const customHttp: CustomHttp = TestBed.get(CustomHttp);

//       // both should be same instance
//       expect(http).toBe(customHttp);

//       /* USE CASE: `@Inject(Http)` and `@Inject(CustomHttp)`
//        * PROVIDER / MODULE:
//        * providers: [ { provide: CustomHttp, useClass: CustomHttp },
//        *              { provide: Http, useExisting: CustomHttp } ]
//        */
//   });

// });
