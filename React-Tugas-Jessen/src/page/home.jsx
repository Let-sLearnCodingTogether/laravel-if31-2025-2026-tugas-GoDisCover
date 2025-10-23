
import { useCallback, useEffect, useState } from "react"
import http from "../api/apiClient";
import { NavLink, useNavigate } from "react-router";
import apiClient from "../api/apiClient";
export default function home() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false)
  //membuat state movies
  const [tasks, setTasks] = useState([])
  const handleLogout = useCallback(async() => {
    const response = await http.post("/logout")
    navigate("/", { replace: true });
  },[]);
  const fetchtTask = useCallback(async () => {
    try {
      setLoading(true)
      //mengambil data movie dari endpoint "/movies"
      const response = await http.get("/task")
      console.log(response.data.data)
      setTasks(response.data.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }, [])
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const response = await http.delete(`/task/${id}`);
      if (response.status === 200) {
        fetchtTask();
      }
    } catch (error) {
      console.error("Gagal menghapus Task:", error);
    } finally {
      setLoading(false);
    }
  }
  const status = (status) => {
    if (status === "Finished") {
      return <span className="bg-green-100 p-1.5 rounded-2xl text-green-600 px-3 py-0.5">{status}</span>;
    } else if (status === "On Progress") {
      return <span className="bg-yellow-100 p-1.5 rounded-2xl text-yellow-600 px-3 py-0.5">{status}</span>;
    } else {
      return <span className="bg-red-100 p-1.5 rounded-2xl text-red-600 px-3 py-0.5">{status}</span>;
    }
  }
  useEffect(() => {
    fetchtTask()
  }, [fetchtTask])
  return (
    <div className="container mx-auto space-y-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-2xl">Tasks</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <div className="px-5 py-5">
          <NavLink to="/createTask">
            <button className="rounded-xl border border-gray-400 px-3 py-2 text-gray-500">Create New Task</button>
          </NavLink>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full ">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Title
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Description
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Due Date
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </th>
              <th></th>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tasks.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.description}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.due_date}
                  </td>
                  <td className="px-4 py-3 text-start text-theme-sm dark:text-gray-400">
                    {status(order.status)}
                  </td>
                  <td className="px-4 py-3 text-start text-theme-sm dark:text-gray-400 items-center gap-2 flex">
                    <button onClick={() => deleteTask(order.id)} className="bg-red-100 px-3 py-0.5 rounded-2xl text-red-600 gap-1">
                      Delete
                    </button>
                    <NavLink to={`/EditTask/${order.id}`}>
                      <button className="bg-orange-100 px-3 py-0.5 rounded-2xl text-orange-600">
                        Edit
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}
