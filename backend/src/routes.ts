import { Router } from 'express';
import ClientController from './controllers/ClientController';
import AddressController from './controllers/AddressController';
import ProductController from './controllers/ProductController';
import CategoryController from './controllers/CategoryController';
import OrderController from './controllers/OrderController';

export const router = Router();

router.post('/client', ClientController.createClient);
router.put('/client/:id', ClientController.updateClient);
router.get('/clients', ClientController.getAllClients);
router.get('/client/:phoneNumber', ClientController.getClientByPhoneNumber);

router.post('/address', AddressController.createAddress);
router.get('/addresses', AddressController.getAllAddresses);
router.get('/address/:id', AddressController.getAddressById);
router.put('/address/:id', AddressController.updateAddress);
router.delete('/address/:id', AddressController.deleteAddress);

router.post('/category', CategoryController.createCategory);
router.get('/categories', CategoryController.getAllCategories);
router.get('/category/:id', CategoryController.getCategoryById);

router.post('/product', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);

router.post('/order', OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);