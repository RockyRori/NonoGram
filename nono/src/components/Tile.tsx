// src/components/Tile.tsx
import React, { useRef } from 'react';
import { Tile as TileModel } from '../models/Tile';
import './Tile.css';

interface TileProps {
  tile: TileModel;
  onLeftClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
  actionMode: 'fill' | 'mark';
}

const Tile: React.FC<TileProps> = ({ tile, onLeftClick, onRightClick, actionMode }) => {
  // 用于标记触摸事件是否已经处理过
  const touchHandledRef = useRef(false);
  // 用于记录触摸开始的时间
  let touchStartTime: number | null = null;

  // 处理鼠标点击事件
  const handleClick = (e: React.MouseEvent) => {
    // 如果触摸事件已经处理过，则忽略这个 click
    if (touchHandledRef.current) {
      touchHandledRef.current = false; // 重置标记
      return;
    }
    e.preventDefault();
    if (actionMode === 'fill') {
      onLeftClick(tile.row, tile.col);
    } else {
      onRightClick(tile.row, tile.col);
    }
  };

  // 处理右键点击（PC端）
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick(tile.row, tile.col);
  };

  // 处理触摸开始
  const handleTouchStart = (_: React.TouchEvent) => {
    touchStartTime = Date.now();
  };

  // 处理触摸结束
  const handleTouchEnd = (e: React.TouchEvent) => {
    // 阻止随后的 click 事件
    e.preventDefault();
    touchHandledRef.current = true;
    const duration = Date.now() - (touchStartTime ?? Date.now());
    if (duration >= 500) {
      // 长按：模拟右键操作
      onRightClick(tile.row, tile.col);
    } else {
      // 短按：根据当前模式执行对应操作
      if (actionMode === 'fill') {
        onLeftClick(tile.row, tile.col);
      } else {
        onRightClick(tile.row, tile.col);
      }
    }
    touchStartTime = null;
  };

  // 根据 tile 状态动态生成样式类
  let tileClass = 'tile';
  if (tile.isLocked) tileClass += ' locked';
  if (tile.isUserFilled) tileClass += ' filled';
  if (tile.isUserMarked) tileClass += ' marked';

  return (
    <div
      className={tileClass}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 如果 marked 则显示 X */}
      {tile.isUserMarked && 'X'}
    </div>
  );
};

export default Tile;
