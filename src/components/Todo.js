import React, { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false); // edit, view 템플릿 토글 훅
  const [newName, setNewName] = useState("");

  // Todo edit input값 변경시 해당 값 임시 저장
  function handleChange(e) {
    setNewName(e.target.value);
  }

  // App의 Todo 이름 수정 함수 호출
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  //편집 템플릿
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          {props.name}의 새로운 이름
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          취소
          <span className="visually-hidden">{props.name} 이름 바꾸기</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          저장
          <span className="visually-hidden">{props.name}의 새로운 이름</span>
        </button>
      </div>
    </form>
  );

  // 보기 템플릿
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          편집 <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          삭제 <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  // isEditing 삼항 연산자
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
