// src/models/Tile.ts
export interface Tile {
  row: number;
  col: number;
  solution: boolean;     // 正确答案：true表示应填黑，false表示应留空
  isUserFilled: boolean; // 是否被玩家涂黑
  isUserMarked: boolean; // 是否被玩家打叉
  isLocked: boolean;     // 是否锁定（误操作后，自动修正并禁止再改）
}
