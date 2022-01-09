import { createSelector } from "reselect";

const selectFromTodoState = (globalState) => globalState.todoState;

const makeSelectInputVal = () =>
  createSelector(
    selectFromTodoState,
    (state) => state.inputVal
  );

const makeSelectTasksData = () =>
  createSelector(
    selectFromTodoState,
    (state) => state.tasksData
  );

export { makeSelectInputVal, makeSelectTasksData };