import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCustomCategory from "./CreateCustomCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const allToDos = useRecoilValue(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const customCategoryList = useRecoilValue(customCategoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(allToDos));
  }, [allToDos]);
  useEffect(() => {
    localStorage.setItem("CUSTOMCATEGORY", JSON.stringify(customCategoryList));
  }, [customCategoryList]);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategoryList.map((customCategory) => (
          <option key={customCategory.id} value={customCategory.title}>
            {customCategory.title}
          </option>
        ))}
      </select>
      <CreateCustomCategory />
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
