import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentRouter = Router();

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    // startOfHour esta zerando os minutos e segundos
    // e o parseISO esta convertendo para o tipo data
    const parsedDate = startOfHour(parseISO(date));
    const findAppointmenstInSameDate = appointments.find(appointment =>
        isEqual(appointment.date, parsedDate),
    );
    if (findAppointmenstInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked ' });
    }

    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);
    return response.json(appointment);
});

export default appointmentRouter;
