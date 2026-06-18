const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const BOOKINGS_FILE = path.join(__dirname, '../data/bookings.json');

// Helper functions
async function readBookingsData() {
  try {
    const data = await fs.readFile(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeBookingsData(data) {
  try {
    await fs.mkdir(path.dirname(BOOKINGS_FILE), { recursive: true });
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing bookings data:', error);
    return false;
  }
}

// GET /api/bookings - Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await readBookingsData();
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  try {
    const bookings = await readBookingsData();

    const {
      equipmentId,
      equipmentName,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      endDate,
      duration,
      totalAmount,
      status,
    } = req.body;

    // ✅ Only 4 required fields now
    if (!equipmentId || !customerName || !customerEmail || !startDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: equipmentId, customerName, customerEmail, startDate'
      });
    }

    const newBooking = {
      id: Date.now().toString(),
      equipmentId,
      equipmentName: equipmentName || "Unknown Equipment", // ✅ optional
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",                  // ✅ optional
      startDate,
      endDate: endDate || startDate,                       // ✅ fallback to startDate
      duration: duration || 1,                             // ✅ optional
      totalAmount: totalAmount || 0,                       // ✅ optional
      status: status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    await writeBookingsData(bookings);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// GET /api/bookings/:id - Get single booking
router.get('/:id', async (req, res) => {
  try {
    const bookings = await readBookingsData();
    const booking = bookings.find(b => b.id === req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// PUT /api/bookings/:id/status - Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const bookings = await readBookingsData();
    const index = bookings.findIndex(b => b.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    bookings[index].status = status;
    bookings[index].updatedAt = new Date().toISOString();

    await writeBookingsData(bookings);

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: bookings[index]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
});

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const bookings = await readBookingsData();
    const index = bookings.findIndex(b => b.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    bookings[index].status = 'cancelled';
    bookings[index].updatedAt = new Date().toISOString();
    await writeBookingsData(bookings);

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: bookings[index]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
});

module.exports = router;