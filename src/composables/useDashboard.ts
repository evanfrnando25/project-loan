import { ref } from 'vue'
import axios from "axios"
import { LoanData } from '@/types'

const useDashboard = () => {
    const data = ref<LoanData | null>(null)
    const error = ref(null)
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api')
            data.value = response.data
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

export default useDashboard;