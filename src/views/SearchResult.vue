<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
const route = useRoute()
const router = useRouter()
const searchResults = ref([])
const isLoading = ref(false)
const error = ref(null)
const continent = ref(route.query.continent || '')
const keyword = ref(route.query.keyword || '')
const region = ref(route.query.region || '')
const slug = ref(route.query.slug || '')
const searchDestination = ref('')
const searchTourName = ref('')
const baseUrl = import.meta.env.VITE_BASE_URL
// watch(() => route.query, (newQuery) => {
//   region.value = newQuery.region || ''
//   keyword.value = newQuery.keyword || ''
//   searchTours()
// }, { deep: true })

const getSearchResults = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${baseUrl}/tours/search?region=${region.value}&keyword=${keyword.value}&slug=${slug.value}&continent=${continent.value}`)
    searchResults.value = response.data.tours
  } catch (err) {
    console.error('Error loading search results:', err)
  } finally {
    isLoading.value = false
  }
}


getSearchResults()

const searchTours = () => {
  getSearchResults();
  router.push(`/tours/search?region=${region.value}&keyword=${keyword.value}`)
}
// Định dạng tiền tệ
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value).replace('₫', '₫')
}

// Lấy icon cho phương tiện di chuyển
const getTransportIcon = (type) => {
  const icons = {
    'Ô tô': 'bi bi-car-front',
    'Máy bay': 'bi bi-airplane',
    'Tàu thủy': 'bi bi-ship',
    'Du thuyền': 'bi bi-water'
  }
  return icons[type] || 'bi bi-arrow-right-circle'
}

// Tính số review hiển thị dựa trên rating (demo)
const getRandomReviews = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Lấy văn bản hiển thị cho region
const getRegionLabel = (region) => {
  const regions = {
    'north': 'Miền Bắc',
    'central': 'Miền Trung',
    'south': 'Miền Nam',
    'international': 'Quốc tế'
  }
  return regions[region] || region
}

// Tạo rating ngẫu nhiên cho demo
const getRandomRating = () => {
  return (Math.random() * (5 - 4) + 4).toFixed(1)
}

// Xử lý khi không có kết quả
const noResults = computed(() => {
//   return !isLoading.value && searchResults.value.length === 0 && !error.value
})

// Trích xuất một phần mô tả
const truncateDescription = (desc, length = 50) => {
  if (desc.length <= length) return desc
  return desc.substring(0, length) + '...'
}

// Xử lý chuyển hướng đến trang chi tiết tour
const viewTourDetail = (tourId) => {
  router.push(`/tour/${tourId}`)
}

// Lấy địa điểm từ URL
const parseTransportation = (vehicle) => {
  if (!vehicle) return ['Ô tô']
  return vehicle.split(', ')
}

</script>

<template>
  <div class="search-results-page py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="search-header mb-4">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
                <li class="breadcrumb-item"><router-link to="/tours">Tour du lịch</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Kết quả tìm kiếm</li>
              </ol>
            </nav>
            <div class="row g-3">
            <div class="col-md-4">
              <label for="destination" class="form-label">Điểm đến</label>
              <select class="form-select" id="destination" v-model="region">
                <option selected>Chọn điểm đến</option>
                <option value="north">Miền Bắc</option>
                <option value="central">Miền Trung</option>
                <option value="south">Miền Nam</option>
                <option value="international">Quốc tế</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="tour-name" class="form-label">Tìm kiếm tour</label>
              <input type="text" class="form-control" id="tour-name" placeholder="Nhập tên tour cần tìm..." v-model="keyword">
            </div>
            <div class="col-md-2">
              <label class="form-label" style="visibility: hidden;">Tìm kiếm</label>
              <button class="btn btn-primary w-100" @click="searchTours">Tìm tour</button>
            </div>
          </div>
            
            <!-- <h2 class="mb-3 mt-3">Kết quả tìm kiếm</h2> -->
            <div v-if="region || keyword" class="search-info alert alert-light">
              <p class="mb-0">
                <span v-if="keyword" class="me-2">
                  <strong>Từ khóa:</strong> {{ keyword }}
                </span>
                <span v-if="region">
                  <strong>Khu vực:</strong> {{ getRegionLabel(region) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Đang tìm kiếm tour...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- No Results State -->
      <div v-else-if="noResults" class="text-center py-5">
        <i class="bi bi-search display-1 text-muted"></i>
        <h3 class="mt-3">Không tìm thấy kết quả phù hợp</h3>
        <p class="text-muted">Vui lòng thử lại với từ khóa khác hoặc xem tất cả tour của chúng tôi</p>
        <router-link to="/tours" class="btn btn-primary mt-3">Xem tất cả tour</router-link>
      </div>

      <!-- Search Results -->
      <div v-else>
        <!-- <div class="row mb-4">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">Tìm thấy <strong>{{ searchResults.length }}</strong> tour</p>
              <div class="d-flex">
                <select class="form-select me-2" style="width: auto;">
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="duration-asc">Thời gian: Ngắn đến dài</option>
                  <option value="duration-desc">Thời gian: Dài đến ngắn</option>
                </select>
              </div>
            </div>
          </div>
        </div> -->

        <div class="row">
          <div v-for="tour in searchResults" :key="tour._id" class="col-md-3 mb-4">
            <div class="card h-100 tour-card" @click="viewTourDetail(tour._id)">
              <div class="position-relative">
                <img :src="tour.thumbnail" class="card-img-top" :alt="tour.title" style="height: 200px; object-fit: cover;">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ tour.title }}</h5>
                <div class="tour-rating mb-2">
                  <i class="bi bi-star-fill text-warning"></i>
                  <span class="ms-1">{{ tour.rating }} ({{ tour.reviews }} đánh giá)</span>
                </div>
                <p class="card-text text-muted small mb-3">{{ truncateDescription(tour.description) }}</p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="text-primary fw-bold">{{ formatCurrency(tour.price) }}</span>
                  <span v-if="tour.original_price" class="text-decoration-line-through text-muted">{{ formatCurrency(tour.original_price) }}</span>
                </div>
                <div class="tour-features mb-2">
                  <span v-for="(type, index) in parseTransportation(tour.vehicle)" :key="index" class="badge bg-light text-dark me-2 mb-1">
                    <i :class="getTransportIcon(type)"></i> {{ type }}
                  </span>
                </div>
                <div class="tour-info mt-auto">
                  <div class="d-flex justify-content-between">
                    <div><i class="bi bi-clock"></i> {{ tour.duration }}</div>
                    <div><i class="bi bi-geo-alt"></i> {{ tour.country }}</div>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0">
                <button class="btn btn-outline-primary w-100">Xem chi tiết</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-results-page {
  background-color: #f8f9fa;
  min-height: 80vh;
}

.tour-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
}

.tour-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card-title {
  font-size: 1rem;
  height: 3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.discount-badge {
  font-weight: bold;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
}

.breadcrumb-item a {
  text-decoration: none;
  color: #6c757d;
}

.breadcrumb-item.active {
  color: #0d6efd;
}
</style>