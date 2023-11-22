export type Items = Record<string, Task[]>;
export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}
export type ItemField = Exclude<keyof Task, "id">;
