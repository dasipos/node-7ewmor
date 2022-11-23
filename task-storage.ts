/* Operace:
 * získání všech úkolů,
 * tvorba úkolu,
 * získání úkolu dle ID,
 * smazání úkolu dle ID,
 * nastavení stavu úkolu dle ID.
 */

import { Task } from './model';

export class TaskStorage {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public createNew(name: string): void {
    let task = {
      id: this.generateId(),
      name: name,
      complete: false,
    };

    this.tasks.push(task);
  }

  public getTaskById(taskId: number): Task {
    let task = this.tasks.find((t) => t.id === taskId);

    if (task) {
      return task;
    } else {
      throw new Error('Task not found');
    }
  }

  public deleteTaskById(taskId: number): void {
    let taskIndex: number = this.tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) return;

    this.tasks.splice(taskIndex, 1);
  }

  public changeState(taskId: number, isComplete: boolean): void {
    this.getTaskById(taskId).complete = isComplete;
  }

  private generateId(): number {
    return Math.max(...this.tasks.map((t) => t.id)) + 1;
  }
}
