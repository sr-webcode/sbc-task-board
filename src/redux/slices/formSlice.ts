import {
	isAnyOf,
	createSlice,
	PayloadAction,
	createAsyncThunk
} from '@reduxjs/toolkit';

import { API_URI } from '@/config/api';
import { ITaskItem } from '@/types/task';
import { IFormstate, TModalAction } from '@/types/formModal';
import { addNewItem, deleteItem, udpateItem } from './tasksSlice';

const initialState: IFormstate = {
	error: null,
	isOpen: false,
	loading: false,
	action: null,
	selectorData: null
};

export const addTask = createAsyncThunk(
	'form/addTask',
	async (data: Omit<ITaskItem, '_id'>, thunkAPI) => {
		const formData = JSON.stringify(data);
		try {
			const response = await fetch(`${API_URI}/tasks`, {
				method: 'POST',
				body: formData,
				headers: {
					'Content-type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error('New task creation failed ');
			}
			const responseData = (await response.json()) as ITaskItem;
			thunkAPI.dispatch(addNewItem(responseData));
			thunkAPI.dispatch(toggleModal());
		} catch (error: any) {
			throw new Error(error?.message || 'Error occurred');
		}
	}
);

export const updateTask = createAsyncThunk(
	'form/updateTask',
	async ({ _id, ...data }: ITaskItem, thunkAPI) => {
		const updatedData = JSON.stringify(data);
		try {
			const response = await fetch(`${API_URI}/tasks/${_id}`, {
				method: 'PUT',
				body: updatedData,
				headers: {
					'Content-type': 'application/json'
				}
			});
			if (!response.ok) {
				throw new Error('New task creation failed ');
			}
			const responseData = (await response.json()) as ITaskItem;
			thunkAPI.dispatch(udpateItem({ ...responseData, _id }));
			thunkAPI.dispatch(toggleModal());
		} catch (error: any) {
			throw new Error(error?.message || 'Error occurred');
		}
	}
);

export const deleteTask = createAsyncThunk(
	'form/deleteTask',
	async (_id: string, thunkAPI) => {
		try {
			const response = await fetch(`${API_URI}/tasks/${_id}`, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw new Error('Failed to delete task');
			}
			thunkAPI.dispatch(deleteItem({ _id }));
			thunkAPI.dispatch(toggleModal());
		} catch (error: any) {
			throw new Error(error?.message || 'Error occurred');
		}
	}
);

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		toggleModal: (state, action: PayloadAction<TModalAction>) => {
			const payLoadAction = action.payload?.action;
			state.isOpen = !state.isOpen;
			state.selectorData = null;
			state.action = payLoadAction ?? null;
			switch (payLoadAction) {
				case 'edit':
					state.selectorData = action.payload?.record ?? null;
					break;
				case 'delete':
					const recordId = action.payload?._id;
					state.selectorData = recordId ? { _id: recordId } : null;
					break;
				default:
					break;
			}
		}
	},
	extraReducers(builder) {
		builder
			.addMatcher(
				isAnyOf(deleteTask.pending, addTask.pending, updateTask.pending),
				(state) => {
					state.loading = true;
					state.error = null;
				}
			)
			.addMatcher(
				isAnyOf(deleteTask.fulfilled, addTask.fulfilled, updateTask.fulfilled),
				(state) => {
					state.loading = false;
					state.error = null;
					state.selectorData = null;
				}
			)
			.addMatcher(
				isAnyOf(deleteTask.rejected, addTask.rejected, updateTask.rejected),
				(state, action) => {
					state.loading = false;
					state.error = action.error.message;
					state.selectorData = null;
				}
			);
	}
});

export const { toggleModal } = formSlice.actions;

export default formSlice.reducer;
