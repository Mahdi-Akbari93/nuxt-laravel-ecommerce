<template>
    <button @click="deleteCategory" :disabled="loading" class="btn btn-delete">حذف
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
</template>


<script setup>
import {useToast} from "vue-toastification";



const props = defineProps(['categoryId'])
const loading = ref(false)
const toast = useToast()

async function deleteCategory(){
    try{

        loading.value = true
        await $fetch('/api/global' , {
            method: 'DELETE',
            query: {url: `/categories/${props.categoryId}`},
            // headers: useRequestHeaders(["cookie"])
        })

        toast.warning("حذف دسته بندی باموفقیت انجام شد")

        return navigateTo('/categories')
    }catch(error){
        toast.error(errorText(error) ?? "حذف دسته بندی با خطا مواجه شد")
    }finally{
        loading.value = false
    }
}
</script>