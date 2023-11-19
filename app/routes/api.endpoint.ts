import express from 'express';
import { register } from '../controllers/user.controller';
import { add_project, view_project } from '../controllers/project.controller';
import { validateUserInput } from '../middlewares/register.validation';
import { validateProjectInput } from '../middlewares/project.validation';
const router = express.Router();

router.post('/register', validateUserInput, register);
router.post('/project', validateProjectInput, add_project);
router.get('/project', view_project)
export default router;
