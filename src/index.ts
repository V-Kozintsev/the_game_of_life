import './index.css';

// Глобальные переменные
let grid: boolean[][];
let intervalId: NodeJS.Timeout | null = null;
let gridSize: number = 20;
let speed: number = 500;

// Функция обновления состояния клетки и рендеринга сетки
const updateCellAndRender = (i: number, j: number): void => {
  grid[i][j] = !grid[i][j]; // Переключаем состояние клетки

  const mainBoxId = document.getElementById('mainBoxId') as HTMLElement;
  mainBoxId.innerHTML = ''; // Очистка предыдущего содержимого

  grid.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'grid-row';

    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement('div');
      cellDiv.className = `grid-cell ${cell ? 'alive' : 'dead'}`;
      cellDiv.addEventListener('click', () => updateCellAndRender(rowIndex, colIndex));
      rowDiv.appendChild(cellDiv);
    });

    mainBoxId.appendChild(rowDiv);
  });
};

// Функция подсчета живых соседей
const countAliveNeighbors = (row: number, col: number): number => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let count = 0;
  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0
      && newRow < grid.length
      && newCol >= 0
      && newCol < grid[newRow].length
    ) {
      count += grid[newRow][newCol] ? 1 : 0;
    }
  });

  return count;
};

// Функция обновления состояния клеток по правилам "Игры жизни"
const updateGrid = (): void => {
  const newGrid = grid.map((arr) => [...arr]);

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const aliveNeighbors = countAliveNeighbors(i, j);
      if (grid[i][j]) {
        // Клетка жива
        newGrid[i][j] = aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        // Клетка мертва
        newGrid[i][j] = aliveNeighbors === 3;
      }
    }
  }

  grid = newGrid;
  updateCellAndRender(0, 0); // Обновим сетку после изменения
};

// Функция инициализации сетки
const initializeGrid = (size: number): void => {
  grid = Array.from({ length: size }, () => Array(size).fill(false));
  updateCellAndRender(0, 0); // Рендерим первоначальное состояние
};

// Функция нажатия на кнопку "Start"
const startGame = (): void => {
  if (intervalId === null) {
    intervalId = setInterval(updateGrid, speed);
  }
};

// Функция нажатия на кнопку "Stop"
const stopGame = (): void => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// Обработчики событий для управления игрой
document.getElementById('startButton')?.addEventListener('click', startGame);
document.getElementById('stopButton')?.addEventListener('click', stopGame);
document.getElementById('gridSize')?.addEventListener('change', (event) => {
  gridSize = parseInt((event.target as HTMLInputElement).value, 10);
  initializeGrid(gridSize);
});
document.getElementById('speed')?.addEventListener('change', (event) => {
  speed = parseInt((event.target as HTMLInputElement).value, 10);
  startGame(); // Перезапускаем игру с новой скоростью, если она была запущена
});

// Начинаем игру с инициализации сетки
initializeGrid(gridSize);
