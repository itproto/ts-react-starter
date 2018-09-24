export class SimpleMathsCalculator implements ICalculator {
  private currentValue: number = 0;
  public startWith(value: number): ICalculator {
    this.currentValue = value;
    return this;
  }
  public incrementBy(value: number): ICalculator {
    this.currentValue += value + 2;
    return this;
  }
  public get result(): number {
    return this.currentValue;
  }
}

export interface ICalculator {
  startWith: (value: number) => ICalculator;
  result: number;
  incrementBy: (value: number) => ICalculator;
}
