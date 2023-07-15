import { ITaskItem } from './task';

export type TFormAction = 'add' | 'edit' | 'delete' | null;
export type THookFormState = Partial<ITaskItem>;
export type TModalAction =
	| { action: 'add' }
	| { action: 'edit'; record: ITaskItem | null }
	| { action: 'delete'; _id: string | null }
	| undefined;

export interface IFormstate {
	error: any;
	isOpen: boolean;
	loading: boolean;
	action: TFormAction;
	selectorData: THookFormState | Pick<THookFormState, '_id'> | null;
}
