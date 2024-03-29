<template>
    <div v-cloak>
        <form v-if="state" class="bor bg-light" @submit.prevent="newOrder">
            <h1>Select a Customer</h1>
            <select class="form-control" v-model="order.CustomerID">
                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                        item.LastName
                }}</option>
            </select>
            <p></p>
            <h1>Select an Employee</h1>
            <select class="form-control" v-model="order.EmployeeID">
                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                        item.LastName
                }}</option>
            </select>
            <p></p>
            <h1>Select a Category</h1>
            <select class="form-control" v-model="order.CategoryID">
                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                        item.LastName
                }}</option>
            </select>
            <p></p>
            <h1>Select a Product</h1>
            <select class="form-control" v-model="order.ProductID">
                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                        item.LastName
                }}</option>
            </select>
            <p></p>
            <h1>Select a Supplier</h1>
            <select class="form-control" v-model="order.SupplierID">
                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                        item.LastName
                }}</option>
            </select>
            <p></p>
            <h1>Select a Shipper</h1>
            <select class="form-control" v-model="order.ShipperID">
                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                        item.LastName
                }}</option>
            </select>
            <hr>
            <div style="text-align: end;">
                <button class="btn btn-primary">Add Order</button>
            </div>
        </form>

        <Alert v-if="customers.length === 0" :list="'Customers'" :link="'customers'" />
        <Alert v-if="employees.length === 0" :list="'Employees'" :link="'employees'" />
        <Alert v-if="categories.length === 0" :list="'Categories'" :link="'categories'" />
        <Alert v-if="products.length === 0" :list="'Products'" :link="'products'" />
        <Alert v-if="shippers.length == 0" :list="'Shippers'" :link="'shippers'" />
        <Alert v-if="suppliers.length === 0" :list="'Suppliers'" :link="'suppliers'" />

        <Tbl :listName="'Orders'" :columns="cols" :rows="orders" @modal-handler="openModal"
            @delete-handler="deleteOrder" />

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Product Info</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="none">
                            <h1>Customer</h1>
                            <select class="form-control" v-model="edit.CustomerID">
                                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                                        item.LastName
                                }}</option>
                            </select>
                            <p></p>
                            <h1>Employee</h1>
                            <select class="form-control" v-model="edit.EmployeeID">
                                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                                        item.LastName
                                }}</option>
                            </select>
                            <p></p>
                            <h1>Category</h1>
                            <select class="form-control" v-model="edit.CategoryID">
                                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                                        item.LastName
                                }}</option>
                            </select>
                            <p></p>
                            <h1>Product</h1>
                            <select class="form-control" v-model="edit.ProductID">
                                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                                        item.LastName
                                }}</option>
                            </select>
                            <p></p>
                            <h1>Supplier</h1>
                            <select class="form-control" v-model="edit.SupplierID">
                                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                                        item.LastName
                                }}</option>
                            </select>
                            <p></p>
                            <h1>Shipper</h1>
                            <select class="form-control" v-model="edit.ShipperID">
                                <option v-for="(item) in shippers" :value="item.ID">{{ item.Name }} {{
                                        item.LastName
                                }}</option>
                            </select>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateOrder">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUpdated } from 'vue';
import Tbl from '@/components/TableDisplay.vue';
import Alert from '@/components/AlertData.vue';

var modal;

const baseURL = 'http://localhost:3000/';

const cols = ref([
    "Order ID",
    "Customer ID",
    "Employee ID",
    "Category ID",
    "Product ID",
    "Supplier ID",
    "Shipper ID",
    "Actions"
]);

const customers = ref([]);
const employees = ref([]);
const categories = ref([]);
const products = ref([]);
const suppliers = ref([]);
const shippers = ref([]);

const state = ref(true);

const orders = ref([]);

const order = reactive({
    CustomerID: 0,
    EmployeeID: 0,
    CategoryID: 0,
    ProductID: 0,
    SupplierID: 0,
    ShipperID: 0
});

const editID = ref(0);

const edit = reactive({
    CustomerID: 0,
    EmployeeID: 0,
    CategoryID: 0,
    ProductID: 0,
    SupplierID: 0,
    ShipperID: 0
});

function getAll() {
    getAllCustomers();
    getAllEmployees();
    getAllCategories();
    getAllProducts();
    getAllSuppliers();
    getAllShippers();
}

function getAllCustomers() {
    $.ajax({
        url: baseURL + 'customers/',
        type: 'GET',
        success: (data, status) => {
            if (status === 'success') {
                customers.value = JSON.parse(data);
            }
        }
    });
}

function getAllEmployees() {
    $.ajax({
        url: baseURL + 'employees/',
        type: 'GET',
        success: (data, status) => {
            if (status === 'success') {
                employees.value = JSON.parse(data);
            }
        }
    });
}

function getAllCategories() {
    $.ajax({
        url: baseURL + 'categories/',
        type: 'GET',
        success: (data, status) => {
            if (status === 'success') {
                categories.value = JSON.parse(data);
            }
        }
    });
}

function getAllProducts() {
    $.ajax({
        url: baseURL + 'products/',
        type: 'GET',
        success: (data, status) => {
            if (status === 'success') {
                products.value = JSON.parse(data);
            }
        }
    });
}

function getAllSuppliers() {
    $.ajax({
        url: baseURL + 'suppliers/',
        type: 'GET',
        success: (data, status) => {
            if (status === 'success') {
                suppliers.value = JSON.parse(data);
            }
        }
    });
}

function getAllShippers() {
    $.ajax({
        url: baseURL + 'shippers/',
        type: 'GET',
        success: (data, status) => {
            if (status === 'success') {
                shippers.value = JSON.parse(data);
            }
        }
    });
}

function getOrders() {
    $.ajax({
        url: baseURL,
        type: 'GET',
        success: (data, status) => {
            if (status === 'success')
                orders.value = JSON.parse(data);
        }
    });
}

function newOrder() {
    if (order.CustomerID > 0 && order.EmployeeID > 0 && order.CategoryID > 0 &&
        order.ProductID > 0 && order.SupplierID > 0 && order.ShipperID > 0) {
        $.ajax({
            url: baseURL + 'add',
            type: 'POST',
            data: order,
            success: (data, status) => {
                if (status === 'success') {
                    swal({
                        title: "Well Done!",
                        icon: "success"
                    });
                    getOrders();
                }
            }
        });
    } else {
        swal({
            title: 'Hold Up',
            text: "Fill out all fields",
            icon: 'error'
        });
    }
}

function openModal(d) {
    editID.value = d.OrderID;
    edit.CustomerID = d.CustomerID;
    edit.EmployeeID = d.EmployeeID;
    edit.CategoryID = d.CategoryID;
    edit.ProductID = d.ProductID;
    edit.SupplierID = d.SupplierID;
    edit.ShipperID = d.ShipperID;
    modal.show();
}

function updateOrder() {
    if (edit.CustomerID > 0 && edit.EmployeeID > 0 && edit.CategoryID > 0 &&
        edit.ProductID > 0 && edit.SupplierID > 0 && edit.ShipperID > 0) {
        $.ajax({
            type: 'PUT',
            data: edit,
            url: baseURL + `update/${editID.value}`,
            success: (data, status) => {
                if (status === 'success') {
                    getOrders();
                    modal.hide();
                }
            }
        });
    } else {
        swal({
            title: 'Hold Up',
            text: "Fill out all fields",
            icon: 'error'
        });
    }
}

function deleteOrder(row) {
    let id = row.OrderID;
    $.ajax({
        type: 'DELETE',
        url: baseURL + `delete/${id}`,
        success: (data, status) => {
            if (status === 'success')
                getOrders();
        }
    });
}

function checkData() {
    if (customers.value.length == 0 || employees.value.length == 0 || categories.value.length == 0 ||
        products.value.length == 0 || shippers.value.length == 0 || suppliers.value.length == 0) {
        state.value = false;
    } else {
        state.value = true;
    }
}

onMounted(() => {
    modal = new bootstrap.Modal($('#editModal'));
    getAll();
    getOrders();
});

onUpdated(() => {
    checkData();
});
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.bor {
    border: 1px solid black;
    border-radius: 15px;
}
</style>