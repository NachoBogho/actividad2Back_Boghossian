const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {

      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(product) {

    const lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    product.id = lastId + 1;


    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {

      updatedProduct.id = this.products[index].id;
      this.products[index] = updatedProduct;
      this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {

      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
