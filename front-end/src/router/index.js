import { createRouter, createWebHistory } from 'vue-router'
import Customers from '@/views/Customers.vue';
import Employees from '@/views/Employees.vue';
import Categories from '@/views/Categories.vue';
import Products from '@/views/Products.vue';
import Suppliers from '@/views/Suppliers.vue';
import Shippers from '@/views/Shippers.vue';
import Orders from '@/views/Orders.vue';

const routes = [
  {
    path: '/',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  { 
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers
  },
  {
    path: '/shippers',
    name: 'Shippers',
    component: Shippers
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router