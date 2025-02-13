export interface ICreateTaskRequest {
  userId: number;
  title: string;
  description: string;
}

export interface IUpdateTaskRequest {
  title: string;
  description: string;
}
