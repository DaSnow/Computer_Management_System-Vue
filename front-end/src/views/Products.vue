<template>
    <div>
        <FormInp :fields="fields" :page="'Product'" @new-handler="addProduct" />
        <Tbl :columns="cols" :rows="products" @modal-handler="openModal" @delete-handler="deleteProduct" />

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Product Info</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="none">
                            <h1>Name</h1>
                            <input class="form-control" type="text" v-model="edit.Name">
                            <p></p>
                            <h1>Units</h1>
                            <input class="form-control" type="text" v-model="edit.Unit">
                            <p></p>
                            <h1>Price per Unit</h1>
                            <input class="form-control" type="number" v-model="edit.Price">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import FormInp from '@/components/FormDisplay.vue';
    import Tbl from '@/components/TableDisplay.vue';

    const baseURL = 'http://localhost:3000/products/';

    var modal;

    const fields = ref([
        {
            Title: "Name",
            Name: "Name",
            Type: "text"
        },
        {
            Title: "Units",
            Name: "Unit",
            Type: "number"
        },
        {
            Title: "Price per Unit",
            Name: "Price",
            Type: "number"
        }
    ]);

    const cols = ref([
        "Category ID",
        "Name",
        "Units",
        "Price per Unit",
        "Actions"
    ]);

    const products = ref([]);

    const editID = ref(0);

    const edit = reactive({
        Name: '',
        Unit: Math.round(0),
        Price: (0).toFixed(2)
    });

    function openModal(d) {
        editID.value = d.ProductID;
        edit.Name = d.Name;
        edit.Unit = d.Unit;
        edit.Price = d.Price;
        modal.show();
    }

    function getAll() {
        $.ajax({
            type: 'GET',
            url: baseURL,
            success: (data, status) => {
                if (status === 'success')
                    products.value = JSON.parse(data);
            }
        });
    }

    function addProduct(item) {
        $.ajax({
            type: 'POST',
            data: item,
            url: baseURL + 'add',
            success: (data, status) => {
                if (status === 'success') {
                    getAll();
                    swal({
                        title: "Well Done!",
                        icon: 'success'
                    });
                }
            }
        });
    }

    function updateProduct() {
        $.ajax({
            type: 'PUT',
            data: edit,
            url: baseURL + `update/${editID.value}`,
            success: (data, status) => {
                if (status === 'success') {
                    getAll();
                    modal.hide();
                }
            }
        });
    }

    function deleteProduct(row) {
        let id = row.ProductID;
        $.ajax({
            type: 'DELETE',
            url: baseURL + `delete/${id}`,
            success: (data, status) => {
                if (status === 'success')
                    getAll();
            }
        });
    }

    onMounted(() => {
        getAll();
        modal = new bootstrap.Modal($('#editModal'));
    });
</script>