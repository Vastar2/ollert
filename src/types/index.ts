export type TItemField = Exclude<keyof TTask, "id">;

export interface TLable {
  name: string;
  color: string;
}

export interface TBoardData {
  boardId: number;
  boardName: string;
  isFavorite: boolean;
  labels: TLable[];
  columns: TColumn[];
}

export interface TColumn {
  name: string;
  color: string;
  priority: number;
  array: TTask[];
}

export interface TTask {
  id: number;
  title: string;
  description: string;
  checklist: { checkId: number; isChecked: boolean; content: string }[];
  labels: TLable[];
  color?: string;
  status?: string;
}

export type TItems = Record<string, TTask[]>;

export interface TBoardsListData {
  boardId: number;
  boardName: string;
  isFavorite: boolean;
}
