<template>
    <div>
        <FormInp :fields="fields" :page="'Shipper'" @new-handler="addShipper" />
        <Tbl :listName="'Shipper'" :columns="cols" :rows="shippers" @modal-handler="openModal" @delete-handler="deleteShipper" />

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Shipper Info</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="none">
                            <h1>Name</h1>
                            <input class="form-control" type="text" v-model="edit.Name">
                            <p></p>
                            <h1>Phone</h1>
                            <input class="form-control" type="text" v-model="edit.Phone">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateShipper">Save changes</button>
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

    let baseURL = 'http://localhost:3000/shippers/';

    var modal = null;

    const fields = ref([
        {
            Title: "Name",
            Name: "Name",
            Type: "text"
        },
        {
            Title: "Phone",
            Name: "Phone",
            Type: "tel"
        }
    ]);

    const cols = ref([
        "Shipper ID",
        "Name",
        "Phone",
        "Actions"
    ]);

    const shippers = ref([]);

    const editID = ref(0);

    const edit = reactive({
        Name: '',
        Phone: ''
    });

    function openModal(d) {
        editID.value = d.ShipperID;
        edit.Name = d.Name;
        edit.Phone = d.Phone;
        modal.show();
    }

    function getAll() {
        $.ajax({
            type: 'GET',
            url: baseURL,
            success: (data, status) => {
                if (status === 'success')
                    shippers.value = JSON.parse(data);
            }
        });
    }

    function addShipper(item) {
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

    function updateShipper() {
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

    function deleteShipper(row) {
        let id = row.ShipperID;
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