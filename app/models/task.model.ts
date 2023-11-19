import { Schema, model, Types } from 'mongoose';
import { IUser } from './user.model'; // Assuming you have a user model
import { IProject } from './project.model'; // Assuming you have a project model

interface ITask {
  task_name: string;
  description: string;
  due_date: Date;
  priority: string;
  status: string;
  creator_id: Types.ObjectId | IUser;
  project_id: Types.ObjectId | IProject;
}

const taskSchema = new Schema<ITask>({
  task_name: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  creator_id: { type: Types.ObjectId, ref: 'User', required: true },
  project_id: { type: Types.ObjectId, ref: 'Project', required: true },
});

const Task = model<ITask>('Task', taskSchema);

export { Task };
