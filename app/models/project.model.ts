import { Schema, model } from 'mongoose';

interface IProject {
  project_name: string;
  description: string;
}

const projectSchema = new Schema<IProject>({
  project_name: { type: String, required: true },
  description: { type: String, required: true },
});

const Project = model<IProject>('projects', projectSchema);

export { Project, IProject };
