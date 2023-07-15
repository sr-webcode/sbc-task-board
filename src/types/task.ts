export type TStatus = 'to do' | 'in progress' | 'done';
export type TPriority = 'low' | 'high' | 'medium';
export type TFilterValue = keyof Omit<ITaskItem, '_id'> | null;
export type TFilterOrder = 'up' | 'down';

export interface ITaskItem {
	_id: string;
	title: string;
	status: TStatus;
	progress: number;
	priority: TPriority;
}