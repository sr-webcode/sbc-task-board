import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { API_URI } from '@/config/api';
import { TFilterValue, TFilterOrder, ITaskItem } from '@/types/task';

interface TasksState {
	tasks: ITaskItem[];
	loading: boolean;
	error: any;
	searchTerm: string | null;
	sortFilter: {
		value: TFilterValue;
		order: TFilterOrder;
	};
}

const initialState: TasksState = {
	tasks: [],
	loading: false,
	error: null,
	searchTerm: null,
	sortFilter: {
		value: 'title',
		order: 'up'
	}
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	try {
		const response = await fetch(`${API_URI}/tasks`);
		if (!response.ok) {
			throw new Error('Failed to fetch tasks');
		}
		const data = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(error?.message || 'Error occurred');
	}
});

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addNewItem: (state, action: PayloadAction<ITaskItem>) => {
			const newItem = action.payload;
			state.tasks = [newItem, ...state.tasks];
		},
		deleteItem: (state, action: PayloadAction<{ _id: string }>) => {
			const deleteRefId = action.payload._id;
			state.tasks = state.tasks.filter(({ _id }) => _id !== deleteRefId);
		},
		udpateItem: (state, action: PayloadAction<ITaskItem>) => {
			const updateRefID = action.payload._id;
			state.tasks = state.tasks.map((record) =>
				record._id === updateRefID ? { ...record, ...action.payload } : record
			);
		},
		searchTask: (state, action: PayloadAction<TasksState['searchTerm']>) => {
			state.searchTerm = action.payload;
		},
		changeFilterValue: (state, action: PayloadAction<TFilterValue>) => {
			state.sortFilter.value = action.payload;
		},
		changeFilterOrder: (state, action: PayloadAction<TFilterOrder>) => {
			state.sortFilter.order = action.payload;
			const isAscendingOrder = action.payload === 'up';
			const sortFilterValue = state.sortFilter.value;
			if (!sortFilterValue) return;
			state.tasks = state.tasks.sort((a, b) => {
				if (sortFilterValue !== 'progress') {
					const sortItemA = a[sortFilterValue].toLowerCase();
					const sortItemB = b[sortFilterValue].toLowerCase();
					return isAscendingOrder
						? sortItemA.localeCompare(sortItemB)
						: sortItemB.localeCompare(sortItemA);
				} else {
					// could be any number value (for now progress only)
					return isAscendingOrder
						? a[sortFilterValue] - b[sortFilterValue]
						: b[sortFilterValue] - a[sortFilterValue];
				}
			});
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error occurred';
			});
	}
});

export const {
	changeFilterOrder,
	changeFilterValue,
	addNewItem,
	deleteItem,
	udpateItem,
	searchTask
} = taskSlice.actions;

export default taskSlice.reducer;
