import { createForm } from './addform';

describe('createForm', () => {
  beforeEach(() => {
    // Очищаем body перед каждым тестом
    document.body.innerHTML = '';
  });

  test('должен создать input, кнопку и div для вывода', () => {
    createForm();

    const input = document.querySelector('input[type="text"]');
    const button = document.querySelector('button');
    const output = document.querySelector('div');

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
    expect(output).not.toBeNull();
  });

  test('должен обновлять вывод при нажатии на кнопку', () => {
    createForm();

    const input = document.querySelector('input[type="text"]');
    const button = document.querySelector('button');
    const output = document.querySelector('div');

    input.value = 'Тестовое сообщение';
    button.click();

    expect(output.innerText).toBe('Вы ввели: Тестовое сообщение');
  });

  test('должен очищать input после нажатия на кнопку', () => {
    createForm();

    const input = document.querySelector('input[type="text"]');
    const button = document.querySelector('button');

    input.value = 'Некоторый текст';
    button.click();

    expect(input.value).toBe('');
  });

  test('должен вызывать click на кнопке при нажатии Enter', () => {
    createForm();

    const input = document.querySelector('input[type="text"]');

    const output = document.querySelector('div');

    input.value = 'Тестовое сообщение';

    // Симулируем нажатие клавиши Enter
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    input.dispatchEvent(event);

    expect(output.innerText).toBe('Вы ввели: Тестовое сообщение');
  });
});
