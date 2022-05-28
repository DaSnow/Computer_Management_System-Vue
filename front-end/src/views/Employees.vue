<template>
    <div>
        <FormInp :fields="fields" :page="'Employee'" @new-handler="addEmployee" />
        <Tbl :listName="'Employee'" :columns="cols" :rows="employees" @modal-handler="openModal" @delete-handler="deleteEmployee" />

        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Employee Info</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="none">
                            <h1>Name</h1>
                            <input class="form-control" type="text" v-model="edit.Name">
                            <p></p>
                            <h1>Last Name</h1>
                            <input class="form-control" type="text" v-model="edit.LastName">
                            <p></p>
                            <h1>Date of Birth</h1>
                            <input class="form-control" type="date" v-model="edit.DoB">
                            <p></p>
                            <h1>Email</h1>
                            <input class="form-control" type="email" v-model="edit.Email">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateEmployee">Save changes</button>
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

    const baseURL = 'http://localhost:3000/employees/';

    var modal;

    const fields = ref([
        {
            Title: "Name",
            Name: "Name",
            Type: "text"
        },
        {
            Title: "Last Name",
            Name: "LastName",
            Type: "text"
        },
        {
            Title: "Date of Birth",
            Name: "DoB",
            Type: "date"
        },
        {
            Title: "Email",
            Name: "Email",
            Type: "email"
        }
    ]);

    const cols = ref([
        "Employee ID",
        "Name",
        "Last Name",
        "Date of Birth",
        "Email",
        "Actions"
    ]);

    const employees = ref([]);

    const editID = ref(0);

    const edit = reactive({
        Name: '',
        LastName: '',
        DoB: '',
        Email: ''
    });

    function openModal(d) {
        editID.value = d.EmployeeID;
        edit.Name = d.Name;
        edit.LastName = d.LastName;
        edit.DoB = d.DoB.split('T')[0];
        edit.Email = d.Email;
        modal.show();
    }

    function getAll() {
        $.ajax({
            type: 'GET',
            url: baseURL,
            success: (data, status) => {
                if (status === 'success')
                    getDate(data);
            }
        });
    }

    function getDate(data) {
        let emp = JSON.parse(data);
        for (let i = 0; i < emp.length; i++) {
            emp[i].DoB = emp[i].DoB.split('T')[0];
        }
        employees.value = emp;
    }

    function addEmployee(item) {
        $.ajax({
            type: 'POST',
            url: baseURL + 'add',
            data: item,
            success: (data, status) => {
                if (status === 'success') {
                    swal({
                        title: "Well Done!",
                        icon: 'success'
                    });
                    getAll();
                }
            }
        });
    }

    function updateEmployee() {
        $.ajax({
            type: 'PUT',
            url: baseURL + `update/${editID.value}`,
            data: edit,
            success: (data, status) => {
                if (status === 'success') {
                    getAll();
                    modal.hide();
                }
            }
        });
    }

    function deleteEmployee(row) {
        let id = row.EmployeeID;
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