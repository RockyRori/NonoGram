// src/components/Tile.tsx
import React from 'react';
import { Tile as TileModel } from '../models/Tile';
import './Tile.css';


interface TileProps {
  tile: TileModel;
  onLeftClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
  actionMode: 'fill' | 'mark';
}

const Tile: React.FC<TileProps> = ({ tile, onLeftClick, onRightClick, actionMode }) => {
  // PC端 / 移动端单击
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 不管是移动端还是PC(左键)，都看actionMode
    if (actionMode === 'fill') {
      onLeftClick(tile.row, tile.col);
    } else {
      onRightClick(tile.row, tile.col);
    }
  };

  // PC端右键
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // PC端右键 => 强制打叉
    onRightClick(tile.row, tile.col);
  };

  // 动态生成样式
  let tileClass = 'tile';
  if (tile.isLocked) tileClass += ' locked';
  if (tile.isUserFilled) tileClass += ' filled';
  if (tile.isUserMarked) tileClass += ' marked';

  return (
    <div
      className="tile"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {/* 如果 marked 显示 X */}
    </div>
  );
};

export default Tile;
