import { Router } from 'express';
import appointmentRouter from './appoitments.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);

export default routes;
