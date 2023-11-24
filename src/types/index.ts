export type Items = Record<string, Task[]>;
export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  color?: string;
}
export interface TColumn {
  name: string;
  color: string;
}
export type ItemField = Exclude<keyof Task, "id">;

export interface TBoardData {
  boardName: string;
  isFavorite: boolean;
  columns: TColumn[];
  array: Task[];
}
