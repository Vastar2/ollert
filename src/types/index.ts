export type TItemField = Exclude<keyof TTask, "id">;

export interface TBoardData {
  boardId: number;
  boardName: string;
  isFavorite: boolean;
  columns: TColumn[];
  array: TTask[];
}

export interface TTask {
  id: number;
  title: string;
  description: string;
  status: string;
  color?: string;
}
export interface TColumn {
  name: string;
  color: string;
  priority: number;
}

export type TItems = Record<string, TTask[]>;

export interface TBoardsListData {
  boardId: number;
  boardName: string;
  isFavorite: boolean;
}
