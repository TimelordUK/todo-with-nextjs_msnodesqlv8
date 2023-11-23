import * as React from "react"
import {useState} from "react"
import styles from "../styles/Home.module.css"
import {Task} from "../models/Task"
import {TaskDataSource} from "../datasource/TaskDataSource"

const taskDataSource = new TaskDataSource()
export default function Home(props: any): (React.ReactElement | null) {
	const [tasks, setTasks] = useState<Array<Task>>(props.tasks);
	const [task, setTask] = useState<Partial<Task>>({ task: "" })

	const handleChange = ({ currentTarget: input }) => {
		input.value === ""
			? setTask({ task: "" })
			: setTask((prev) => ({ ...prev, task: input.value }))
	};

	const addTask = async (e) => {
		e.preventDefault()
		try {
			if (task._id) {
				const data = await taskDataSource.PUT(task._id, task)
				const originalTasks: Task[] = [...tasks]
				const index = originalTasks.findIndex((t: Task) => t._id === task._id)
				originalTasks[index] = data.data
				setTasks(originalTasks);
				setTask({ task: "" })
				console.log(data.message)
			} else {
				const data = await taskDataSource.POST(task)
				setTasks((prev: Task[]) => [...prev, data.data])
				setTask({ task: "" })
				console.log(data.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const editTask = (id: number) => {
		const currentTask: Task[] = tasks.filter((task) => task._id === id)
		setTask(currentTask[0])
	};

	const updateTask = async (id: number) => {
		try {
			const originalTasks = [...tasks];
			const index = originalTasks.findIndex((t) => t._id === id)
			const data = await taskDataSource.PUT(id,  {
				task: originalTasks[index].task,
				completed: !originalTasks[index].completed,
			})
			originalTasks[index] = data.data;
			setTasks(originalTasks)
			console.log(data.message)
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTask = async (id: number) => {
		try {
			const { data } = await taskDataSource.DELETE(id)
			setTasks((prev: Task[]) => prev.filter((task) => task._id !== id))
			console.log(data.message)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>TO-DO</h1>
			<div className={styles.container}>
				<form onSubmit={addTask} className={styles.form_container}>
					<input
						className={styles.input}
						type="text"
						placeholder="Task to be done..."
						onChange={handleChange}
						value={task.task}
					/>
					<button type="submit" className={styles.submit_btn}>
						{task._id ? "Update" : "Add"}
					</button>
				</form>
				{tasks.map((task: Task) => (
					<div className={styles.task_container} key={task._id}>
						<input
							type="checkbox"
							className={styles.check_box}
							checked={task.completed}
							onChange={() => updateTask(task._id)}
						/>
						<p
							className={
								task.completed
									? styles.task_text + " " + styles.line_through
									: styles.task_text
							}
						>
							{task.task}
						</p>
						<button
							onClick={() => editTask(task._id)}
							className={styles.edit_task}
						>
							&#9998;
						</button>
						<button
							onClick={() => deleteTask(task._id)}
							className={styles.remove_task}
						>
							&#10006;
						</button>
					</div>
				))}
				{tasks.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
			</div>
		</main>
	)
}

export const getServerSideProps = async () => {
	const data = await taskDataSource.GET()
	return {
		props: {
			tasks: data.data,
		}
	}
}
