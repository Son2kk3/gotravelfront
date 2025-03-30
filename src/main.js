import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'vue3-toastify/dist/index.css';
import Vue3Toasity from 'vue3-toastify';


// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(router)
app.use(
    Vue3Toasity,
    {
        autoClose: 5000,
    }
)
app.mount('#app')
