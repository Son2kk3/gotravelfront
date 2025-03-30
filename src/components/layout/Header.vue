<script setup>
// Header component cho website du lịch
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
import axios from 'axios'
// Kiểm tra xem người dùng đã đăng nhập chưa
const isLoggedIn = ref(false)
const userName = ref('')
const token = localStorage.getItem('token')
const baseUrl = import.meta.env.VITE_BASE_URL
import { toast } from "vue3-toastify";
onMounted(() => {
  // Kiểm tra localStorage để xem người dùng đã đăng nhập chưa
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData) {
    isLoggedIn.value = true
    userName.value = userData.fullname || userData.email || 'Khách hàng'
  }
})

// Đăng xuất
const handleLogout = async() => {
  const body = {
      msg: "inactive",
  };
  await axios.post(`${baseUrl}/auth/logout`, body,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        isLoggedIn.value = false;
        router.push('/');
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    })
    .finally(() => {
        // loadinglogout.value = false;
    });
}
</script>

<template>
  <header>
    <!-- Top Header with Contact Info -->
    <div class="top-header bg-primary text-white py-2">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="contact-info d-flex align-items-center">
          <a href="tel:19006750" class="text-white text-decoration-none me-4">
            <i class="bi bi-telephone-fill me-1"></i> 1900 6750
          </a>
          <a href="mailto:support@travelexplorer.vn" class="text-white text-decoration-none">
            <i class="bi bi-envelope-fill me-1"></i> hotro@dulich.vn
          </a>
        </div>
        <div class="auth-links">
          <!-- Hiển thị khi chưa đăng nhập -->
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="text-white text-decoration-none me-3">
              <i class="bi bi-box-arrow-in-right me-1"></i> Đăng nhập
            </router-link>
            <router-link to="/register" class="text-white text-decoration-none">
              <i class="bi bi-person-plus-fill me-1"></i> Đăng ký
            </router-link>
          </template>
          
          <!-- Hiển thị khi đã đăng nhập -->
          <template v-else>
            <div class="dropdown">
              <a href="#" class="text-white text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle me-1"></i> {{ userName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><router-link class="dropdown-item" to="/profile"><i class="bi bi-person me-2"></i>Tài khoản của tôi</router-link></li>
                <!-- <li><router-link class="dropdown-item" to="/profile"><i class="bi bi-heart me-2"></i>Tour yêu thích</router-link></li> -->
                <li><router-link class="dropdown-item" to="/booking-history"><i class="bi bi-card-checklist me-2"></i>Lịch sử đặt tour</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click.prevent="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>Đăng xuất</a></li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Main Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-primary fs-4" to="/">
          Go Travel
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link fw-medium" to="/">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fw-medium" to="/about">Giới thiệu</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle fw-medium" href="#" id="tourNavDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Tour trong nước
              </a>
              <ul class="dropdown-menu" aria-labelledby="tourNavDropdown">
                <li><a class="dropdown-item" href="/tours/search?region=north">Miền Bắc</a></li>
                <li><a class="dropdown-item" href="/tours/search?region=central">Miền Trung</a></li>
                <li><a class="dropdown-item" href="/tours/search?region=south">Miền Nam</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/tours/search">Xem tất cả</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle fw-medium" id="tourIntlNavDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Tour nước ngoài
              </a>
              <ul class="dropdown-menu" aria-labelledby="tourIntlNavDropdown">
                <li><a class="dropdown-item" href="/tours/search?continent=asia">Châu Á</a></li>
                <li><a class="dropdown-item" href="/tours/search?continent=europe">Châu Âu</a></li>
                <li><a class="dropdown-item" href="/tours/search?continent=america">Châu Mỹ</a></li>
                <li><a class="dropdown-item" href="/tours/search?continent=australia">Châu Úc</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fw-medium" to="/contact">Liên hệ</router-link>
            </li>
            <li class="nav-item ms-2">
              <form class="d-flex">
                <button class="btn btn-outline-primary" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  padding-top: 15px;
  padding-bottom: 15px;
}
.navbar-brand {
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.5px;
}
.nav-link {
  font-size: 0.95rem;
  padding: 0.5rem 1rem !important;
  color: #333 !important;
}
.nav-link:hover {
  color: #0d6efd !important;
}
.top-header a:hover {
  opacity: 0.8;
}
</style> 