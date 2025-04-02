<template>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-body p-4">
              <h3 class="text-center mb-4">Đặt lại mật khẩu</h3>
              
              <div v-if="message" :class="`alert alert-${messageType}`" role="alert">
                {{ message }}
              </div>
  
              <form @submit.prevent="handleResetPassword">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    required
                    minlength="6"
                  />
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Mật khẩu mới</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                    minlength="6"
                  />
                </div>
  
                <div class="mb-4">
                  <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    required
                  />
                </div>
  
                <button 
                  type="submit" 
                  class="btn btn-primary w-100"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  
  const baseUrl = import.meta.env.VITE_BASE_URL
  const route = useRoute()
  const router = useRouter()
  
  const password = ref('')
  const confirmPassword = ref('')
  const isLoading = ref(false)
  const message = ref('')
  const messageType = ref('info')
  const email = ref('')
  
  const handleResetPassword = async () => {
    try {
      // Reset message
      message.value = ''
      if(!email.value.trim()){
        message.value = 'Vui lòng nhập email'
        messageType.value = 'danger'
        return
      }
      // Validate passwords match
      if (password.value !== confirmPassword.value) {
        message.value = 'Mật khẩu xác nhận không khớp'
        messageType.value = 'danger'
        return
      }
  
      // Validate password length
      if (password.value.length < 6) {
        message.value = 'Mật khẩu phải có ít nhất 6 ký tự'
        messageType.value = 'danger'
        return
      }
  
      isLoading.value = true
  
      // Get token from URL query parameter
    //   const token = route.query.token
  
      // Call API to reset password
      await axios.put(`${baseUrl}/auth/change-password/${email.value}`, {
        password: password.value
      })
  
      message.value = 'Đổi mật khẩu thành công!'
      messageType.value = 'success'
  
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
  
    } catch (error) {
      message.value = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại'
      messageType.value = 'danger'
    } finally {
      isLoading.value = false
    }
  }
  </script>