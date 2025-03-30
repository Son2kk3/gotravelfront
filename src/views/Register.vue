<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from "vue3-toastify";
import axios from 'axios'
const router = useRouter()

const loading = ref(false)
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const agreeTerms = ref(false)
const errorMessage = ref('')
const baseUrl = import.meta.env.VITE_BASE_URL

const handleRegister = async() => {
  // Validate form
  if (!fullName.value.trim()) {
    errorMessage.value = 'Vui lòng nhập họ tên'
    return
  }
  
  if (!email.value.trim()) {
    errorMessage.value = 'Vui lòng nhập địa chỉ email'
    return
  }
  
  if (!password.value) {
    errorMessage.value = 'Vui lòng nhập mật khẩu'
    return
  }
  
  if (password.value.length < 6) {
    errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Xác nhận mật khẩu không khớp'
    return
  }
  
  if (!phone.value.trim()) {
    errorMessage.value = 'Vui lòng nhập số điện thoại'
    return
  }
  
  if (!agreeTerms.value) {
    errorMessage.value = 'Bạn phải đồng ý với điều khoản dịch vụ'
    return
  }
  
  // Reset error message
  errorMessage.value = '';
  await axios.post(`${baseUrl}/auth/signup`, {
        email: email.value,
        password: password.value,
        fullname: fullName.value,
        phone: phone.value
    })
    .then((res) => {
        toast.success('Sign up successfully');
    })
    .catch((err) => {
        toast.error(err.response?.data?.message);
    })
    .finally(() => {
        loading.value = false;
    });
  router.push('/login')
}

const handleSocialLogin = (provider) => {
  // In a real application, you would implement OAuth login
  alert(`Đăng ký bằng ${provider} sẽ được triển khai sau`)
}
</script>

<template>
  <div class="register-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h1 class="card-title text-center mb-4">Đăng ký tài khoản</h1>
              <p class="text-center text-muted mb-4">Tạo tài khoản để theo dõi đơn hàng, lưu danh sách tour yêu thích, nhận nhiều ưu đãi hấp dẫn.</p>
              
              <!-- Social Login Buttons -->
              <div class="social-login mb-4">
                <div class="row g-2">
                  <div class="col-md-6">
                    <button @click="handleSocialLogin('Facebook')" class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
                      <i class="bi bi-facebook me-2"></i> Đăng ký bằng Facebook
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button @click="handleSocialLogin('Google')" class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
                      <i class="bi bi-google me-2"></i> Đăng ký bằng Google
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Divider -->
              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc đăng ký bằng email</p>
              </div>
              
              <!-- Registration Form -->
              <form @submit.prevent="handleRegister">
                <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="full-name" class="form-label">Họ tên *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="full-name"
                      v-model="fullName"
                      placeholder="Nhập họ tên"
                      required
                    >
                  </div>
                  
                  <div class="col-md-6 mb-3">
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
                </div>
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label">Mật khẩu *</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      v-model="password"
                      placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                      required
                    >
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label for="confirm-password" class="form-label">Xác nhận mật khẩu *</label>
                    <input
                      type="password"
                      class="form-control"
                      id="confirm-password"
                      v-model="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      required
                    >
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="phone" class="form-label">Số điện thoại *</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="phone"
                    placeholder="Nhập số điện thoại"
                    required
                  >
                </div>
                
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="agree-terms" v-model="agreeTerms">
                  <label class="form-check-label" for="agree-terms">
                    Tôi đồng ý với <a href="#" class="text-decoration-none">Điều khoản dịch vụ</a> và <a href="#" class="text-decoration-none">Chính sách bảo mật</a>
                  </label>
                </div>
                
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary">Đăng ký</button>
                </div>
                
                <div class="text-center mt-3">
                  <p class="mb-0">Đã có tài khoản? <router-link to="/login" class="text-decoration-none">Đăng nhập</router-link></p>
                </div>
              </form>
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