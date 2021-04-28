export class Player {
  private constructor(public readonly symbol: string) {}

  public static create(symbol: 'x' | 'o') {
    return new Player(symbol);
  }

  public static getOppositePlayer(player: Player) {
    return Player.create(player.symbol === 'x' ? 'o' : 'x');
  }
}
