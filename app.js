const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = null;
  }

  loadProducts = async () => {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts = async () => {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct = async (product) => {
    await this.loadProducts();

    const lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    product.id = lastId + 1;

    this.products.push(product);
    await this.saveProducts();
  }

  getProducts = async () => {
    await this.loadProducts();
    return this.products;
  }

  getProductById = async (id) => {
    await this.loadProducts();
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  updateProduct = async (id, updatedProduct) => {
    await this.loadProducts();

    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      updatedProduct.id = this.products[index].id;
      this.products[index] = updatedProduct;
      await this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct = async (id) => {
    await this.loadProducts();

    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
