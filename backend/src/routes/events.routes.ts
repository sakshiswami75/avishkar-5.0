import { Router } from 'express';
import { registerController, getRegistrationsController, deleteRegistrationController, exportRegistrationsController, getEventsSummaryController } from '../controllers/events.controller';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/:eventId/register', registerController);
router.get('/all/summary', requireAdmin, getEventsSummaryController);
router.get('/:eventId/registrations', requireAdmin, getRegistrationsController);
router.get('/:eventId/registrations/export', requireAdmin, exportRegistrationsController);
router.delete('/registrations/:id', requireAdmin, deleteRegistrationController);

export default router;
