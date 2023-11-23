import {Task} from "../models/Task"

export class TaskDataSource {
    private url = "http://localhost:3000/api/task"
    public async GET(): Promise<any> {
        const resp: Response = await fetch(this.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return resp.json()
    }

    public async DELETE(id: number) {
        const resp: Response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return resp.json()
    }

    public async PUT(id: number, data: Partial<Task>) {
        const resp: Response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        return resp.json()
    }

    public async POST(data: Partial<Task>) {
        const resp: Response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        return resp.json()
    }
}