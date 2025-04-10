// src/components/GameBoard.tsx
import React from 'react'
import { Tile as TileModel } from '../models/Tile'
import Tile from './Tile'
import './GameBoard.css'

type ActionMode = 'fill' | 'mark';

interface GameBoardProps {
  board: TileModel[][];
  rowHints: number[][];
  colHints: number[][];
  onTileLeftClick: (row: number, col: number) => void;
  onTileRightClick: (row: number, col: number) => void;
  actionMode: ActionMode; // 新增
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  rowHints,
  colHints,
  onTileLeftClick,
  onTileRightClick,
  actionMode
}) => {
  return (
    <div className="board-container">
      {/* 左上角空白 */}
      <div className="blank-corner" />
      {/* 列提示 */}
      <div className="col-hints">
        {colHints.map((colHint, cIndex) => (
          <div key={cIndex} className="col-hint-item">
            {colHint.map((hintNumber, i) => (
              <div key={i}>{hintNumber}</div>
            ))}
          </div>
        ))}
      </div>
      {/* 行提示 */}
      <div className="row-hints">
        {rowHints.map((rowHint, rIndex) => (
          <div key={rIndex} className="row-hint-item">
            {rowHint.join(' ')}
          </div>
        ))}
      </div>
      {/* 棋盘 */}
      <div className="board-grid">
        {board.map((row, rIndex) => (
          <div key={rIndex} className="board-row">
            {row.map(tile => (
              <Tile
                key={`${tile.row}-${tile.col}`}
                tile={tile}
                onLeftClick={onTileLeftClick}
                onRightClick={onTileRightClick}
                actionMode={actionMode}  // 传给 Tile
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameBoard
