<template>
    <form class="bg-light" @submit.prevent="newHandler">
        <div v-for="(field) in fields">
            <h1>{{ field.Title }}</h1>
            <input class="form-control" :type="field.Type" v-model="item[field.Name]" required>
            <br>
        </div>
        <hr>
        <div style="text-align: end;">
            <button class="btn btn-primary">Add {{ page }}</button>
        </div>
    </form>
</template>

<script setup>
    import { ref, reactive } from 'vue';

    defineProps({
        fields: Array,
        page: String
    });

    const item = reactive({});

    const emit = defineEmits([
        'newHandler'
    ]);

    function newHandler() {
        emit('newHandler', item);
    }
</script>