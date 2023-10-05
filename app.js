const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  loadProducts = async () => {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts = async (products) => {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }

  addProduct = async (product) => {
    let products = await this.loadProducts();

    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    product.id = lastId + 1;

    products.push(product);
    await this.saveProducts(products);
  }

  getProducts = async () => {
    return await this.loadProducts();
  }

  getProductById = async (id) => {
    const products = await this.loadProducts();
    const product = products.find((p) => p.id === id);
    return product || null;
  }

  updateProduct = async (id, modifications) => {
    let products = await this.loadProducts();

    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...modifications };
      await this.saveProducts(products);
      return products[index];
    } else {
      return "Producto no encontrado";
    }
  }

  deleteProduct = async (id) => {
    let products = await this.loadProducts();

    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await this.saveProducts(products);
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
