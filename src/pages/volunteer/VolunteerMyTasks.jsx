import { useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/volunteer.css";

function VolunteerMyTasks() {

  const userId = Number(localStorage.getItem("userId"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await api.get(`/volunteer/mytasks/${userId}`);
    setTasks(res.data);
  };

  const completeTask = async (id) => {
    try {
      await api.post(`/volunteer/complete/${id}`);

      alert("Marked as Done ✅");

      // 🔥 REMOVE COMPLETED TASK FROM UI
      setTasks(prev => prev.filter(t => t.id !== id));

    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="vol-page">
      <div className="vol-card">

        <h2>My Tasks</h2>

        {tasks.length === 0 && <p>No active tasks</p>}

        {tasks.map(t => (
          <div key={t.id} className="task-card">

            <h4>{t.employeeName}</h4>

            <p>Status: {t.status}</p>

            <button onClick={() => completeTask(t.id)}>
              Done
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default VolunteerMyTasks;