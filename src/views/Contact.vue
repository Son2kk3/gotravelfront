<script setup>
// Vue 3 Composition API with script setup
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  // Xử lý gửi form ở đây
  alert('Cảm ơn bạn đã gửi thông tin liên hệ!')
  // Reset form
  contactForm.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}
</script>

<template>
  <div class="contact-page">
    <div class="container py-5">
      <h1 class="text-center mb-5">Liên hệ</h1>
      
      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="contact-info bg-light p-4 rounded shadow-sm h-100">
            <h3 class="mb-4">Hỗ trợ trực tuyến 24/7!</h3>
            
            <div class="mb-4">
              <h5 class="mb-3">Go Travel Hà Nội</h5>
              <p>
                <i class="bi bi-geo-alt-fill text-primary me-2"></i> 11th Floor, TTC Tower, 19 Duy Tan st, Dich Vong Hau ward, Cau Giay dist, Hanoi<br>
                <i class="bi bi-telephone-fill text-primary me-2"></i> 0123 456 789<br>
                <i class="bi bi-envelope-fill text-primary me-2"></i> gotravel@hotro.com.vn
              </p>
            </div>
            
            <div class="mb-4">
              <h5 class="mb-3">Go Travel Huế</h5>
              <p>
                <i class="bi bi-geo-alt-fill text-primary me-2"></i> 175 Lý Thường Kiệt, Quận Phú Nhận, TP. Huế<br>
                <i class="bi bi-telephone-fill text-primary me-2"></i> 0123 456 789<br>
                <i class="bi bi-envelope-fill text-primary me-2"></i> gotravel@hotro.com.vn
              </p>
            </div>
            
            <div class="mb-4">
              <h5 class="mb-3">Go Travel Đà Nẵng</h5>
              <p>
                <i class="bi bi-geo-alt-fill text-primary me-2"></i> 20 Lý Thường Kiệt, Quận Hải Châu, TP. Đà Nẵng<br>
                <i class="bi bi-telephone-fill text-primary me-2"></i> 0123 456 789<br>
                <i class="bi bi-envelope-fill text-primary me-2"></i> gotravel@hotro.com.vn
              </p>
            </div>
            
            <div class="social-media">
              <h5 class="mb-3">Kết nối với chúng tôi</h5>
              <div class="d-flex">
                <a href="#" class="me-3 fs-4 text-primary"><i class="bi bi-facebook"></i></a>
                <a href="#" class="me-3 fs-4 text-primary"><i class="bi bi-instagram"></i></a>
                <a href="#" class="me-3 fs-4 text-primary"><i class="bi bi-youtube"></i></a>
                <a href="#" class="me-3 fs-4 text-primary"><i class="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="contact-form bg-light p-4 rounded shadow-sm">
            <h3 class="mb-4">Gửi thông tin liên hệ</h3>
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">Họ và tên <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="name" v-model="contactForm.name" required>
              </div>
              
              <div class="mb-3">
                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="email" v-model="contactForm.email" required>
              </div>
              
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại <span class="text-danger">*</span></label>
                <input type="tel" class="form-control" id="phone" v-model="contactForm.phone" required>
              </div>
              
              <div class="mb-3">
                <label for="subject" class="form-label">Tiêu đề <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="subject" v-model="contactForm.subject" required>
              </div>
              
              <div class="mb-3">
                <label for="message" class="form-label">Nội dung <span class="text-danger">*</span></label>
                <textarea class="form-control" id="message" rows="5" v-model="contactForm.message" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Gửi liên hệ</button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="map-section mt-5">
        <h3 class="mb-4 text-center">Bản đồ</h3>
        <div class="ratio ratio-21x9">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580785053!2d106.6526967!3d10.7705687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad027e3727%3A0x2a77b414e887f86d!2zMTc1IEzDvSBUaMaw4budbmcgS2nhu4d0LCBQaMaw4budbmcgNiwgVMOibiBCw6xuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1624517068196!5m2!1svi!2s" allowfullscreen="" loading="lazy" class="border rounded shadow-sm"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page h3 {
  color: #0d6efd;
}
.social-media a {
  transition: transform 0.3s ease;
}
.social-media a:hover {
  transform: translateY(-3px);
}
</style> 