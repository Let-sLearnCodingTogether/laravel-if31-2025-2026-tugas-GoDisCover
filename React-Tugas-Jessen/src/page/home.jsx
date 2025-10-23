import { useCallback, useEffect, useState } from "react"
import http from "../api/apiClient";
import { NavLink } from "react-router";
export default function home() {
  const [isLoading, setLoading] = useState(false)
  //membuat state movies
  const [tasks, setTasks] = useState([])

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

  useEffect(() => {
    fetchtTask()
  }, [fetchtTask])
  return (
    <div className="container mx-auto space-y-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-2xl">Quotes</h1>
        <div className="px-5 py-5">
          <NavLink to="/createTask">
            <button>Create New Task</button>
          </NavLink>
        </div>
      </div>
      <ul className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-700">
        {tasks.map((item) => (
          <li key={item.id} className="pt-4 p-5 border border-slate-300">
              “{item.title}”
            {item.description && (
              <span className="mt-2 inline-block text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {item.category}
              </span>
            )}
            <div className="flex gap-3 flex-row justify-end">
              <div className="px5 py-2">
                <button onClick={() => deleteQuote(item.id)}>Hapus</button>
              </div>
              <div className="px5 py-2">
                <NavLink to={`/update-quote/${item.id}`}>
                  <button>Update Quote</button>
                </NavLink>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
