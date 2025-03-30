<script setup>
import { ref, onMounted } from 'vue'

// Dữ liệu mẫu cho tours
const tours = ref({
  central: [
    {
      id: 1,
      title: 'Du lịch Đà Nẵng - KDL Bà Nà - Hội An - Cố Đô Huế',
      price: 6300000,
      originalPrice: 6500000,
      discount: 3,
      transport: ['Ô tô', 'Máy bay'],
      schedule: 'Thứ 7 hằng tuần',
      duration: '3 ngày 2 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.8,
      reviews: 120
    },
    {
      id: 2,
      title: 'Du lịch Huế - Hồ Truồi - Đà Nẵng - Suối Khoáng Nóng Núi Thần Tài - KDL Bà Nà',
      price: 5900000,
      originalPrice: 6200000,
      discount: 5,
      transport: ['Ô tô', 'Máy bay'],
      schedule: 'Thứ 7 hằng tuần',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.7,
      reviews: 85
    },
    {
      id: 3,
      title: 'Du lịch Nha Trang - Hòn Lao - Dốc Lết',
      price: 3410000,
      originalPrice: 4400000,
      discount: 22,
      transport: ['Ô tô', 'Máy bay'],
      schedule: 'Thứ 5; Chủ nhật',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.9,
      reviews: 145
    },
    {
      id: 4,
      title: 'Du lịch Đà Lạt - Thành phố mộng mơ',
      price: 4200000,
      originalPrice: 4500000,
      discount: 7,
      transport: ['Ô tô', 'Máy bay'],
      schedule: 'Thứ 2, 4, 6',
      duration: '3 ngày 2 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.9,
      reviews: 200
    }
  ],
  north: [
    {
      id: 5,
      title: 'Du lịch Hà Nội - Lào Cai - Sapa - Hạ Long',
      price: 7990000,
      transport: ['Ô tô', 'Máy bay'],
      schedule: 'Chủ nhật',
      duration: '5 ngày 4 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 6,
      title: 'Du lịch Hà Nội - Vịnh Hạ Long - Ninh Bình',
      price: 6250000,
      originalPrice: 6500000,
      discount: 4,
      transport: ['Ô tô'],
      schedule: 'Thứ 3, 7',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.7,
      reviews: 120
    }
  ],
  south: [
    {
      id: 7,
      title: 'Du lịch Phú Quốc - Thiên đường biển đảo',
      price: 5400000,
      transport: ['Máy bay'],
      schedule: 'Hằng ngày',
      duration: '3 ngày 2 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.9,
      reviews: 230
    },
    {
      id: 8,
      title: 'Du lịch Côn Đảo - Hành trình di sản',
      price: 8900000,
      originalPrice: 9500000,
      discount: 6,
      transport: ['Máy bay'],
      schedule: 'Thứ 2, 5',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.8,
      reviews: 85
    }
  ],
  // Thêm dữ liệu tour nước ngoài
  asia: [
    {
      id: 101,
      title: 'Du lịch Malaysia - Singapore [Thủy cung S.E.A AQUARIUM]',
      price: 12990000,
      transport: ['Ô tô', 'Máy bay'],
      schedule: 'Thứ 2 hằng tuần',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 102,
      title: 'Du lịch Hàn Quốc - Hoa anh đào',
      price: 23000000,
      originalPrice: 29000000,
      discount: 21,
      transport: ['Máy bay'],
      schedule: 'Thứ 7 hằng tuần',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.9,
      reviews: 120
    }
  ],
  europe: [
    {
      id: 103,
      title: 'Du lịch Pháp - Thụy Sĩ - Ý',
      price: 79900000,
      transport: ['Máy bay'],
      schedule: 'Thứ 4 hằng tuần',
      duration: '9 ngày 8 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.9,
      reviews: 87
    }
  ],
  america: [
    {
      id: 104,
      title: 'Du thuyền 5 Sao Voyager Of The Seas',
      price: 25900000,
      transport: ['Du thuyền', 'Máy bay'],
      schedule: 'Thứ 4 hằng tuần',
      duration: '4 ngày 3 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.7,
      reviews: 92
    }
  ],
  australia: [
    {
      id: 105,
      title: 'Du lịch Úc - Sydney - Melbourne',
      price: 69000000,
      originalPrice: 72000000,
      discount: 4,
      transport: ['Máy bay'],
      schedule: 'Thứ 5 hằng tuần',
      duration: '7 ngày 6 đêm',
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
      rating: 4.8,
      reviews: 65
    }
  ]
})

// Tab hiện tại
const activeTab = ref('central')

// Hàm chọn tab
const selectTab = (tab) => {
  activeTab.value = tab
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
  <div class="tours-page">
    <div class="hero-section py-5 mb-4 bg-light">
      <div class="container">
        <h1 class="display-5 fw-bold mb-3 text-center">Tour du lịch</h1>
        <p class="lead text-center">Tour du lịch trong nước và quốc tế với chi phí hợp lý nhất</p>
      </div>
    </div>
    
    <div class="container">
      <!-- Filter Section -->
      <div class="filter-section mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">Lọc tour</h5>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label class="form-label">Điểm đến</label>
                <select class="form-select">
                  <option selected>Tất cả</option>
                  <option>Trong nước</option>
                  <option>Nước ngoài</option>
                </select>
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">Giá tour</label>
                <select class="form-select">
                  <option selected>Tất cả</option>
                  <option>Dưới 3 triệu</option>
                  <option>3 - 5 triệu</option>
                  <option>5 - 10 triệu</option>
                  <option>10 - 20 triệu</option>
                  <option>20 - 50 triệu</option>
                  <option>Trên 50 triệu</option>
                </select>
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">Thời gian</label>
                <select class="form-select">
                  <option selected>Tất cả</option>
                  <option>1-2 ngày</option>
                  <option>3-5 ngày</option>
                  <option>6-10 ngày</option>
                  <option>Trên 10 ngày</option>
                </select>
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">&nbsp;</label>
                <button class="btn btn-primary w-100">Tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tabs -->
      <ul class="nav nav-tabs mb-4" id="toursTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'central' }" 
            @click="selectTab('central')" 
            type="button"
          >
            Miền Trung
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'north' }" 
            @click="selectTab('north')" 
            type="button"
          >
            Miền Bắc
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'south' }" 
            @click="selectTab('south')" 
            type="button"
          >
            Miền Nam
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'asia' }" 
            @click="selectTab('asia')" 
            type="button"
          >
            Châu Á
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'europe' }" 
            @click="selectTab('europe')" 
            type="button"
          >
            Châu Âu
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'america' }" 
            @click="selectTab('america')" 
            type="button"
          >
            Châu Mỹ
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'australia' }" 
            @click="selectTab('australia')" 
            type="button"
          >
            Châu Úc
          </button>
        </li>
      </ul>
      
      <!-- Tour Lists -->
      <!-- Domestic Tours -->
      <div class="tour-listings mb-5">
        <div v-if="activeTab === 'central'" class="row">
          <div v-for="tour in tours.central" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="activeTab === 'north'" class="row">
          <div v-for="tour in tours.north" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="activeTab === 'south'" class="row">
          <div v-for="tour in tours.south" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- International Tours -->
        <div v-if="activeTab === 'asia'" class="row">
          <div v-for="tour in tours.asia" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'europe'" class="row">
          <div v-for="tour in tours.europe" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'america'" class="row">
          <div v-for="tour in tours.america" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'australia'" class="row">
          <div v-for="tour in tours.australia" :key="tour.id" class="col-md-4 mb-4">
            <div class="card h-100 tour-card">
              <div class="position-relative">
                <img :src="tour.image" class="card-img-top" :alt="tour.title">
                <div v-if="tour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              <div class="card-body">
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
                    <i :class="getTransportIcon(type)"></i> Di chuyển bằng {{ type }}
                  </span>
                </div>
                <div class="tour-schedule">
                  <div class="mb-1"><i class="bi bi-calendar3"></i> Khởi hành: {{ tour.schedule }}</div>
                  <div v-if="tour.duration"><i class="bi bi-clock"></i> Thời gian: {{ tour.duration }}</div>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 d-grid">
                <router-link :to="'/tour/' + tour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
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
.discount-badge {
  font-weight: bold;
}
.card-title {
  font-size: 1rem;
  font-weight: 500;
  height: 3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.tour-rating {
  color: #6c757d;
  font-size: 0.9rem;
}
</style> 