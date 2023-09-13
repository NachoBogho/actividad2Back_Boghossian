const ProductManager = require('./ProductManager'); 


const manager = new ProductManager('productos.json');

manager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del Producto 1',
  price: 19.99,
  thumbnail: 'imagen1.jpg',
  code: 'P001',
  stock: 10,
});


const allProducts = manager.getProducts();
console.log('Todos los productos:', allProducts);


const productById = manager.getProductById(1);
console.log('Producto por ID:', productById);


const updatedProduct = {
  id: 1,
  title: 'Producto Actualizado',
  description: 'Descripción actualizada',
  price: 29.99,
  thumbnail: 'imagen_actualizada.jpg',
  code: 'P001',
  stock: 15,
};
manager.updateProduct(1, updatedProduct);


manager.deleteProduct(1);