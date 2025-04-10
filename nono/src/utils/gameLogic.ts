// src/utils/gameLogic.ts
import { Tile } from '../models/Tile'

/**
 * 定义关卡数据的接口
 */
export interface Level {
  rows: number;
  cols: number;
  // 每行提示：每个数组里的数字表示连续块的长度
  rowHints: number[][];
  // 每列提示
  colHints: number[][];
  // 数独解，二维布尔数组，true 表示该位置需要填充
  solution: boolean[][];
}

/**
 * 根据关卡信息生成初始化棋盘，每个 Tile 初始状态都未填充、未标记
 */
export function generateBoard(level: Level): Tile[][] {
  const board: Tile[][] = [];
  for (let r = 0; r < level.rows; r++) {
    const row: Tile[] = [];
    for (let c = 0; c < level.cols; c++) {
      row.push({
        row: r,
        col: c,
        solution: level.solution[r][c],
        isUserFilled: false,
        isUserMarked: false,
        isLocked: false
      });
    }
    board.push(row);
  }
  return board;
}

/**
 * 根据一行或一列布尔数组（填充状态）计算提示数组
 */
export function calculateLineHints(line: boolean[]): number[] {
  const hints: number[] = [];
  let count = 0;
  for (let cell of line) {
    if (cell) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }
  if (count > 0) {
    hints.push(count);
  }
  // 如果整行都没填，提示数组显示为 [0]
  return hints.length > 0 ? hints : [0];
}

/**
 * 检查玩家当前棋盘是否与关卡提示匹配
 * 如果所有行列的计算提示与关卡提示一致，则认为解答正确
 */
export function validateBoard(board: Tile[][], level: Level): boolean {
  // 检查每一行
  for (let r = 0; r < level.rows; r++) {
    const userLine = board[r].map(tile => tile.isUserFilled);
    const computedHints = calculateLineHints(userLine);
    const expectedHints = level.rowHints[r];
    if (!compareHints(computedHints, expectedHints)) {
      return false;
    }
  }
  // 检查每一列
  for (let c = 0; c < level.cols; c++) {
    const userCol: boolean[] = [];
    for (let r = 0; r < level.rows; r++) {
      userCol.push(board[r][c].isUserFilled);
    }
    const computedHints = calculateLineHints(userCol);
    const expectedHints = level.colHints[c];
    if (!compareHints(computedHints, expectedHints)) {
      return false;
    }
  }
  return true;
}

/**
 * 辅助函数：比较两个提示数组是否一致
 */
function compareHints(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((num, idx) => num === b[idx]);
}

/**
 * 可选：实现其他棋盘生成、路径查找、重排等算法
 * 例如，生成随机关卡、自动求解 Nonogram 等
 */
