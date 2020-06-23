<template>
    <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
            <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
                type="check"
                class="editable-cell-icon-check"
                @click="check"
        />
        </div>
        <div v-else class="editable-cell-text-wrapper">
            {{ value || ' ' }}
            <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: String,
        },
    data() {
        return {
        value: this.text,
        editable: false,
            };
        },
    methods: {
        handleChange(e) {
            const value = e.target.value;
            this.value = value;
        },
        check() {
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
        },
    },
};
</script>






<template>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="">
        <a-form-item label="Note">
            <a-input
                    v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary">
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>