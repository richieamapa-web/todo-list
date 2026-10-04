import { useState } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (task.trim() === '') return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        done: false,
      },
    ])

    setTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  const clearTasks = () => {
    setTasks([])
  }

  const completedTasks = tasks.filter((item) => item.done).length

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

          <div>
            <p className="text-blue-600 font-semibold text-sm">
              PRODUCTIVITY
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              My Tasks
            </h1>

            <p className="text-slate-500 mt-1">
              Keep track of your daily tasks.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm px-5 py-3">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="text-2xl font-bold text-blue-600">
              {completedTasks} / {tasks.length}
            </p>
          </div>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Add Task Section */}
          <div className="bg-blue-600 p-5 sm:p-6">

            <h2 className="text-white text-xl font-bold mb-3">
              Add a New Task
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    addTask()
                  }
                }}
                placeholder="What do you need to do?"
                className="flex-1 bg-white text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-300"
              />

              <button
                onClick={addTask}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition active:scale-95"
              >
                + Add Task
              </button>

            </div>

          </div>

          {/* Task Section */}
          <div className="p-5 sm:p-7">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Task List
                </h2>

                <p className="text-sm text-slate-500">
                  {tasks.length === 0
                    ? 'No tasks added yet.'
                    : `${tasks.length} task${tasks.length > 1 ? 's' : ''}`}
                </p>
              </div>

              <button
                onClick={clearTasks}
                disabled={tasks.length === 0}
                className="text-sm font-semibold text-red-500 hover:text-red-700 disabled:text-slate-300"
              >
                Clear All
              </button>

            </div>

            {/* Tasks */}
            <div className="space-y-3">

              {tasks.length === 0 ? (

                <div className="border-2 border-dashed border-slate-200 rounded-2xl py-12 text-center">

                  <div className="text-4xl mb-3">
                    ✓
                  </div>

                  <p className="font-semibold text-slate-600">
                    You're all caught up!
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Add a task above to get started.
                  </p>

                </div>

              ) : (

                tasks.map((item) => (

                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition"
                  >

                    <div className="flex items-start gap-3 min-w-0">

                      <div
                        className={`w-3 h-3 rounded-full mt-2 shrink-0 ${
                          item.done
                            ? 'bg-green-500'
                            : 'bg-orange-400'
                        }`}
                      />

                      <div className="min-w-0">

                        <p
                          className={`font-semibold break-words ${
                            item.done
                              ? 'line-through text-slate-400'
                              : 'text-slate-800'
                          }`}
                        >
                          {item.text}
                        </p>

                        <span
                          className={`text-xs font-semibold ${
                            item.done
                              ? 'text-green-600'
                              : 'text-orange-500'
                          }`}
                        >
                          {item.done ? 'DONE' : 'NOT DONE'}
                        </span>

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() => toggleTask(item.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                          item.done
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {item.done ? 'Not Done' : 'Done'}
                      </button>

                      <button
                        onClick={() => deleteTask(item.id)}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 text-sm font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

            {/* User Guide */}
            <div className="mt-8 pt-6 border-t border-slate-200">

              <h2 className="text-lg font-bold text-slate-800 mb-4">
                User Guide
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                <div className="bg-slate-50 rounded-xl p-3">
                  <strong>1. Add Task</strong>
                  <p className="text-slate-500 mt-1">
                    Type your task and click Add Task.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <strong>2. Mark Done</strong>
                  <p className="text-slate-500 mt-1">
                    Click Done when you finish a task.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <strong>3. Mark Not Done</strong>
                  <p className="text-slate-500 mt-1">
                    Click Not Done to change the status back.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <strong>4. Delete</strong>
                  <p className="text-slate-500 mt-1">
                    Click Delete to remove a task.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        <p className="text-center text-sm text-slate-400 mt-5">
          Built with React & Tailwind CSS
        </p>

      </div>

    </div>
  )
}

export default App