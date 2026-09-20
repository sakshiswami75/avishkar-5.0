import { Request, Response } from 'express';
import prisma from '../config/db';

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, eventId, eventName, college, participants } = req.body;

    if (!eventId || !eventName || !college || !participants || participants.length === 0) {
      res.status(400).json({ success: false, message: 'Invalid data: Missing required fields' });
      return;
    }

    const registration = await prisma.registration.create({
      data: {
        id: id || `AVK-${Date.now().toString().slice(-6)}`,
        eventId,
        eventName,
        college,
        participants: {
          create: participants.map((p: any) => ({
            name: p.name,
            mobile: p.mobile,
            standard: p.standard,
          })),
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      registrationId: registration.id,
      registration,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

export const getRegistrationsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId as string;
    let registrations;
    if (eventId === 'all') {
      registrations = await prisma.registration.findMany({
        include: { participants: true },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      registrations = await prisma.registration.findMany({
        where: { eventId },
        include: { participants: true },
        orderBy: { createdAt: 'desc' }
      });
    }

    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching registrations' });
  }
};

export const deleteRegistrationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.registration.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting registration' });
  }
};

export const getEventsSummaryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const summary = await prisma.registration.groupBy({
      by: ['eventId', 'eventName'],
      _count: { id: true },
      orderBy: { eventId: 'asc' }
    });
    const formatted = summary.map(item => ({
      eventId: item.eventId,
      eventName: item.eventName,
      count: item._count.id
    }));
    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching summary' });
  }
};
export const exportRegistrationsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.eventId as string;
    const registrations = await prisma.registration.findMany({
      where: { eventId },
      include: { participants: true },
      orderBy: { createdAt: 'desc' }
    });

    const rows = [['Registration ID', 'Event', 'College', 'Participant', 'Mobile', 'Standard', 'Registered At']];
    
    registrations.forEach(r => {
      r.participants.forEach(p => {
        rows.push([r.id, r.eventName, r.college, p.name, p.mobile, p.standard, r.createdAt.toISOString()]);
      });
    });

    const csvContent = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${registrations[0]?.eventName || eventId}_Registrations.csv"`);
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ success: false, message: 'Server error exporting registrations' });
  }
};
