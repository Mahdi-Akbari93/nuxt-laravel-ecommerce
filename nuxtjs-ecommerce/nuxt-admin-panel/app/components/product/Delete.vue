<template>
    <button @click="deleteProduct" :disabled="loading" class="btn btn-delete">حذف
        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
</template>


<script setup>
import {useToast} from "vue-toastification";



const props = defineProps(['productId'])
const loading = ref(false)
const toast = useToast()

async function deleteProduct(){
    try{

        loading.value = true
        await $fetch('/api/global' , {
            method: 'DELETE',
            query: {url: `/products/${props.productId}`},
            // headers: useRequestHeaders(["cookie"])
        })

        toast.warning("حذف محصول باموفقیت انجام شد")

        return navigateTo('/products')
    }catch(error){
        toast.error(errorText(error) ?? "حذف محصول با خطا مواجه شد")
    }finally{
        loading.value = false
    }
}
</script>