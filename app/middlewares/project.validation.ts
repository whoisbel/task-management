import { Request, Response, NextFunction } from 'express';
import { db } from '../models';

export async function validateProjectInput(req: Request, res: Response, next: NextFunction) {
    try {
        const { project_name, description } = req.body;
        const Project = db.project

        if (!project_name || !description) {
            return res.status(400).json({ message: 'Project name and description are required' });
        }


        const existingProject = await Project.findOne({ project_name });
        if (existingProject) {
            return res.status(400).json({ message: 'Project with the same name already exists' });
        }

        next();
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
