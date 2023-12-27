import { ref } from 'vue'
import axios from "axios"
import { LoanData } from '@/types'

const useDog = () => {
    const data = ref<LoanData | null>(null)
    const error = ref(null)
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/list/all')
            data.value = response.data.message
            console.log(data)
        } catch (error: any){
            error.value = error
        } finally {
            loading.value = false
        }
    };

    return {
        data,
        error,
        loading,
        fetchData
    }
}

export default useDog;