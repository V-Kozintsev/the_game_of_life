// src/addform.js

export function createForm() {
  // Создаем input элемент
  const input = document.createElement('input');
  input.type = 'text'; // Устанавливаем тип текстового поля

  // Создаем кнопку
  const button = document.createElement('button');
  button.innerText = 'Отправить'; // Устанавливаем текст на кнопке

  // Создаем элемент для отображения результата
  const output = document.createElement('div');

  // Добавляем обработчик события на кнопку
  button.addEventListener('click', () => {
    const { value } = input;
    output.innerText = `Вы ввели: ${value}`;
    input.value = ''; // Очищаем input после отправки
  });

  // Обработчик события для нажатия клавиши Enter
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      button.click(); // Вызываем событие клика на кнопке
    }
  });

  // Добавляем элементы на страницу
  document.body.appendChild(input);
  document.body.appendChild(button);
  document.body.appendChild(output);
}
