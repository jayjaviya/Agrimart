const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect, admin } = require('../middleware/authMiddleware');

// Generate unique ticket ID
const generateTicketId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const count = await Ticket.countDocuments();
  const sequentialId = (count + 1).toString().padStart(4, '0');
  return `TKT-${year}${month}-${sequentialId}`;
};

// @route   POST /api/tickets
// @desc    Create a new support ticket
// @access  Public (or Private if token is passed)
router.post('/', async (req, res) => {
  try {
    const { name, contactNumber, issueType, orderId, description, userId } = req.body;
    
    if (!name || !contactNumber || !issueType || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const ticketId = await generateTicketId();

    const ticket = new Ticket({
      ticketId,
      name,
      contactNumber,
      issueType,
      orderId,
      description,
      user: userId || null
    });

    const createdTicket = await ticket.save();
    res.status(201).json(createdTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/tickets
// @desc    Get all tickets
// @access  Private/Admin
router.get('/', admin, async (req, res) => {
  try {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/tickets/:id
// @desc    Get ticket by ID
// @access  Private/Admin
router.get('/:id', admin, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/tickets/:id/status
// @desc    Update ticket status
// @access  Private/Admin
router.put('/:id/status', admin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Open', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
      ticket.status = status;
      const updatedTicket = await ticket.save();
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
