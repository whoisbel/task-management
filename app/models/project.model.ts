import { Schema, model, Types } from 'mongoose';

interface ICollaborator {
    user: Types.ObjectId;
    role: string;
}

interface IProject {
    project_name: string;
    description: string;
    creator: Types.ObjectId;
    collaborators: ICollaborator[];
}

const projectSchema = new Schema<IProject>({
    project_name: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, required: true },
    }],
});

const Project = model<IProject>('projects', projectSchema);

export { Project, IProject, ICollaborator };
