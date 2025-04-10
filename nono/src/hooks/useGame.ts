// src/hooks/useGame.ts
import { useState, useEffect } from 'react'
import { Tile } from '../models/Tile'
import { Level, generateBoard, validateBoard } from '../utils/gameLogic'

interface UseGameReturn {
  board: Tile[][];
  rowHints: number[][];
  colHints: number[][];
  lifePoints: number;    // 剩余点数（6点==3爱心）
  hearts: number;        // 显示用的爱心数
  isSolved: boolean;
  isGameOver: boolean;
  handleTileLeftClick: (row: number, col: number) => void;
  handleTileRightClick: (row: number, col: number) => void;
  resetBoard: () => void;
}

export function useGame(level: Level): UseGameReturn {
  const [board, setBoard] = useState<Tile[][]>(() => generateBoard(level));
  const [lifePoints, setLifePoints] = useState<number>(level.rows < 10 ? level.rows : 10);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const rowHints = level.rowHints;
  const colHints = level.colHints;
  const hearts = Math.ceil(lifePoints / 2);

  // 当关卡数据变化时，自动重置棋盘等状态
  useEffect(() => {
    resetBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const decrementLifePoints = () => {
    setLifePoints(prev => {
      const updated = prev - 1;
      if (updated <= 0) {
        setIsGameOver(true);
        return 0;
      }
      return updated;
    });
  };

  const checkWin = (newBoard: Tile[][]) => {
    if (validateBoard(newBoard, level)) {
      setIsSolved(true);
    }
  };

  const handleTileLeftClick = (row: number, col: number) => {
    if (isSolved || isGameOver) return;
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(rowArr => rowArr.map(tile => ({ ...tile })));
      const tile = newBoard[row][col];
      if (tile.isLocked) return newBoard; // 已锁定不允许操作

      tile.isUserFilled = !tile.isUserFilled;
      tile.isUserMarked = false;
      if (tile.isUserFilled && !tile.solution) {
        decrementLifePoints();
        tile.isLocked = true;
        tile.isUserFilled = tile.solution;
        tile.isUserMarked = !tile.solution;
      }
      checkWin(newBoard);
      return newBoard;
    });
  };

  const handleTileRightClick = (row: number, col: number) => {
    if (isSolved || isGameOver) return;
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(rowArr => rowArr.map(tile => ({ ...tile })));
      const tile = newBoard[row][col];
      if (tile.isLocked) return newBoard;
      tile.isUserMarked = !tile.isUserMarked;
      if (tile.isUserMarked) {
        tile.isUserFilled = false;
      }
      if (tile.isUserMarked && tile.solution) {
        decrementLifePoints();
        tile.isLocked = true;
        tile.isUserFilled = tile.solution;
        tile.isUserMarked = !tile.solution;
      }
      checkWin(newBoard);
      return newBoard;
    });
  };

  const resetBoard = () => {
    setBoard(generateBoard(level));
    setLifePoints(level.rows < 10 ? level.rows : 10);
    setIsSolved(false);
    setIsGameOver(false);
  };

  return {
    board,
    rowHints,
    colHints,
    lifePoints,
    hearts,
    isSolved,
    isGameOver,
    handleTileLeftClick,
    handleTileRightClick,
    resetBoard
  };
}
