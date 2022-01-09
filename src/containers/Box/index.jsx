import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Container, Stack } from "react-bootstrap";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Task from "../../components/Task";
import TodoFooter from "../../components/TodoFooter";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { setInputVal, setTasksData, deleteTask, deleteTaskAll } from "./actions";

import { createStructuredSelector } from "reselect";
import { makeSelectInputVal, makeSelectTasksData } from './selector'


const todoState = createStructuredSelector({
  inputVal: makeSelectInputVal(),
  tasksData: makeSelectTasksData(),
});

const Box = () => {
  const dispatch = useDispatch();
  const {inputVal,tasksData} = useSelector(todoState);

  const handleChange = (e) => {
    dispatch(setInputVal(e.target.value));
  };

  const handleClick = (from,index)=>{
    switch(from) {
      case 'input':
        if (!inputVal) return;
        dispatch(setTasksData(inputVal));
        console.log("add")
        break;
      case 'clear-task':
        dispatch(deleteTask(index));
        break;
      case 'clear-all':
        dispatch(deleteTaskAll())
        break;
      default:
        break;
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!inputVal) return;
      // setTasks([...tasks, value]);
      // setValue("");
      dispatch(setTasksData(inputVal));
    }
  }

  return (
    <Container className="box bg-light p-4 ">
      <h1>TODO APP</h1>
      <Stack direction="horizontal" className="my-4" gap={3}>
        <CustomInput
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputVal}
        />
        <CustomButton
          className="fs-3 px-3"
          onClick={() =>handleClick('input')}
        >
          <FontAwesomeIcon icon={faPlus} className="fs-2" />
        </CustomButton>
      </Stack>

      <Stack gap={2}>
        {tasksData.map((item, index) => (
          <Task
            key={index}
            content={item}
            onClick={() => handleClick('clear-task',index)}
          />
        ))}
      </Stack>
      <TodoFooter len={tasksData.length} onClick={() =>handleClick('clear-all')} />
    </Container>
  );
};

export default Box;
