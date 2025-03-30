<script setup>
// Vue 3 Composition API with script setup
</script>

<template>
  <div class="about-page">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="fw-bold text-center mb-4">Giới thiệu về Go Travel</h1>
          
          <div class="about-image mb-4">
            <img src="https://via.placeholder.com/1200x600" alt="Go Travel" class="img-fluid rounded shadow">
          </div>
          
          <div class="about-content">
            <h3 class="mb-3">Chúng tôi cam kết luôn nỗ lực đem đến những giá trị dịch vụ tốt nhất cho khách hàng</h3>
            
            <p>Go Travel được thành lập vào năm 2010, là một trong những công ty du lịch hàng đầu tại Việt Nam. Chúng tôi tự hào là đối tác tin cậy của hàng nghìn du khách trong và ngoài nước, mang đến cho họ những trải nghiệm du lịch tuyệt vời và đáng nhớ.</p>
            
            <p>Với đội ngũ nhân viên chuyên nghiệp, nhiệt tình và giàu kinh nghiệm, chúng tôi luôn nỗ lực không ngừng để nâng cao chất lượng dịch vụ và đáp ứng mọi nhu cầu của khách hàng.</p>
            
            <h4 class="mt-4 mb-3">Sứ mệnh của chúng tôi</h4>
            <p>Sứ mệnh của Go Travel là mang đến cho khách hàng những trải nghiệm du lịch tuyệt vời, an toàn và đáng nhớ. Chúng tôi cam kết:</p>
            <ul>
              <li>Cung cấp các dịch vụ du lịch chất lượng cao với giá cả hợp lý</li>
              <li>Tạo ra những tour du lịch độc đáo, phù hợp với nhu cầu của từng khách hàng</li>
              <li>Luôn đặt sự hài lòng và an toàn của khách hàng lên hàng đầu</li>
              <li>Không ngừng đổi mới, sáng tạo để nâng cao chất lượng dịch vụ</li>
              <li>Góp phần phát triển ngành du lịch Việt Nam</li>
            </ul>
            
            <h4 class="mt-4 mb-3">Tại sao chọn Go Travel?</h4>
            <div class="row mt-3">
              <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title"><i class="bi bi-shield-check text-primary me-2"></i>Uy tín hàng đầu</h5>
                    <p class="card-text">Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là đơn vị du lịch uy tín, được hàng nghìn khách hàng tin tưởng.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title"><i class="bi bi-star text-primary me-2"></i>Dịch vụ chất lượng</h5>
                    <p class="card-text">Chúng tôi cam kết cung cấp dịch vụ du lịch chất lượng cao, từ phương tiện đi lại, khách sạn đến nhà hàng và hướng dẫn viên.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title"><i class="bi bi-currency-dollar text-primary me-2"></i>Giá cả hợp lý</h5>
                    <p class="card-text">Chúng tôi cung cấp các tour du lịch với giá cả hợp lý, phù hợp với nhiều đối tượng khách hàng khác nhau.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title"><i class="bi bi-people text-primary me-2"></i>Đội ngũ chuyên nghiệp</h5>
                    <p class="card-text">Đội ngũ nhân viên của chúng tôi được đào tạo bài bản, chuyên nghiệp và giàu kinh nghiệm.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h4 class="mt-4 mb-3">Thông tin liên hệ</h4>
            <div class="row">
              <div class="col-md-4 mb-3">
                <h5>Go Travel Hà Nội</h5>
                <p>
                  11th Floor, TTC Tower, 19 Duy Tan st, Dich Vong Hau ward, Cau Giay dist, Hanoi<br>
                  Điện thoại: 0123 456 789<br>
                  Email: gotravel@hotro.com.vn
                </p>
              </div>
              <div class="col-md-4 mb-3">
                <h5>Go Travel Huế</h5>
                <p>
                  175 Lý Thường Kiệt, Quận Phú Nhận, TP. Huế<br>
                  Điện thoại: 0123 456 789<br>
                  Email: gotravel@hotro.com.vn
                </p>
              </div>
              <div class="col-md-4 mb-3">
                <h5>Go Travel Đà Nẵng</h5>
                <p>
                  20 Lý Thường Kiệt, Quận Hải Châu, TP. Đà Nẵng<br>
                  Điện thoại: 0123 456 789<br>
                  Email: gotravel@hotro.com.vn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-content h3, 
.about-content h4 {
  color: #0d6efd;
}
.about-content p {
  line-height: 1.8;
}
</style> 