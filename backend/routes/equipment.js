const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Simple file-based database for now
const DATA_FILE = path.join(__dirname, '../data/equipment.json');

// Helper function to read data
async function readEquipmentData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write data
async function writeEquipmentData(data) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing equipment data:', error);
    return false;
  }
}

// GET /api/equipment - Get all equipment
router.get('/', async (req, res) => {
  try {
    const equipment = await readEquipmentData();
    const { category, location, priceRange, available } = req.query;
    
    let filteredEquipment = [...equipment];
    
    // Filter by category
    if (category) {
      filteredEquipment = filteredEquipment.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by location
    if (location) {
      filteredEquipment = filteredEquipment.filter(item => 
        item.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by availability
    if (available === 'true') {
      filteredEquipment = filteredEquipment.filter(item => item.available === true);
    }
    
    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filteredEquipment = filteredEquipment.filter(item => 
        item.pricePerDay >= min && item.pricePerDay <= max
      );
    }
    
    res.json({
      success: true,
      count: filteredEquipment.length,
      data: filteredEquipment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching equipment', 
      error: error.message 
    });
  }
});

// GET /api/equipment/:id - Get single equipment
router.get('/:id', async (req, res) => {
  try {
    const equipment = await readEquipmentData();
    const item = equipment.find(eq => eq.id === req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Equipment not found' 
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching equipment', 
      error: error.message 
    });
  }
});

// POST /api/equipment - Add new equipment
router.post('/', async (req, res) => {
  try {
    const equipment = await readEquipmentData();
    const newEquipment = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...req.body
    };
    
    equipment.push(newEquipment);
    await writeEquipmentData(equipment);
    
    res.status(201).json({
      success: true,
      message: 'Equipment added successfully',
      data: newEquipment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error adding equipment', 
      error: error.message 
    });
  }
});

// PUT /api/equipment/:id - Update equipment
router.put('/:id', async (req, res) => {
  try {
    const equipment = await readEquipmentData();
    const index = equipment.findIndex(eq => eq.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Equipment not found' 
      });
    }
    
    equipment[index] = {
      ...equipment[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    await writeEquipmentData(equipment);
    
    res.json({
      success: true,
      message: 'Equipment updated successfully',
      data: equipment[index]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating equipment', 
      error: error.message 
    });
  }
});

// DELETE /api/equipment/:id - Delete equipment
router.delete('/:id', async (req, res) => {
  try {
    const equipment = await readEquipmentData();
    const index = equipment.findIndex(eq => eq.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Equipment not found' 
      });
    }
    
    equipment.splice(index, 1);
    await writeEquipmentData(equipment);
    
    res.json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting equipment', 
      error: error.message 
    });
  }
});

// GET /api/equipment/categories/list - Get equipment categories
router.get('/categories/list', async (req, res) => {
  try {
    const equipment = await readEquipmentData();
    const categories = [...new Set(equipment.map(item => item.category))];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching categories', 
      error: error.message 
    });
  }
});

module.exports = router;
