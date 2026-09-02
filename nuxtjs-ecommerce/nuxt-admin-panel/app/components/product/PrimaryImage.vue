<template>
    <div class="col-md-12 mb-2">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div v-if="image" class="position-relative">
                    <img :src="image" width="350" height="220" alt="primary image">
                    <div @click="removeImage" class="position-absolute remove-icon-image">
                        <i class="bi bi-x text-danger fs-2 cursor-pointer"></i>
                    </div>
                </div>

                <div v-else>
                    <label for="formFile" class="form-label">تصویر اصلی</label>
                    <div class="position-relative">
                        <input @change="imageFile" :disabled="loading" class="form-control" type="file" id="formFile" />

                        <div v-if="loading"
                            class="spinner-border spinner-border-sm text-primary position-absolute start-50"
                            style="top:32%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    primaryImage: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['setPrimaryImage']);

const image = ref(props.primaryImage);
const loading = ref(false);

function imageFile(el) {
    loading.value = true;

    const reader = new FileReader();
    reader.readAsDataURL(el.target.files[0]);

    reader.onloadend = () => {
        image.value = reader.result.toString()
        loading.value = false;
    }

    emit('setPrimaryImage', el.target.files[0])
}

function removeImage() {
    image.value = null;
    emit('setPrimaryImage', null)
}

</script>