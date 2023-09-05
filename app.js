class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  
  addProduct(product) {
   
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error('Faltan propiedades obligatorias para agregar el producto.');
      return false;
    }


    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      console.error('Ya existe un producto con el mismo código.');
      return false;
    }


    product.id = this.productIdCounter++;
    this.products.push(product);
    return true;
  }


  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log('Producto no encontrado.');
      return null;
    }
    return product;
  }
}

// EJEMPLO DE USO // 

const manager = new ProductManager();

manager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del Producto 1',
  price: 19.99,
  thumbnail: 'imagen1.jpg',
  code: 'P001',
  stock: 10,
});

manager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del Producto 2',
  price: 24.99,
  thumbnail: 'imagen2.jpg',
  code: 'P002',
  stock: 8,
});

const allProducts = manager.getProducts();
console.log('Todos los productos:', allProducts);

const productById = manager.getProductById(1);
console.log('Producto por ID:', productById);
