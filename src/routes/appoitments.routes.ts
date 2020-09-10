import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentRouter = Router();

interface IAppointment {
    id: string;
    provider: string;
    date: Date;
}

const appointments: IAppointment[] = [];

appointmentRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));
    const findAppointmenstInSameDate = appointments.find(appointment =>
        isEqual(appointment.date, parsedDate),
    );
    if (findAppointmenstInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked ' });
    }

    const appointment = {
        id: v4(),
        provider,
        date: parsedDate,
    };
    appointments.push(appointment);
    return response.json(appointment);
});

export default appointmentRouter;
