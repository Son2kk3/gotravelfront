<script setup>
// Vue 3 Composition API with script setup
import { ref, computed, watchEffect } from 'vue'
const baseUrl = import.meta.env.VITE_BASE_URL
const region = ref('north')
const continent = ref('asia')
import moment from 'moment'
import axios from 'axios'

// Dữ liệu mẫu cho trang chủ
const featuredTours = ref([])

const domesticTours = ref([])

// Thêm dữ liệu tour nước ngoài
const internationalTours = ref([])

const blogPosts = ref([])

const getBlogPosts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/posts`)
    blogPosts.value = response.data;
    // console.log(blogPosts.value)
  } catch (error) {
    console.error(error)
  }
}
watchEffect(getBlogPosts)

const getFeaturedTours = async () => {
  try {
    const response = await fetch(`${baseUrl}/tours/featured`)
    const data = await response.json();
    featuredTours.value = data;
  } catch (error) {
    console.error(error)
  }
}
watchEffect(getFeaturedTours)

const getdomesticTours = async () => {
  try {
    const response = await fetch(`${baseUrl}/tours/slug?slug=du-lich-trong-nuoc&region=${region.value}`)
    const data = await response.json();
    domesticTours.value = data;
  } catch (error) {
    console.error(error)
  }
}
watchEffect(getdomesticTours)

const getInternationalTours = async () => {
  try {
    const response = await fetch(`${baseUrl}/tours/continent?continent=${continent.value}`)
    const data = await response.json();
    internationalTours.value = data;
    console.log("international: ",internationalTours.value);
    
  } catch (error) {
    console.error(error)
  }
}
watchEffect(getInternationalTours)

// Thêm biến cho tìm kiếm
const searchDestination = ref('Chọn điểm đến')
const searchTourName = ref('')

// Lấy tất cả các tour để tìm kiếm
const allTours = computed(() => {
  let tours = []
  // Thêm tour nổi bật
  tours = tours.concat(featuredTours.value)
  
  // Thêm tour trong nước
  Object.values(domesticTours.value).forEach(regionTours => {
    tours = tours.concat(regionTours)
  })
  
  // Thêm tour nước ngoài
  Object.values(internationalTours.value).forEach(regionTours => {
    tours = tours.concat(regionTours)
  })
  
  return tours
})

// Hàm xử lý tìm kiếm
const searchTours = () => {
  // Chuyển hướng tới trang tour với các tham số tìm kiếm
  const queryParams = new URLSearchParams()
  
  if (searchDestination.value !== 'Chọn điểm đến') {
    queryParams.append('region', searchDestination.value)
  }
  
  if (searchTourName.value.trim()) {
    queryParams.append('keyword', searchTourName.value.trim())
  }
  
  const queryString = queryParams.toString()
  window.location.href = `/tours/search${queryString ? '?' + queryString : ''}`
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
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section mb-5 position-relative">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg" class="d-block w-100" alt="Hero Image" style="height: 600px; object-fit: cover;">
            <!-- <div class="carousel-caption d-none d-md-block text-left" style="text-align: left;">
              <h1 class="display-4 fw-bold alert alert-danger" style="opacity: 0.9;">Khám phá các địa điểm du lịch tuyệt vời</h1>
              <p class="lead alert alert-warning">Cùng Ant Du lịch trải nghiệm những chuyến đi đáng nhớ với chi phí hợp lý nhất</p>
              <button class="btn btn-primary btn-lg">Khám phá ngay</button>
            </div> -->
          </div>
        </div>
      </div>
      <div class="search-box-container container position-absolute" style="bottom: -25px; left: 0; right: 0; z-index: 10;">
        <div class="search-box bg-white p-4 shadow rounded">
          <div class="row g-3">
            <div class="col-md-4">
              <label for="destination" class="form-label">Điểm đến</label>
              <select class="form-select" id="destination" v-model="searchDestination">
                <option selected>Chọn điểm đến</option>
                <option value="north">Miền Bắc</option>
                <option value="central">Miền Trung</option>
                <option value="south">Miền Nam</option>
                <option value="international">Quốc tế</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="tour-name" class="form-label">Tìm kiếm tour</label>
              <input type="text" class="form-control" id="tour-name" placeholder="Nhập tên tour cần tìm..." v-model="searchTourName">
            </div>
            <div class="col-md-2">
              <label class="form-label" style="visibility: hidden;">Tìm kiếm</label>
              <button class="btn btn-primary w-100" @click="searchTours">Tìm tour</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Content -->
    <div class="container mt-5">
      <!-- Featured Tours -->
      <section class="featured-tours mb-5 pt-4">
        <div class="section-title text-center mb-5">
          <h2 class="fw-bold">Tour mới nhất</h2>
          <p class="text-muted">Khám phá những tour mới và hấp dẫn nhất của chúng tôi</p>
        </div>
        
        <div class="row">
          <div v-for="tour in featuredTours" :key="tour._id" class="col-md-3 mb-4">
            <router-link :to="'/tour/' + tour._id" class="text-decoration-none">
              <div class="card h-100 tour-card">
                <div class="position-relative">
                  <img :src="tour.thumbnail" class="card-img-top" :alt="tour.title" style="height: 180px; object-fit: cover;">
                  <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                    -{{ tour.discount }}%
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ tour.title }}</h5>
                  <!-- <div class="tour-rating mb-2">
                    <i class="bi bi-star-fill text-warning"></i>
                    <span class="ms-1">{{ tour.rating }} ({{ tour.reviews }} đánh giá)</span>
                  </div> -->
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-primary fw-bold">{{ formatCurrency(tour.price) }}</span>
                    <span v-if="tour.originalPrice" class="text-decoration-line-through text-muted">{{ formatCurrency(tour.originalPrice) }}</span>
                  </div>
                  <div class="tour-features mb-2">
                    <span v-for="(type, index) in tour.transport" :key="index" class="badge bg-light text-dark me-2 mb-1">
                      <i :class="getTransportIcon(type)"></i> {{ type }}
                    </span>
                  </div>
                </div>
                <div class="card-footer bg-white border-top-0">
                  <span class="btn btn-outline-primary w-100">Xem chi tiết</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <router-link to="/tours/search" class="btn btn-outline-primary">Xem tất cả tour</router-link>
        </div>
      </section>
      
      <!-- Domestic Tours by Region -->
      <section class="domestic-tours mb-5">
        <div class="section-title text-center mb-5">
          <h2 class="fw-bold">Tour trong nước</h2>
          <p class="text-muted">Khám phá vẻ đẹp Việt Nam qua các tour chất lượng</p>
        </div>
        
        <div class="row mb-4">
          <div class="col-12">
            <ul class="nav nav-pills justify-content-center mb-4" id="domesticToursTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active mx-2" id="north-tab" data-bs-toggle="pill" data-bs-target="#north" type="button" role="tab" aria-controls="north" aria-selected="true" @click="region ='north'">Miền Bắc</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link mx-2" id="central-tab" data-bs-toggle="pill" data-bs-target="#central" type="button" role="tab" aria-controls="central" aria-selected="false" @click="region = 'central'">Miền Trung</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link mx-2" id="south-tab" data-bs-toggle="pill" data-bs-target="#south" type="button" role="tab" aria-controls="south" aria-selected="false" @click="region = 'south'">Miền Nam</button>
              </li>
            </ul>
            
            <div class="tab-content" id="domesticToursTabContent">
              <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="north-tab">
                <div class="row">
                  <div v-for="tour in domesticTours" :key="tour._id" class="col-md-6 mb-4">
                    <router-link :to="'/tour/' + tour._id" class="text-decoration-none">
                      <div class="card h-100 tour-card horizontal">
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img :src="tour.thumbnail" class="img-fluid rounded-start h-100" :alt="tour.title" style="object-fit: cover;">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body h-100 d-flex flex-column">
                              <h5 class="card-title">{{ tour.title }}</h5>
                              <!-- <div class="tour-rating mb-2">
                                <i class="bi bi-star-fill text-warning"></i>
                                <span class="ms-1">{{ tour.rating }} ({{ tour.reviews }} đánh giá)</span>
                              </div> -->
                              <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="text-primary fw-bold">{{ formatCurrency(tour.price) }}</span>
                                <span v-if="tour.originalPrice" class="text-decoration-line-through text-muted">{{ formatCurrency(tour.originalPrice) }}</span>
                              </div>
                              <div class="tour-schedule mt-auto">
                                <div class="mb-1"><i class="bi bi-calendar3"></i> {{ tour.schedule }}</div>
                                <div><i class="bi bi-clock"></i> {{ tour.duration }}</div>
                              </div>
                              <span class="btn btn-outline-primary mt-2">Xem chi tiết</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <router-link to="/tours/search?slug=du-lich-trong-nuoc" class="btn btn-outline-primary">Xem tất cả tour trong nước</router-link>
        </div>
      </section>
      
      <!-- International Tours by Region -->
      <section class="international-tours mb-5">
        <div class="section-title text-center mb-5">
          <h2 class="fw-bold">Tour nước ngoài</h2>
          <p class="text-muted">Du lịch nước ngoài tại Ant Du lịch. Du lịch 5 châu - Trải nghiệm sắc xuân thế giới</p>
        </div>
        
        <div class="row mb-4">
          <div class="col-12">
            <ul class="nav nav-pills justify-content-center mb-4" id="internationalToursTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active mx-2" id="asia-tab" data-bs-toggle="pill" data-bs-target="#asia" type="button" role="tab" aria-controls="asia" aria-selected="true" @click="continent = 'asia'">Châu Á</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link mx-2" id="europe-tab" data-bs-toggle="pill" data-bs-target="#europe" type="button" role="tab" aria-controls="europe" aria-selected="false" @click="continent = 'europe'">Châu Âu</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link mx-2" id="america-tab" data-bs-toggle="pill" data-bs-target="#america" type="button" role="tab" aria-controls="america" aria-selected="false" @click="continent = 'america'">Châu Mỹ</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link mx-2" id="australia-tab" data-bs-toggle="pill" data-bs-target="#australia" type="button" role="tab" aria-controls="australia" aria-selected="false" @click="continent = 'australia'">Châu Úc</button>
              </li>
            </ul>
            
            <div class="tab-content" id="internationalToursTabContent">
              <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="asia-tab">
                <div class="row">
                  <div v-for="tour in internationalTours" :key="tour._id" class="col-md-6 mb-4">
                    <div class="card h-100 tour-card horizontal">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img :src="tour.thumbnail" class="img-fluid rounded-start h-100" :alt="tour.title" style="object-fit: cover;">
                          <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded" style="opacity: 0.9;">
                            -{{ tour.discount }}%
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body h-100 d-flex flex-column">
                            <h5 class="card-title">{{ tour.title }}</h5>
                            <div class="tour-rating mb-2">
                              <i class="bi bi-star-fill text-warning"></i>
                              <span class="ms-1">{{ tour.rating }} ({{ tour.reviews }} đánh giá)</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                              <span class="text-primary fw-bold">{{ formatCurrency(tour.price) }}</span>
                              <span v-if="tour.originalPrice" class="text-decoration-line-through text-muted">{{ formatCurrency(tour.originalPrice) }}</span>
                            </div>
                            <div class="tour-features mb-2">
                              <span v-for="(type, index) in tour.transport" :key="index" class="badge bg-light text-dark me-2 mb-1">
                                <i :class="getTransportIcon(type)"></i> {{ type }}
                              </span>
                            </div>
                            <div class="tour-schedule mt-auto">
                              <div class="mb-1"><i class="bi bi-calendar3"></i> {{ tour.schedule }}</div>
                              <div><i class="bi bi-clock"></i> {{ tour.duration }}</div>
                            </div>
                            <router-link :to="'/tour/' + tour._id" class="btn btn-outline-primary mt-2">Xem chi tiết</router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <router-link to="/tours/search?region=international" class="btn btn-outline-primary">Xem tất cả tour nước ngoài</router-link>
        </div>
      </section>
      
      <!-- Blog Section -->
      <section class="blog-section mb-5">
        <div class="section-title text-center mb-5">
          <h2 class="fw-bold">Blog du lịch</h2>
          <p class="text-muted">Cùng Ant Du lịch khám phá những kinh nghiệm thú vị</p>
        </div>
        
        <div class="row">
          <div v-for="post in blogPosts" :key="post.id" class="col-md-4 mb-4">
            <div class="card h-100 blog-card">
              <img :src="post.thumbnail" class="card-img-top" :alt="post.title" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <div class="blog-meta mb-2">
                  <small class="text-muted">
                    <i class="bi bi-calendar"></i> {{ moment(post.createdAt).format('DD/MM/YYYY') }} | 
                    <i class="bi bi-person"></i> {{ post.author }}
                  </small>
                </div>
                <p class="card-text">{{ post.excerpt }}</p>
              </div>
              <div class="card-footer bg-white border-top-0">
                <router-link :to="`/blog/${post.slug}`" class="btn btn-link p-0 text-primary">Đọc thêm <i class="bi bi-arrow-right"></i></router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- <div class="text-center mt-4">
          <a href="#" class="btn btn-outline-primary">Xem tất cả bài viết</a>
        </div> -->
      </section>
    </div>
  </div>
</template>

<style scoped>
.tour-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.tour-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.tour-card.horizontal:hover {
  transform: translateX(5px);
}
.blog-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.title-overflow {
  font-size: 1rem;
  height: 3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.blog-card .card-title {
  font-size: 1.1rem;
  font-weight: 500;
}
.search-box {
  border-radius: 10px;
}
.discount-badge {
  font-weight: bold;
}
</style> 
