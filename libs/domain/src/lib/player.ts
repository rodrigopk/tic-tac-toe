export class Player {
  private constructor(public readonly symbol: string) {}

  public static create(symbol: 'x' | 'o') {
    return new Player(symbol);
  }
}
