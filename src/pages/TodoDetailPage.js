import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodoById, updateTodo } from "../api/todosApi";
import TodoForm from "../components/todo/TodoForm";
import { useLoading } from "../contexts/LoadingContext";

function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState("");
  const { setIsLoading } = useLoading(); // 전역 로딩

  useEffect(() => {
    async function load() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetchTodoById(id);
        setTodo(res.data.data);
      } catch (err) {
        console.error("상세 로드 오류:", err);
        setError("상세 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id, setIsLoading]);

  function handleSave(dto) {
    setIsLoading(true);
    updateTodo({ ...dto, id: todo.id, userId: todo.userId })
      .then(() => navigate("/todos"))
      .catch((err) => {
        console.error("저장 오류:", err);
        setError("저장에 실패했습니다.");
      })
      .finally(() => setIsLoading(false));
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!todo) return null; // 데이터 로드 전에는 빈 화면

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      <h2>할 일 상세</h2>
      <TodoForm initial={todo} onSubmit={handleSave} />
      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: 16, padding: "8px 12px" }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default TodoDetailPage;
