<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from "vue3-toastify";
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL
const router = useRouter()
const loading = ref(false)
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
const showForgotPassword = ref(false)
const forgotEmail = ref('')

const handleLogin = async() => {
  // Validate form
  if (!email.value.trim()) {
    errorMessage.value = 'Vui lòng nhập địa chỉ email'
    return
  }
  
  if (!password.value) {
    errorMessage.value = 'Vui lòng nhập mật khẩu'
    return
  }
  
  await axios.post(`${baseUrl}/auth/login`, {
        email: email.value,
        password: password.value
    })
    .then((res) => {
        const user = res.data.userData;
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('userData', JSON.stringify({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            phone: user.phone,
            avatar: user.avatar,
        }));
        window.location.href = '/';
        // window.location.reload();
    })
    .catch((err) => {
        toast.error(err.response?.data?.message);
    })
    .finally(() => {
        loading.value = false;
    });
  errorMessage.value = ''
}


const handleForgotPassword = async() => {
  if (!forgotEmail.value.trim()) {
    errorMessage.value = 'Vui lòng nhập địa chỉ email để lấy lại mật khẩu'
    return
  }
  
  // Reset error message
  errorMessage.value = ''
  
  await axios.post(`${baseUrl}/api/send-email`, {
    email: forgotEmail.value,
    text: `Kính chào Quý khách,
    Chúng tôi xin chân thành cảm ơn Quý khách đã tin dùng dịch vụ của GoTravel. Để tiếp tục sử dụng tài khoản của mình, Quý khách vui lòng ấn vào đường dẫn dưới đây để đặt lại mật khẩu:
    [Đặt lại mật khẩu](https://gotravelfront.onrender.com/reset-password)
    Nếu Quý khách gặp bất kỳ khó khăn nào trong quá trình thực hiện, xin vui lòng liên hệ với chúng tôi để được hỗ trợ.
    Trân trọng cảm ơn,
    Đội ngũ GoTravel`
  })
  .then((res) => {
    // alert(res.data.message)
    toast.success(res.data.message)
  })
  
  // Simulate sending password reset email
  // alert(`Đã gửi hướng dẫn đặt lại mật khẩu đến ${forgotEmail.value}`)
  
  // Reset and hide forgot password form
  forgotEmail.value = ''
  showForgotPassword.value = false
}

const toggleForgotPassword = () => {
  showForgotPassword.value = !showForgotPassword.value
  errorMessage.value = ''
}

const handleSocialLogin = (provider) => {
  // In a real application, you would implement OAuth login
  alert(`Đăng nhập bằng ${provider} sẽ được triển khai sau`)
}
</script>

<template>
  <div class="login-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h1 class="card-title text-center mb-4">Đăng nhập tài khoản</h1>
              <p class="text-center text-muted mb-4">Nếu bạn đã có tài khoản, đăng nhập tại đây.</p>
              
              <!-- Social Login Buttons -->
              <div class="social-login mb-4">
                <div class="row g-2">
                  <div class="col-6">
                    <button @click="handleSocialLogin('Facebook')" class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
                      <i class="bi bi-facebook me-2"></i> Facebook
                    </button>
                  </div>
                  <div class="col-6">
                    <button @click="handleSocialLogin('Google')" class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
                      <i class="bi bi-google me-2"></i> Google
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Divider -->
              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
              </div>
              
              <!-- Login Form -->
              <div v-if="!showForgotPassword">
                <form @submit.prevent="handleLogin">
                  <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
                  
                  <div class="mb-3">
                    <label for="email" class="form-label">Email *</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="email"
                      placeholder="Nhập địa chỉ email"
                      required
                    >
                  </div>
                  
                  <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu *</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      v-model="password"
                      placeholder="Nhập mật khẩu"
                      required
                    >
                  </div>
                  
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember-me" v-model="rememberMe">
                    <label class="form-check-label" for="remember-me">Ghi nhớ đăng nhập</label>
                  </div>
                  
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Đăng nhập</button>
                    <router-link to="/register" class="btn btn-outline-secondary">Đăng ký</router-link>
                  </div>
                  
                  <div class="text-center mt-3">
                    <a href="#" class="text-decoration-none" @click.prevent="toggleForgotPassword">Quên mật khẩu?</a>
                  </div>
                </form>
              </div>
              
              <!-- Forgot Password Form -->
              <div v-else>
                <form @submit.prevent="handleForgotPassword">
                  <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
                  
                  <div class="mb-3">
                    <label for="forgot-email" class="form-label">Email *</label>
                    <input
                      type="email"
                      class="form-control"
                      id="forgot-email"
                      v-model="forgotEmail"
                      placeholder="Nhập địa chỉ email"
                      required
                    >
                    <div class="form-text">
                      Nhập địa chỉ email để lấy lại mật khẩu qua email.
                    </div>
                  </div>
                  
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Đặt lại mật khẩu</button>
                    <button type="button" class="btn btn-outline-secondary" @click="toggleForgotPassword">Trở lại đăng nhập</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  text-align: center;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #dee2e6;
}

.divider p {
  padding: 0 10px;
}
</style> 