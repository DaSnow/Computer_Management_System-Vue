<template>
    <div>
        <FormInp :fields="fields" :page="'Category'" @new-handler="addCategory" />
        <Tbl :listName="'Category'" :columns="cols" :rows="categories" @modal-handler="openModal" @delete-handler="deleteCategory" />

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Category Info</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="none">
                            <h1>Name</h1>
                            <input class="form-control" type="text" v-model="edit.Name">
                            <p></p>
                            <h1>Description</h1>
                            <input class="form-control" type="text" v-model="edit.Description">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateCategory">Save changes</button>
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

    const baseURL = 'http://localhost:3000/categories/';

    var modal;

    const fields = ref([
        {
            Title: "Name",
            Name: "Name",
            Type: "text"
        },
        {
            Title: "Description",
            Name: "Description",
            Type: "text"
        }
    ]);

    const cols = ref([
        "Category ID",
        "Name",
        "Description",
        "Actions"
    ]);

    const categories = ref([]);

    const editID = ref(0);

    const edit = reactive({
        Name: '',
        Description: ''
    });

    function openModal(d) {
        editID.value = d.CategoryID;
        edit.Name = d.Name;
        edit.Description = d.Description;
        modal.show();
    }

    function getAll() {
        $.ajax({
            type: 'GET',
            url: baseURL,
            success: (data, status) => {
                if (status === 'success')
                    categories.value = JSON.parse(data);
            }
        });
    }

    function addCategory(item) {
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

    function updateCategory() {
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

    function deleteCategory(row) {
        let id = row.CategoryID;
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
        modal = new bootstrap.Modal($('#editModal'));
        getAll();
    });
</script>