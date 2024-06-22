import react from "react";
import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";
import { useState, useEffect } from "react";
import { addTodo, fetchTodos } from "./store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todos);
  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addTodo({ text }));
      setText("");
    }
  };
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div className="App">
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {status === "loading" && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      <TodoList />
    </div>
  );
}

export default App;
