import express from 'express';
import { register } from '../controllers/user.controller';
import { add_project, view_project } from '../controllers/project.controller';
import { validateUserInput } from '../middlewares/register.validation';
import { validateProjectInput } from '../middlewares/project.validation';
import { login } from '../controllers/user.controller';
import { validateLogin } from '../middlewares/login.validation';
import { validateJWT } from '../middlewares/jwt.validation';
const router = express.Router();

router.post('/register', validateUserInput, register);
router.post('/project', validateJWT,validateProjectInput, add_project);
router.get('/project', validateJWT,view_project)
router.post('/login', validateLogin, login)
export default router;
