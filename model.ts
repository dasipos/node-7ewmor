export interface Task {
  id: number;
  name: string;
  complete: boolean;
}

export interface Task2 {
  id: string;
}

export type TaskTask = Task & Task2;

// const v: TaskTask = { id: 1, complete: true, name: 'a' }; <- chyba: typ id je never (number a string naraz, nikdy sa nestane)
