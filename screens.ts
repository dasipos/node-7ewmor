import { TaskStorage } from './task-storage';
import { consolePrompt } from './util';

/*
 * Obrazovky:
 * Přehled úkolů v úkolníčku s možností přidání nového úkolu,
 * Obrazovka přidání nového úkolu,
 * Obrazovka detailu úkolu, která by měla umět úkol označit za hotový/rozpracovaný, nebo ho smazat.
 */

export async function mainMenu(taskStorage: TaskStorage) {
  console.clear();
  console.log('Prehľad úloh:');

  for (let task of taskStorage.getAllTasks()) {
    console.log(
      task.complete ? '[X]' : '[_]' + task.name + ' (' + task.id + ')'
    );
  }

  console.log(`0 ... Vytvor novú
x ... Detail úlohy s číslom x`);

  const input: string = await consolePrompt();
  const selectedNumber = parseInt(input);

  if (!isNaN(selectedNumber)) {
    if (input === '0') {
      await createTaskScreen(taskStorage);
    } else {
      await taskDetailScreen(taskStorage, selectedNumber);
    }
  } else {
    console.log('Neplatna volba');
    await mainMenu(taskStorage);
  }
}

export async function createTaskScreen(taskStorage: TaskStorage) {
  console.clear();
  console.log('Vytvárame nový task...');
  console.log('Názov nového tasku: ');

  const input: string = await consolePrompt();

  taskStorage.createNew(input);

  await mainMenu(taskStorage);
}

export async function taskDetailScreen(
  taskStorage: TaskStorage,
  taskId: number
) {
  console.clear();
  const task = taskStorage.getTaskById(taskId);

  console.log('Názov tasku: ' + task.name);
  console.log('Ukončený?: ' + task.complete);

  console.log('---');

  console.log(`H ... označiť za hotový
  N ... označiť za nehotový
  Z ... zmazať
  S ... späť`);

  const input: string = await consolePrompt();

  if (input === 'H') {
    taskStorage.changeState(taskId, true);
  } else if (input === 'N') {
    taskStorage.changeState(taskId, false);
  } else if (input == 'Z') {
    taskStorage.deleteTaskById(taskId);
  } else if (input == 'S') {
    await mainMenu(taskStorage);
  }
}
