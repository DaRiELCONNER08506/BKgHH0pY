// 代码生成时间: 2025-10-30 23:02:51
 * Features:
 *   - Add, update, remove, and list medicines.
 *   - Error handling for invalid operations.
 *   - Maintains code readability and adheres to best practices.
 */

// Mock data to simulate database
const medicineInventory = [];

// Function to add a new medicine to the inventory
function addMedicine(name, quantity) {
  if (typeof name !== 'string' || typeof quantity !== 'number') {
    throw new Error('Invalid input types for medicine name and quantity.');
  }
  // Check if medicine already exists
  const existingMedicine = medicineInventory.find(med => med.name === name);
  if (existingMedicine) {
    throw new Error("Medicine with name '" + name + "' already exists.");
  }
  // Add new medicine to inventory
  medicineInventory.push({ name, quantity });
  console.log(`Added medicine: ${name}, Quantity: ${quantity}`);
}

// Function to update an existing medicine's quantity in the inventory
function updateMedicineQuantity(name, newQuantity) {
  if (typeof name !== 'string' || typeof newQuantity !== 'number') {
    throw new Error('Invalid input types for medicine name and quantity.');
  }
  const medicine = medicineInventory.find(med => med.name === name);
  if (!medicine) {
    throw new Error("Medicine with name '" + name + "' does not exist.");
  }
  // Update the quantity
  medicine.quantity = newQuantity;
  console.log(`Updated medicine: ${name}, New Quantity: ${newQuantity}`);
}

// Function to remove a medicine from the inventory
function removeMedicine(name) {
  if (typeof name !== 'string') {
    throw new Error('Invalid input type for medicine name.');
  }
  const index = medicineInventory.findIndex(med => med.name === name);
  if (index === -1) {
    throw new Error("Medicine with name '" + name + "' does not exist.");
  }
  // Remove the medicine from inventory
  medicineInventory.splice(index, 1);
  console.log(`Removed medicine: ${name}`);
}

// Function to list all medicines in the inventory
function listMedicines() {
  console.log("Medicine Inventory List:", medicineInventory);
}

// Example usage
try {
  addMedicine('Aspirin', 100);
  updateMedicineQuantity('Aspirin', 120);
  listMedicines();
  removeMedicine('Aspirin');
  listMedicines();
} catch (error) {
  console.error(error.message);
}