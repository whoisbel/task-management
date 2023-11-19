import { db } from "../models";
import { Response, Request } from 'express';

export async function add_project(req: Request, res: Response) {
    try {
        const project = new db.project({
            project_name: req.body.project_name,
            description: req.body.description,
        });
        await project.save();
        res.status(200).json({ message: 'Added project successfully' });
    } catch (error: any) {
        res.status(403).json({ message: error.message });
    }
}

export async function view_project(req: Request, res: Response) {
    try {
        const projects = await db.project.find();
        res.status(200).json({ projects });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
