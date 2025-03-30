<script setup>
// Vue 3 Composition API with script setup
</script>

<template>
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 text-left">
          <h5 class="mb-3 text-left">Liên hệ</h5>
          <p>Hỗ trợ trực tuyến 24/7!</p>
          <p>
            <i class="bi bi-telephone-fill me-2"></i> Hotline: 1900 6750<br>
            <i class="bi bi-geo-alt-fill me-2"></i> 11th Floor, TTC Tower, 19 Duy Tan st, Dich Vong Hau ward, Cau Giay dist, Hanoi
          </p>
        </div>
        
        <div class="col-md-2 mb-4">
          <h5 class="mb-3">Dịch vụ</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Trang chủ</router-link></li>
            <li><router-link to="/about" class="text-white text-decoration-none">Giới thiệu</router-link></li>
            <li><router-link to="/tours" class="text-white text-decoration-none">Tour trong nước</router-link></li>
            <li><router-link to="/international" class="text-white text-decoration-none">Tour nước ngoài</router-link></li>
            <li><router-link to="/services" class="text-white text-decoration-none">Dịch vụ tour</router-link></li>
            <li><router-link to="/blog" class="text-white text-decoration-none">Cẩm nang du lịch</router-link></li>
            <li><router-link to="/contact" class="text-white text-decoration-none">Liên hệ</router-link></li>
          </ul>
        </div>
        
        <div class="col-md-3 mb-4">
          <h5 class="mb-3">Chăm sóc khách hàng</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Trang chủ</router-link></li>
            <li><router-link to="/about" class="text-white text-decoration-none">Giới thiệu</router-link></li>
            <li><router-link to="/tours/search?slug=du-lich-trong-nuoc" class="text-white text-decoration-none">Tour trong nước</router-link></li>
            <li><router-link to="/tours/search?region=international" class="text-white text-decoration-none">Tour nước ngoài</router-link></li>
            <li><router-link to="/services" class="text-white text-decoration-none">Dịch vụ tour</router-link></li>
            <li><router-link to="/blog" class="text-white text-decoration-none">Cẩm nang du lịch</router-link></li>
            <li><router-link to="/contact" class="text-white text-decoration-none">Liên hệ</router-link></li>
          </ul>
        </div>
        
        <div class="col-md-3 mb-4">
          <h5 class="mb-3">Chính sách</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Trang chủ</router-link></li>
            <li><router-link to="/about" class="text-white text-decoration-none">Giới thiệu</router-link></li>
            <li><router-link to="/tours/search?slug=du-lich-trong-nuoc" class="text-white text-decoration-none">Tour trong nước</router-link></li>
            <li><router-link to="/tours/search?region=international" class="text-white text-decoration-none">Tour nước ngoài</router-link></li>
            <li><router-link to="/services" class="text-white text-decoration-none">Dịch vụ tour</router-link></li>
            <li><router-link to="/blog" class="text-white text-decoration-none">Cẩm nang du lịch</router-link></li>
            <li><router-link to="/contact" class="text-white text-decoration-none">Liên hệ</router-link></li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <p class="mb-0">© Bản quyền thuộc về <strong>Ant Du lịch</strong> | Cung cấp bởi Sapo</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer a:hover {
  color: #0d6efd !important;
  text-decoration: underline !important;
}
</style> 