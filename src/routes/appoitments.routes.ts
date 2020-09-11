import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    // startOfHour esta zerando os minutos e segundos
    // e o parseISO esta convertendo para o tipo data
    const parsedDate = startOfHour(parseISO(date));
    const findAppointmenstInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );
    if (findAppointmenstInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked ' });
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appointment);
});

export default appointmentRouter;
