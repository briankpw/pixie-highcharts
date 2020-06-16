import { Injectable } from '@angular/core';

@Injectable()
export class HighchartsStatic {}

@Injectable()
export class HighchartsService {
  private _highchartsStatice: HighchartsStatic;

  constructor(highchartsStatic: HighchartsStatic) {
    this._highchartsStatice = highchartsStatic;
  }

  getHighchartsStatic() {
    return this._highchartsStatice;
  }
}
