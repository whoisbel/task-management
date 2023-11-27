import { db } from "../models";
import { Response, Request } from 'express';


//Where users can create a project.
export async function add_project(req: Request, res: Response) {
    try {
        const user = await db.user.findOne({_id: req.body.userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const project = new db.project({
            project_name: req.body.project_name,
            description: req.body.description,
            creator: user._id,
            collaborators: [{user: user._id, role: 'creator'}]
        });

        await project.save();
        res.status(200).json({ message: 'Added project successfully' });
    } catch (error: any) {
        res.status(403).json({ message: error.message });
    }
}


//Where collaborators check for what projects they are in.
export async function view_project(req: Request, res: Response) {
    try {
        const userId = req.body.userId;

        const projects = await db.project.find({ 'collaborators.user': userId });

        if (projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for the user' });
        }

        res.status(200).json({ projects });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
