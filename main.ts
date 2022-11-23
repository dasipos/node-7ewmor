import { mainMenu } from './screens';
import { TaskStorage } from './task-storage';

const taskStorage: TaskStorage = new TaskStorage();

async function main() {
  while (true) {
    await loop();
  }
}

async function loop() {
  try {
    await mainMenu(taskStorage);
  } catch (ex) {
    if (ex instanceof Error) {
      console.log(ex.message);
    }
  }
}

main();
