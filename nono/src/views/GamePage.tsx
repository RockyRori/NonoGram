// src/views/GamePage.tsx
import React, { useState } from 'react'
import GameBoard from '../components/GameBoard'
import { useGame } from '../hooks/useGame'
import './GamePage.css'

// 动态加载 data 目录下所有 level*.json 文件（eager: true 同步导入）
const levelModules = import.meta.glob('../data/level*.json', { eager: true });

// 解析并生成关卡数组：提取数字后进行数值排序
const levels = Object.entries(levelModules)
  .map(([path, module]) => {
    // 从路径中提取关卡数字，如 "../data/level03.json" 中匹配 "03"
    const match = path.match(/level(\d+)\.json$/);
    const levelNumber = match ? parseInt(match[1], 10) : 0;
    return {
      id: `level${String(levelNumber).padStart(2, '0')}`,  // 格式化为两位数，比如 "level01"
      name: `关卡 ${levelNumber}`,
      data: (module as any).default || module,
      levelNumber  // 可选字段，用于排序或后续使用
    }
  })
  .sort((a, b) => a.levelNumber - b.levelNumber);


type ActionMode = 'fill' | 'mark';

const GamePage: React.FC = () => {
  // 当前选中关卡
  const [currentLevel, setCurrentLevel] = useState(levels[0].data);

  // 新增一个 actionMode 用来切换“填黑 / 打叉”模式（针对移动端）
  const [actionMode, setActionMode] = useState<ActionMode>('fill');

  // 切换模式的函数
  const toggleActionMode = () => {
    setActionMode(prev => (prev === 'fill' ? 'mark' : 'fill'));
  };

  // 关卡变化
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const newLevel = levels.find(level => level.id === selectedId);
    if (newLevel) {
      setCurrentLevel(newLevel.data);
    }
  };

  // 使用自定义 Hook 管理游戏状态
  const {
    board,
    rowHints,
    colHints,
    hearts,
    isSolved,
    isGameOver,
    handleTileLeftClick,
    handleTileRightClick,
    resetBoard
  } = useGame(currentLevel);

  return (
    <div className="game-page">
      {/* 关卡选择 */}
      <div className="level-selector">
        <label htmlFor="levelSelect">选择关卡：</label>
        <select id="levelSelect" onChange={handleLevelChange}>
          {levels.map(level => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </div>

      {/* 模式切换（只对移动端点击有意义，PC可继续左/右键） */}
      <div className="mode-toggle">
        <span>当前模式：{actionMode === 'fill' ? '填色' : '打叉'}</span>
        <button onClick={toggleActionMode} style={{ marginLeft: 10 }}>
          切换模式
        </button>
        <div>电脑用鼠标左右键，手机用切换模式</div>
      </div>

      {/* 爱心/生命信息 */}
      <div className="life-info">
        <span>爱心： </span>
        {Array.from({ length: hearts }, (_, i) => (
          <span key={i} className="heart">❤️</span>
        ))}<button className="controls" onClick={resetBoard}>重开本关</button>
      </div>

      {/* 传入 GameBoard 时，一并将 actionMode 传下去 */}
      <GameBoard
        board={board}
        rowHints={rowHints}
        colHints={colHints}
        onTileLeftClick={handleTileLeftClick}
        onTileRightClick={handleTileRightClick}
        actionMode={actionMode}
      />

      {isSolved && <div className="message success">恭喜你，解答正确！</div>}
      {isGameOver && !isSolved && <div className="message fail">很遗憾，游戏失败！</div>}
    </div>
  )
}

export default GamePage;
