import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStatusRedux } from '../../util/enum';
import { IQueryTask, ITaskPending, ITaskRes } from '../../util/interface';

interface ITaskRedux {
  status: EStatusRedux;
  tasks: ITaskRes[];
  tasksPending: ITaskPending[];
  errorMessageCreate: string;
  errorMessage: string;
}
const initialState: ITaskRedux = {
  status: EStatusRedux.idle,
  tasks: [],
  tasksPending: [],
  errorMessageCreate: '',
  errorMessage: '',
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasksPending: (state, _action: PayloadAction<IQueryTask | undefined>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    createTaskPending: (state, _action: PayloadAction<string>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },

    createTasksPending: (state, _action: PayloadAction<string[]>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },

    updateTaskPending: (state, _action: PayloadAction<ITaskRes>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    deleteTaskPending: (state, _action: PayloadAction<string>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },

    getTasksSuccess: (state, action: PayloadAction<ITaskRes[]>) => {
      state.status = EStatusRedux.succeeded;
      state.tasks = action.payload;
    },
    createTaskSuccess: (state, action: PayloadAction<ITaskRes>) => {
      state.status = EStatusRedux.succeeded;
      state.tasks.push(action.payload);
    },
    createTasksSuccess: (state, action: PayloadAction<ITaskRes[]>) => {
      state.status = EStatusRedux.succeeded;
      const tasksName = action.payload.map((e) => e.name);
      state.tasksPending = state.tasksPending.filter(
        (task) => !tasksName.includes(task.name)
      );
      state.tasks = state.tasks.concat(action.payload);
    },

    updateTaskSuccess: (state, action: PayloadAction<ITaskRes>) => {
      state.status = EStatusRedux.succeeded;
      const updateTask = action.payload;
      state.tasks.forEach((task, index) => {
        if (task.id === updateTask.id) {
          state.tasks[index] = updateTask;
        }
      });
    },
    deleteTaskSuccess: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.succeeded;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    getTasksError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    createTaskError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    createTasksError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    updateTaskError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    deleteTaskError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },

    createTemplateTaskDraft: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.succeeded;
      state.errorMessage = '';
      state.tasksPending.push({ name: action.payload, status: 'Draft' });
    },
    updateTemplateTasksDraft: (state, action: PayloadAction<ITaskPending[]>) => {
      state.status = EStatusRedux.succeeded;
      const nameTask = action.payload.map((task) => task.name);
      state.errorMessage = '';
      if (state.tasksPending.length > 0) {
        state.tasksPending.forEach((task) => {
          if (nameTask.includes(task.name)) {
            task.status = 'Ready';
          }
        });
      }
    },
    deleteTemplateTasks: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.succeeded;

      state.errorMessage = '';
      state.tasksPending = state.tasksPending.filter(
        (task) => task.name !== action.payload
      );
    },
    deleteTasksIsOffline: (state) => {
      state.status = EStatusRedux.succeeded;
      state.errorMessage = '';
      state.tasks = [];
    },
  },
});

export const taskAction = taskSlice.actions;

export default taskSlice.reducer;
