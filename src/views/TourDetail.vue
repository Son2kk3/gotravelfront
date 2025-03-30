<script setup>
import axios from 'axios'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import { toast } from 'vue3-toastify'
const baseUrl = import.meta.env.VITE_BASE_URL
const route = useRoute()
const router = useRouter()
const tourId = ref(route.params.id)
const booking_date = ref()
const userDataa = JSON.parse(localStorage.getItem('userData'))
// Dữ liệu mẫu cho chi tiết tour
const tour = ref({
  id: route.params.id,
  title: 'Du lịch Đà Nẵng - KDL Bà Nà - Hội An - Cố Đô Huế',
  price: 6300000,
  originalPrice: 6500000,
  discount: 3,
  transport: ['Ô tô', 'Máy bay'],
  schedule: 'Thứ 7 hằng tuần',
  duration: '3 ngày 2 đêm',
  rating: 4.8,
  reviews: 120,
  images: [
    'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
    'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
    'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
    'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg'
  ],
  description: 'Du lịch Đà Nẵng - Một thành phố đáng sống, một điểm đến lý tưởng cho du khách với bãi biển Mỹ Khê xinh đẹp, Bà Nà Hills huyền ảo, cầu Rồng biểu tượng của thành phố... Cùng Ant Du lịch khám phá thành phố đáng đến nhất Việt Nam.',
  highlights: [
    'Tham quan Sun World Ba Na Hills - Cầu Vàng',
    'Tham quan phố cổ Hội An - Di sản văn hóa thế giới',
    'Tham quan Đại Nội - Cố đô Huế huyền bí',
    'Thưởng thức ẩm thực đặc sản miền Trung'
  ],
  schedule_details: [
    {
      day: 1,
      title: 'TP.HCM - ĐÀ NẴNG - BÀ NÀ (Ăn trưa, tối)',
      content: 'Quý khách có mặt tại sân bay Tân Sơn Nhất, ga quốc nội. Hướng dẫn viên đón và hỗ trợ Quý khách làm thủ tục đón chuyến bay đi Đà Nẵng. Đến sân bay Đà Nẵng, xe và hướng dẫn đón đoàn đi tham quan:\n\n• Sun World Ba Na Hills (chi phí cáp treo & ăn trưa buffet bao gồm) - Với khí hậu tuyệt vời, cảnh quan thiên nhiên kỳ thú, Bà Nà Hills được mệnh danh là "Sapa của miền Trung".\n• Golden Bridge (Cầu Vàng) - Cây cầu nổi tiếng thế giới nằm trong vườn Thiên Thai của Bà Nà, với thiết kế độc đáo và cảnh quan tuyệt đẹp.\n• Làng Pháp - khu nghỉ dưỡng được xây dựng theo phong cách Pháp.\n• Fantasy Park - khu vui chơi giải trí trong nhà được thiết kế theo phong cách châu Âu.\n\nTrở về Đà Nẵng, Quý khách nhận phòng và nghỉ ngơi. Buổi tối, Quý khách dùng bữa tối và tự do khám phá thành phố Đà Nẵng về đêm.'
    },
    {
      day: 2,
      title: 'ĐÀ NẴNG - HỘI AN (Ăn sáng, trưa, tối)',
      content: 'Quý khách dùng bữa sáng tại khách sạn. Xe đưa đoàn đi tham quan:\n\n• Ngũ Hành Sơn - danh thắng nổi tiếng với 5 ngọn núi đá vôi: Kim, Mộc, Thủy, Hỏa, Thổ, nơi có nhiều hang động, chùa chiền linh thiêng.\n• Phố cổ Hội An - Di sản văn hóa thế giới với những nét kiến trúc cổ xưa qua các công trình Chùa Cầu, Nhà cổ, Hội quán...\n• Tự do mua sắm và chụp hình lưu niệm tại Phố cổ.\n\nBuổi tối, Quý khách dùng bữa tối tại nhà hàng địa phương với các món đặc sản Hội An như Cao lầu, Bánh bao bánh vạc, Mì Quảng... Sau đó tự do tham quan Phố cổ Hội An về đêm với những con phố lung linh ánh đèn lồng. Xe đưa Quý khách về Đà Nẵng, nghỉ đêm tại khách sạn.'
    },
    {
      day: 3,
      title: 'ĐÀ NẴNG - HUẾ - TP.HCM (Ăn sáng, trưa)',
      content: 'Quý khách dùng bữa sáng và trả phòng khách sạn. Xe đưa đoàn đi Huế, di chuyển qua đèo Hải Vân - được mệnh danh là "thiên hạ đệ nhất hùng quan", ngắm cảnh đẹp của biển Lăng Cô. Đến Huế, Quý khách tham quan:\n\n• Đại Nội - Hoàng Thành của 13 vị vua triều Nguyễn với Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành, Thế Miếu, Hiển Lâm Các, Cửu Đỉnh...\n• Chùa Thiên Mụ - Ngôi chùa cổ nhất Cố đô Huế, di tích lịch sử quan trọng của xứ Huế.\n\nBuổi trưa, Quý khách dùng bữa trưa tại nhà hàng với các món đặc sản Huế. Sau đó, xe đưa đoàn ra sân bay Phú Bài, đáp chuyến bay về TP.HCM. Kết thúc chương trình, hẹn gặp lại Quý khách trong những hành trình tiếp theo cùng Ant Du lịch.'
    }
  ],
  included: [
    'Vé máy bay khứ hồi TP.HCM - Đà Nẵng - TP.HCM',
    'Xe du lịch đời mới, máy lạnh suốt tuyến',
    'Khách sạn 4 sao tiêu chuẩn (2 khách/phòng)',
    'Hướng dẫn viên nhiệt tình, kinh nghiệm',
    'Vé tham quan các điểm theo chương trình',
    'Vé cáp treo Bà Nà Hills + ăn trưa buffet',
    'Ăn uống theo chương trình',
    'Bảo hiểm du lịch'
  ],
  excluded: [
    'Đồ uống trong các bữa ăn',
    'Chi phí cá nhân và các chi phí không đề cập trong chương trình',
    'Tiền tip cho hướng dẫn viên và tài xế',
    'Phụ thu phòng đơn (nếu có)'
  ],
  policies: [
    {
      title: 'Chính sách hủy tour',
      content: '- Hủy tour trước 15 ngày: Không mất phí\n- Hủy tour trước 10 ngày: Phí hủy 50% tổng giá tour\n- Hủy tour trước 5 ngày: Phí hủy 70% tổng giá tour\n- Hủy tour dưới 5 ngày: Phí hủy 100% tổng giá tour'
    },
    {
      title: 'Điều kiện đăng ký tour',
      content: '- Khi đăng ký, quý khách vui lòng đóng tiền cọc 50% tổng giá trị tour\n- Thanh toán đầy đủ trước ngày khởi hành 5 ngày'
    }
  ],
  related_tours: [
    {
      id: 2,
      title: 'Du lịch Huế - Hồ Truồi - Đà Nẵng - Suối Khoáng Nóng Núi Thần Tài - KDL Bà Nà',
      price: 5900000,
      originalPrice: 6200000,
      discount: 5,
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg'
    },
    {
      id: 3,
      title: 'Du lịch Nha Trang - Hòn Lao - Dốc Lết',
      price: 3410000,
      originalPrice: 4400000,
      discount: 22,
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg'
    },
    {
      id: 4,
      title: 'Du lịch Đà Lạt - Thành phố mộng mơ',
      price: 4200000,
      originalPrice: 4500000,
      discount: 7,
      image: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg'
    }
  ],
  pricing: {
    adult: {
      price: 7990000,
      label: 'Người Lớn'
    },
    child: {
      price: 5670000,
      label: 'Trẻ em'
    },
    infant: {
      price: 2100000,
      label: 'Em bé'
    }
  }
})

const convertData = (data) => {
  return data?.split(';').map(item => item.trim()).filter(item => item)
}

const convertPolicy = (data) => {
  const policyArr=  data?.split(';').map(item => item.trim()).filter(item => item)
  const policies = []
  policyArr.forEach((item, index) => {
    policies.push({
      title: item.split(':')[0],
      content: item.split(':')[1]
    })
  })
  return policies;
}

const indentifyPricing = (type) => {
  if (type === 'adult') {
    return 'Người lớn'
  } else if (type === 'child') {
    return 'Trẻ em'
  } else {
    return 'Em bé'
  }
}

const convertPricing = (data) => {
  const pricing = {}
  data.forEach(item => {
    pricing[item.type] = {
      price: item.price,
      label: indentifyPricing(item.type)
    }
  })
  return pricing
}

const convertSchedule = (data) => {
  const schedule = []
  data.forEach(item => {
    schedule.push({
      day: item.day,
      title: item.title,
      content: item.content
    })
  })
  return schedule
}

const convertTransport = (data) => { 
  const transport = []
  data?.split(",").forEach(item => {
    transport.push(item.trim().toLowerCase())
  })
  return transport
}

const getTourDetail = async () => {
  axios.get(`${baseUrl}/tour-details/${tourId.value}`)
    .then(response => {
      const data = response.data.tour
      const pricing = response.data.pricing
      tour.value = {
        id: data.id,
        title: data.title,
        price: data.price,
        originalPrice: data.original_price,
        discount: data.discount,
        transport: convertTransport(data?.vehicle),
        schedule: data?.schedule,
        duration: data?.duration,
        rating: data?.rating,
        reviews: data?.reviews,
        images: [data?.thumbnail],
        description: data?.description,
        highlights: convertData(data?.highlights),
        schedule_details: response.data.schedule,
        included: convertData(data?.included),
        excluded: convertData(data?.excluded),
        policies: convertPolicy(data?.policy),
        related_tours: data?.related_tours,
        pricing: convertPricing(pricing),
      }
    })
    .catch(error => {
      console.error(error)
    })
}
watchEffect(getTourDetail)

// Số lượng khách
const passengerCounts = ref({
  adult: 1,
  child: 0,
  infant: 0
})

// Tính tổng tiền cho từng loại khách
const calculateSubtotal = (type) => {
  return passengerCounts.value[type] * tour.value.pricing[type]?.price
}

// Tính tổng tiền cuối cùng
const totalPrice = computed(() => {
  return calculateSubtotal('adult') + calculateSubtotal('child') + calculateSubtotal('infant')
})

// Tăng số lượng khách
const increaseCount = (type) => {
  passengerCounts.value[type]++
}

// Giảm số lượng khách (không cho phép nhỏ hơn 0)
const decreaseCount = (type) => {
  if (passengerCounts.value[type] > 0) {
    passengerCounts.value[type]--
  }
  // Đảm bảo luôn có ít nhất 1 người lớn
  if (type === 'adult' && passengerCounts.value[type] < 1) {
    passengerCounts.value[type] = 1
  }
}

// Hàm định dạng tiền tệ
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value).replace('₫', '₫')
}

// Tính giá sau giảm giá
const discountedPrice = computed(() => {
  if (tour.value.discount && tour.value.originalPrice) {
    return formatCurrency(tour.value.price)
  }
  return formatCurrency(tour.value.price)
})

// Lấy icon cho phương tiện di chuyển
const getTransportIcon = (type) => {
  const icons = {
    'ô tô': 'bi bi-car-front',
    'máy bay': 'bi bi-airplane',
    'Tàu thủy': 'bi bi-ship'
  }
  return icons[type] || 'bi bi-arrow-right-circle'
}

// Xử lý đặt tour
const handleBooking = async() => {
  if (!booking_date.value) {
    toast.error('Vui lòng chọn ngày khởi hành')
    return
  }
  const bookingData = {
    user_id: userDataa._id,
    tour_id: tourId.value,
    booking_date: booking_date.value,
    total_price: totalPrice.value,
    status: 'pending',
    adult_count: passengerCounts.value.adult,
    child_count: passengerCounts.value.child,
    infant_count: passengerCounts.value.infant,
    contact_name: userDataa.fullname,
    contact_email: userDataa.email,
    contact_phone: userDataa.phone,
    special_request: '',
    payment_method: 'cod',
    payment_status: 'pending'
  }
  await axios.post(`${baseUrl}/bookings`, bookingData)
    .then(response => {
      toast.success(response.data.message)
    })
    .catch(error => {
      console.error('Lỗi đặt tour!');
    })
}

// Phần đánh giá
const reviewForm = ref({
  rating: 5,
  name: '',
  email: '',
  content: ''
})

const submitReview = () => {
  alert('Cảm ơn bạn đã gửi đánh giá!')
  reviewForm.value = {
    rating: 5,
    name: '',
    email: '',
    content: ''
  }
}
</script>

<template>
  <div class="tour-detail-page">
    <div class="container py-5">
      <div class="row">
        <!-- Tour Title and Basic Info -->
        <div class="col-12 mb-4">
          <h1 class="fw-bold mb-3">{{ tour.title }}</h1>
          <div class="d-flex align-items-center mb-3">
            <div class="me-4">
              <i class="bi bi-star-fill text-warning"></i>
              <span class="ms-1">{{ tour.rating }} ({{ tour.reviews }} đánh giá)</span>
            </div>
            <div class="me-4">
              <i class="bi bi-clock me-1"></i> {{ tour.duration }}
            </div>
            <div>
              <i class="bi bi-calendar3 me-1"></i> Khởi hành: {{ tour.schedule }}
            </div>
          </div>
        </div>
        
        <!-- Tour Gallery -->
        <div class="col-md-8 mb-4">
          <div class="tour-gallery">
            <div class="row">
              <div class="col-12 mb-3">
                <img :src="tour.images[0]" alt="Tour image" class="img-fluid rounded shadow-sm w-100" style="height: 400px; object-fit: cover;">
              </div>
              <div class="col-4" v-for="(image, index) in tour.images.slice(1, 4)" :key="index">
                <img :src="image" alt="Tour image" class="img-fluid rounded shadow-sm w-100" style="height: 120px; object-fit: cover;">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tour Booking -->
        <div class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Thông tin đặt tour</h5>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 class="text-primary mb-0">{{ discountedPrice }}</h3>
                  <div v-if="tour.discount" class="text-muted text-decoration-line-through">
                    {{ formatCurrency(tour.originalPrice) }}
                  </div>
                </div>
                <div v-if="tour.discount" class="discount-badge bg-danger text-white py-1 px-2 rounded">
                  -{{ tour.discount }}%
                </div>
              </div>
              
              <div class="mb-3">
                <div class="transport-features mb-2">
                  <h6>Phương tiện di chuyển:</h6>
                  <div v-for="(type, index) in tour.transport" :key="index" class="mb-1">
                    <i :class="getTransportIcon(type)"></i> {{ type }}
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="start-date" class="form-label">Ngày khởi hành</label>
                <input type="date" class="form-control" id="start-date" v-model="booking_date">
              </div>
              
              <!-- Booking Table -->
              <div class="booking-table mb-4">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Loại khách</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Tổng giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    Người lớn
                    <tr>
                      <td>{{ tour.pricing?.adult?.label }}</td>
                      <td>
                        <div class="quantity-control d-flex align-items-center">
                          <button @click="decreaseCount('adult')" class="btn btn-sm btn-outline-secondary" :disabled="passengerCounts.adult <= 1">-</button>
                          <input type="text" class="form-control form-control-sm mx-2 text-center" style="width: 50px;" v-model="passengerCounts.adult" readonly>
                          <button @click="increaseCount('adult')" class="btn btn-sm btn-outline-secondary">+</button>
                        </div>
                      </td>
                      <td>{{ formatCurrency(tour.pricing?.adult?.price) }}</td>
                      <td>{{ formatCurrency(calculateSubtotal('adult')) }}</td>
                    </tr>
                    
                    <!-- Trẻ em -->
                    <tr>
                      <td>{{ tour.pricing?.child?.label }}</td>
                      <td>
                        <div class="quantity-control d-flex align-items-center">
                          <button @click="decreaseCount('child')" class="btn btn-sm btn-outline-secondary" :disabled="passengerCounts.child <= 0">-</button>
                          <input type="text" class="form-control form-control-sm mx-2 text-center" style="width: 50px;" v-model="passengerCounts.child" readonly>
                          <button @click="increaseCount('child')" class="btn btn-sm btn-outline-secondary">+</button>
                        </div>
                      </td>
                      <td>{{ formatCurrency(tour?.pricing?.child?.price) }}</td>
                      <td>{{ formatCurrency(calculateSubtotal('child')) }}</td>
                    </tr>
                    
                    <!-- Em bé -->  
                    <tr>
                      <td>{{ tour.pricing?.infant?.label }}</td>
                      <td>
                        <div class="quantity-control d-flex align-items-center">
                          <button @click="decreaseCount('infant')" class="btn btn-sm btn-outline-secondary" :disabled="passengerCounts.infant <= 0">-</button>
                          <input type="text" class="form-control form-control-sm mx-2 text-center" style="width: 50px;" v-model="passengerCounts.infant" readonly>
                          <button @click="increaseCount('infant')" class="btn btn-sm btn-outline-secondary">+</button>
                        </div>
                      </td>
                      <td>{{ formatCurrency(tour.pricing?.infant?.price) }}</td>
                      <td>{{ formatCurrency(calculateSubtotal('infant')) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="3" class="text-end">Tổng tiền:</th>
                      <th class="text-primary">{{ formatCurrency(totalPrice) }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <button @click="handleBooking" class="btn btn-primary w-100 mb-3">Đặt tour ngay</button>
              
              <div class="contact-info text-center">
                <p class="mb-0">Cần hỗ trợ? Gọi cho chúng tôi</p>
                <h5 class="mb-0"><i class="bi bi-telephone-fill"></i> 1900 6750</h5>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tour Tabs -->
        <div class="col-12">
          <ul class="nav nav-tabs mb-4" id="tourDetailTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Tổng quan</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="schedule-tab" data-bs-toggle="tab" data-bs-target="#schedule" type="button" role="tab" aria-controls="schedule" aria-selected="false">Lịch trình</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="policy-tab" data-bs-toggle="tab" data-bs-target="#policy" type="button" role="tab" aria-controls="policy" aria-selected="false">Chính sách</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="false">Đánh giá</button>
            </li>
          </ul>
          
          <div class="tab-content" id="tourDetailTabContent">
            <!-- Overview Tab -->
            <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
              <div class="tour-description mb-4">
                <h4 class="mb-3">Mô tả</h4>
                <p>{{ tour.description }}</p>
              </div>
              
              <div class="tour-highlights mb-4">
                <h4 class="mb-3">Điểm nổi bật</h4>
                <ul class="list-group list-group-flush">
                  <li v-for="(highlight, index) in tour.highlights" :key="index" class="list-group-item bg-light">
                    <i class="bi bi-check-circle-fill text-success me-2"></i> {{ highlight }}
                  </li>
                </ul>
              </div>
              
              <div class="tour-includes mb-4">
                <h4 class="mb-3">Giá tour bao gồm</h4>
                <ul class="list-group list-group-flush">
                  <li v-for="(item, index) in tour.included" :key="index" class="list-group-item bg-light">
                    <i class="bi bi-check-circle-fill text-success me-2"></i> {{ item }}
                  </li>
                </ul>
              </div>
              
              <div class="tour-excludes mb-4">
                <h4 class="mb-3">Giá tour không bao gồm</h4>
                <ul class="list-group list-group-flush">
                  <li v-for="(item, index) in tour.excluded" :key="index" class="list-group-item bg-light">
                    <i class="bi bi-x-circle-fill text-danger me-2"></i> {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Schedule Tab -->
            <div class="tab-pane fade" id="schedule" role="tabpanel" aria-labelledby="schedule-tab">
              <div class="tour-schedule">
                <h4 class="mb-4">Lịch trình chi tiết theo từng ngày</h4>
                
                <div v-for="(day, index) in tour.schedule_details" :key="index" class="day-schedule mb-4">
                  <div class="day-header bg-light p-3 rounded d-flex align-items-center">
                    <div class="day-number bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                      {{ day.day }}
                    </div>
                    <h5 class="mb-0">{{ day.title }}</h5>
                  </div>
                  <div class="day-content p-3 border border-top-0 rounded-bottom">
                    <p class="mb-0 white-space-pre-line">{{ day.content }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Policy Tab -->
            <div class="tab-pane fade" id="policy" role="tabpanel" aria-labelledby="policy-tab">
              <div class="tour-policies">
                <h4 class="mb-4">Điều khoản & Chính sách</h4>
                
                <div v-for="(policy, index) in tour.policies" :key="index" class="policy-item mb-4">
                  <h5 class="mb-3">{{ policy.title }}</h5>
                  <div class="policy-content p-3 bg-light rounded">
                    <p class="mb-0 white-space-pre-line">{{ policy.content }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Review Tab -->
            <div class="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
              <div class="tour-reviews">
                <h4 class="mb-4">Đánh giá từ khách hàng</h4>
                
                <div class="review-summary mb-4 p-4 bg-light rounded">
                  <div class="row align-items-center">
                    <div class="col-md-4 text-center">
                      <h1 class="display-4 fw-bold text-primary">{{ tour.rating }}</h1>
                      <div class="ratings mb-2">
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-half text-warning"></i>
                      </div>
                      <p>{{ tour.reviews }} đánh giá</p>
                    </div>
                    <div class="col-md-8">
                      <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">5 sao (75%)</div>
                      </div>
                      <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">4 sao (20%)</div>
                      </div>
                      <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 5%" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100">3 sao (5%)</div>
                      </div>
                      <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">2 sao (0%)</div>
                      </div>
                      <div class="progress mb-3" style="height: 20px;">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">1 sao (0%)</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="add-review mb-5">
                  <h5 class="mb-3">Viết đánh giá</h5>
                  <form @submit.prevent="submitReview">
                    <div class="mb-3">
                      <label for="rating" class="form-label">Đánh giá của bạn</label>
                      <div class="rating-select">
                        <select v-model="reviewForm.rating" class="form-select">
                          <option value="5">5 sao - Xuất sắc</option>
                          <option value="4">4 sao - Rất tốt</option>
                          <option value="3">3 sao - Khá</option>
                          <option value="2">2 sao - Trung bình</option>
                          <option value="1">1 sao - Không tốt</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="name" class="form-label">Họ tên</label>
                        <input type="text" class="form-control" id="name" v-model="reviewForm.name" required>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="reviewForm.email" required>
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <label for="content" class="form-label">Nội dung đánh giá</label>
                      <textarea class="form-control" id="content" rows="5" v-model="reviewForm.content" required></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Gửi đánh giá</button>
                  </form>
                </div>
                
                <!-- Sample Reviews -->
                <div class="review-list">
                  <div class="review-item mb-4 p-3 border rounded">
                    <div class="review-header d-flex justify-content-between mb-2">
                      <div class="reviewer-info">
                        <h5 class="mb-0">Nguyễn Văn A</h5>
                        <small class="text-muted">Đánh giá vào: 15/03/2023</small>
                      </div>
                      <div class="review-rating">
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                      </div>
                    </div>
                    <div class="review-content">
                      <p class="mb-0">Tour rất tuyệt vời, cảnh đẹp, hướng dẫn viên nhiệt tình, khách sạn sạch sẽ, thức ăn ngon. Sẽ quay lại lần sau.</p>
                    </div>
                  </div>
                  
                  <div class="review-item mb-4 p-3 border rounded">
                    <div class="review-header d-flex justify-content-between mb-2">
                      <div class="reviewer-info">
                        <h5 class="mb-0">Trần Thị B</h5>
                        <small class="text-muted">Đánh giá vào: 10/02/2023</small>
                      </div>
                      <div class="review-rating">
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star text-warning"></i>
                      </div>
                    </div>
                    <div class="review-content">
                      <p class="mb-0">Tour đáng tiền, cảnh đẹp, lịch trình hợp lý. Tuy nhiên thời gian tham quan Hội An hơi ngắn.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Tours -->
        <div class="col-12 mt-5">
          <h3 class="mb-4">Tour liên quan</h3>
          <div class="row">
            <div v-for="relatedTour in tour.related_tours" :key="relatedTour.id" class="col-md-4 mb-4">
              <div class="card h-100 tour-card">
                <div class="position-relative">
                  <img :src="relatedTour.thumbnail" class="card-img-top" :alt="relatedTour.title">
                  <div v-if="relatedTour.discount" class="discount-badge position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                    -{{ relatedTour.discount }}%
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ relatedTour.title }}</h5>
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-primary fw-bold">{{ formatCurrency(relatedTour.price) }}</span>
                    <span v-if="relatedTour.originalPrice" class="text-decoration-line-through text-muted">{{ formatCurrency(relatedTour.originalPrice) }}</span>
                  </div>
                </div>
                <div class="card-footer bg-white border-top-0 d-grid">
                  <router-link :to="'/tour/' + relatedTour.id" class="btn btn-outline-primary">Xem chi tiết</router-link>
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
.white-space-pre-line {
  white-space: pre-line;
}
</style> 