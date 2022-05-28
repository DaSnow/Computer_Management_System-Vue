<template>
    <div>
        <FormInp :fields="fields" :page="'Supplier'" @new-handler="addSupplier" />
        <Tbl :listName="'Supplier'" :columns="cols" :rows="suppliers" @modal-handler="openModal" @delete-handler="deleteSupplier" />
        
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Supplier Info</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="none">
                            <h1>Name</h1>
                            <input class="form-control" type="text" v-model="edit.Name">
                            <p></p>
                            <h1>Address</h1>
                            <input class="form-control" type="text" v-model="edit.Address">
                            <p></p>
                            <h1>City</h1>
                            <input class="form-control" type="text" v-model="edit.City">
                            <p></p>
                            <h1>ZIP Code</h1>
                            <input class="form-control" type="number" maxlength="5" v-model="edit.ZIP">
                            <p></p>
                            <h1>Country</h1>
                            <input class="form-control" type="text" v-model="edit.Country">
                            <p></p>
                            <h1>Phone</h1>
                            <input class="form-control" type="text" v-model="edit.Phone">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateSupplier">Save changes</button>
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

    let baseURL = 'http://localhost:3000/suppliers/';

    var modal = null;

    const fields = ref([
        {
            Title: "Name",
            Name: "Name",
            Type: "text",
        },
        {
            Title: "Address",
            Name: "Address",
            Type: "text",
        },
        {
            Title: "City",
            Name: "City",
            Type: "text",
        },
        {
            Title: "ZIP Code",
            Name: "ZIP",
            Type: "number",
        },
        {
            Title: "Country",
            Name: "Country",
            Type: "text",
        },
        {
            Title: "Phone",
            Name: "Phone",
            Type: "tel",
        }
    ]);

    const cols = ref([
        "Supplier ID",
        "Name",
        "Address",
        "City",
        "ZIP Code",
        "Country",
        "Phone",
        "Actions"
    ]);

    const suppliers = ref([]);

    const editID = ref(0);

    const edit = reactive({
        Name: '',
        Address: '',
        City: '',
        ZIP: 0,
        Country: '',
        Phone: ''
    });

    function openModal(d) {
        editID.value = d.SupplierID;
        edit.Name = d.Name;
        edit.City = d.City;
        edit.Address = d.Address;
        edit.City = d.City;
        edit.ZIP = d.ZIP;
        edit.Country = d.Country;
        edit.Phone = d.Phone;
        modal.show();
    }

    function getAll() {
        $.ajax({
            type: 'GET',
            url: baseURL,
            success: (data, status) => {
                if (status === 'success')
                    suppliers.value = JSON.parse(data);
            }
        });
    }

    function addSupplier(item) {
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

    function updateSupplier() {
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

    function deleteSupplier(row) {
        let id = row.SupplierID;
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