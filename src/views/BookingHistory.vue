<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
const router = useRouter()
const bookings = ref([])
const isLoading = ref(false)
const error = ref(null)
const userData = JSON.parse(localStorage.getItem('userData'))
const baseUrl = import.meta.env.VITE_BASE_URL

const getBookingHistory = async () => {
    try {
        isLoading.value = true
        const response = await axios.get(`${baseUrl}/bookings/${userData._id}`)
        bookings.value = response.data.data
        console.log(bookings.value)
    } catch (err) {
        console.error('Error loading booking history:', err)
    } finally {
        isLoading.value = false
    }
}
getBookingHistory()

const cancelBooking = async (bookingId) => {
    try {
        isLoading.value = true
        const response = await axios.patch(`${baseUrl}/bookings/${bookingId}/cancel`)
        toast.success(response.data.message)
        getBookingHistory()
    } catch (err) {
        console.error('Error canceling booking:', err)
        // toast.error(err.response.data.message)
    } finally {
        isLoading.value = false
    }
}

// Định dạng tiền tệ
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value).replace('₫', '₫')
}

// Định dạng ngày
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

// Lấy tên trạng thái hiển thị
const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'pending': return 'bg-warning'
    case 'confirmed': return 'bg-primary'
    case 'completed': return 'bg-success'
    case 'cancelled': return 'bg-danger'
    default: return 'bg-secondary'
  }
}

// Lấy tên trạng thái hiển thị
const getStatusLabel = (status) => {
  switch(status) {
    case 'pending': return 'Chờ xác nhận'
    case 'confirmed': return 'Đã xác nhận'
    case 'completed': return 'Đã hoàn thành'
    case 'cancelled': return 'Đã hủy'
    default: return 'Không xác định'
  }
}

// Lấy tên trạng thái thanh toán
const getPaymentStatusLabel = (status) => {
  switch(status) {
    case 'pending': return 'Chờ thanh toán'
    case 'paid': return 'Đã thanh toán'
    case 'refunded': return 'Đã hoàn tiền'
    default: return 'Không xác định'
  }
}

// Lấy phương thức thanh toán
const getPaymentMethodLabel = (method) => {
  switch(method) {
    case 'bank_transfer': return 'Chuyển khoản ngân hàng'
    case 'cash': return 'Tiền mặt'
    case 'online_payment': return 'Thanh toán trực tuyến'
    case 'cod': return 'Thanh toán khi nhận'
    default: return method
  }
}

// Xem chi tiết booking
const viewBookingDetail = (bookingId) => {
  router.push(`/booking/detail/${bookingId}`)
}

// onMounted(async () => {
//   try {
//     // Trong ứng dụng thực tế, bạn sẽ fetch dữ liệu từ API
//     // const response = await fetch('/api/bookings/history')
//     // const data = await response.json()
//     // bookings.value = data
    
//     // Sử dụng dữ liệu mẫu cho demo
//     bookings.value = [
//       {
//         _id: "67e8089bb8415f4eff3030a7",
//         user_id: "67e7c9cfb07e81e7a7a30d03",
//         tour_id: "67e6b08d4c269235846bcc88",
//         tour: {
//           title: "Du lịch Đà Nẵng - KDL Bà Nà - Hội An - Cố Đô Huế",
//           image: "https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg"
//         },
//         booking_date: "2025-03-29T00:00:00.000+00:00",
//         status: "pending",
//         total_price: 241160000,
//         adult_count: 1,
//         child_count: 2,
//         infant_count: 1,
//         contact_name: "Doan Duy Chinh",
//         contact_email: "doanchinhit21@gmail.com",
//         contact_phone: "0962224796",
//         special_request: "",
//         payment_method: "cod",
//         payment_status: "pending",
//         createdAt: "2025-03-29T14:50:03.428+00:00",
//         updatedAt: "2025-03-29T14:50:03.428+00:00"
//       },
//       // Thêm ví dụ khác với trạng thái khác nhau
//       {
//         _id: "67e8089bb8415f4eff3030a8",
//         user_id: "67e7c9cfb07e81e7a7a30d03",
//         tour_id: "67e6b08d4c269235846bcc89",
//         tour: {
//           title: "Du lịch Phú Quốc - Thiên đường biển đảo",
//           image: "https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg"
//         },
//         booking_date: "2025-04-15T00:00:00.000+00:00",
//         status: "confirmed",
//         total_price: 15400000,
//         adult_count: 2,
//         child_count: 1,
//         infant_count: 0,
//         contact_name: "Doan Duy Chinh",
//         contact_email: "doanchinhit21@gmail.com",
//         contact_phone: "0962224796",
//         special_request: "Yêu cầu phòng view biển",
//         payment_method: "bank_transfer",
//         payment_status: "paid",
//         createdAt: "2025-03-25T10:30:00.428+00:00",
//         updatedAt: "2025-03-25T10:30:00.428+00:00"
//       },
//       {
//         _id: "67e8089bb8415f4eff3030a9",
//         user_id: "67e7c9cfb07e81e7a7a30d03",
//         tour_id: "67e6b08d4c269235846bcc90",
//         tour: {
//           title: "Du lịch Hà Nội - Lào Cai - Sapa - Hạ Long",
//           image: "https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg"
//         },
//         booking_date: "2024-12-20T00:00:00.000+00:00",
//         status: "completed",
//         total_price: 17990000,
//         adult_count: 2,
//         child_count: 0,
//         infant_count: 0,
//         contact_name: "Doan Duy Chinh",
//         contact_email: "doanchinhit21@gmail.com",
//         contact_phone: "0962224796",
//         special_request: "",
//         payment_method: "online_payment",
//         payment_status: "paid",
//         createdAt: "2024-11-15T08:45:22.428+00:00",
//         updatedAt: "2024-12-22T16:30:10.428+00:00"
//       }
//     ]
    
//     isLoading.value = false
//   } catch (err) {
//     console.error('Error loading booking history:', err)
//     error.value = 'Không thể tải lịch sử đặt tour. Vui lòng thử lại sau.'
//     isLoading.value = false
//   }
// })
</script>

<template>
  <div class="booking-history-page py-5">
    <div class="container">
      <div class="row">
        <!-- Left sidebar - có thể tái sử dụng từ trang Profile -->
        <div class="col-md-3 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
              <div class="mb-3">
                <img 
                  :src="userData?.avatar || 'https://bootdey.com/img/Content/avatar/avatar7.png'" 
                  alt="User Avatar" 
                  class="rounded-circle" 
                  width="100"
                  height="100"
                  style="object-fit: cover;"
                >
              </div>
              <h5 class="mb-1">{{ userData?.fullname }}</h5>
              <p class="text-muted small mb-3">{{ userData?.email }}</p>
            </div>
            
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center px-3">
                <router-link to="/profile" class="text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center">
                  <span>Thông tin cá nhân</span>
                  <i class="bi bi-person text-primary"></i>
                </router-link>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-3">
                <router-link to="/wishlist" class="text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center">
                  <span>Tour yêu thích</span>
                  <i class="bi bi-heart text-primary"></i>
                </router-link>
              </li>
              <li class="list-group-item active d-flex justify-content-between align-items-center px-3">
                <router-link to="/booking-history" class="text-decoration-none text-white w-100 d-flex justify-content-between align-items-center">
                  <span>Lịch sử đặt tour</span>
                  <i class="bi bi-clock-history"></i>
                </router-link>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-3">
                <a href="#" class="text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center">
                  <span>Đăng xuất</span>
                  <i class="bi bi-box-arrow-right text-primary"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Main content area - Booking History -->
        <div class="col-md-9">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h3 class="card-title mb-4">Lịch sử đặt tour</h3>
              
              <!-- Loading state -->
              <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Đang tải lịch sử đặt tour...</p>
              </div>
              
              <!-- Error state -->
              <div v-else-if="error" class="alert alert-danger">
                {{ error }}
              </div>
              
              <!-- No bookings -->
              <div v-else-if="bookings.length === 0" class="text-center py-5">
                <i class="bi bi-calendar-x display-1 text-muted"></i>
                <h4 class="mt-3">Bạn chưa có đơn đặt tour nào</h4>
                <p class="text-muted">Hãy khám phá và đặt tour để có những trải nghiệm tuyệt vời!</p>
                <router-link to="/tours" class="btn btn-primary mt-3">Khám phá tour ngay</router-link>
              </div>
              
              <!-- Booking list -->
              <div v-else>
                <!-- <div class="booking-filters mb-4">
                  <div class="row g-2">
                    <div class="col-md-4">
                      <select class="form-select">
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <input type="date" class="form-control" placeholder="Từ ngày">
                    </div>
                    <div class="col-md-4">
                      <input type="date" class="form-control" placeholder="Đến ngày">
                    </div>
                  </div>
                </div> -->
                
                <div class="booking-list">
                  <div v-for="booking in bookings" :key="booking._id" class="booking-item card mb-3 border-0 shadow-sm">
                    <div class="card-body">
                      <div class="row">
                        <!-- Tour image -->
                        <div class="col-md-3">
                          <img :src="booking?.tour_id?.thumbnail" :alt="booking?.tour_id?.title" class="img-fluid rounded" style="height: 120px; width: 100%; object-fit: cover;">
                        </div>
                        
                        <!-- Booking details -->
                        <div class="col-md-6">
                          <h5 class="booking-title mb-2">{{ booking?.tour_id?.title }}</h5>
                          <div class="booking-meta">
                            <div class="mb-1"><i class="bi bi-calendar3 me-2"></i> <strong>Ngày khởi hành:</strong> {{ formatDate(booking?.booking_date) }}</div>
                            <div class="mb-1">
                              <i class="bi bi-people me-2"></i> <strong>Số khách:</strong> 
                              {{ booking?.adult_count }} người lớn{{ booking?.child_count > 0 ? `, ${booking?.child_count} trẻ em` : '' }}{{ booking.infant_count > 0 ? `, ${booking?.infant_count} em bé` : '' }}
                            </div>
                            <div><i class="bi bi-cash-stack me-2"></i> <strong>Tổng tiền:</strong> <span class="text-primary fw-bold">{{ formatCurrency(booking?.total_price) }}</span></div>
                          </div>
                        </div>
                        
                        <!-- Status and actions -->
                        <div class="col-md-3 d-flex flex-column justify-content-between align-items-end">
                          <div class="booking-status text-end">
                            <span class="badge rounded-pill" :class="getStatusBadgeClass(booking.status)">
                              {{ getStatusLabel(booking.status) }}
                            </span>
                            <div class="mt-2 small">
                              <span class="d-block">
                                <i class="bi bi-credit-card me-1"></i> {{ getPaymentMethodLabel(booking.payment_method) }}
                              </span>
                              <span class="d-block mt-1">
                                <i class="bi bi-check-circle me-1"></i> {{ getPaymentStatusLabel(booking.payment_status) }}
                              </span>
                            </div>
                          </div>
                          
                          <div class="booking-actions mt-3">
                            <button @click="cancelBooking(booking._id)" class="btn btn-sm btn-danger">
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer bg-white text-muted small py-2">
                      <i class="bi bi-clock me-1"></i> Đặt ngày {{ formatDate(booking.createdAt) }}
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
</template>

<style scoped>
.booking-history-page {
  background-color: #f8f9fa;
  min-height: 85vh;
}

.list-group-item {
  cursor: pointer;
  transition: all 0.2s;
}

.list-group-item:hover:not(.active) {
  background-color: #f0f0f0;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.booking-item {
  transition: transform 0.2s;
}

.booking-item:hover {
  transform: translateY(-3px);
}

.booking-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>