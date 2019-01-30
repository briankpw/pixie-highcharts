import { Injectable } from '@angular/core';

@Injectable()
export class HighchartsStatic {}

@Injectable()
export class HighchartsService {
  private highchartsStatice: HighchartsStatic;

  constructor(highchartsStatic: HighchartsStatic) {
    this.highchartsStatice = highchartsStatic;
  }

  getHighchartsStatic() {
    return this.highchartsStatice;
  }
}
