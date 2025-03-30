<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL

const route = useRoute()
const router = useRouter()
const blogPost = ref(null)
const isLoading = ref(false)
const error = ref(null)
const relatedPosts = ref([])

const getBlogPost = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${baseUrl}/posts/${route.params.slug}`)
    blogPost.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
watchEffect(getBlogPost)

const getRelatedPosts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/posts`)
    relatedPosts.value = response.data
  } catch (error) {
    console.error(error)
  }
}
watchEffect(getRelatedPosts)
// Định dạng ngày
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Lấy thời gian đọc ước tính (tính dựa trên số từ trong content)
const getReadingTime = (content) => {
  // Loại bỏ HTML tags
  const text = content.replace(/<[^>]*>/g, '')
  // Đếm số từ
  const wordCount = text.split(/\s+/).length
  // Tính thời gian đọc (trung bình 200 từ/phút)
  const readingTime = Math.ceil(wordCount / 200)
  return readingTime
}

// onMounted(async () => {
//   try {
//     const slug = route.params.slug
    
//     // Trong ứng dụng thực tế, bạn sẽ gọi API để lấy bài viết theo slug
//     // const response = await fetch(`/api/blogs/${slug}`)
//     // const data = await response.json()
//     // blogPost.value = data
    
//     // Sử dụng dữ liệu mẫu
//     blogPost.value = {
//       "_id": "67e8d7088909bf5162c8481a",
//       "title": "Ai bảo Đà Lạt chỉ hợp style mơ mộng? Cool ngầu như đôi bạn thân này vẫn có cả rổ ảnh thần thái",
//       "slug": "ai-bao-da-lat-chi-hop-style-mo-mong-cool-ngau-nhu-doi-ban-than-nay-van-co-ca-ro",
//       "excerpt": "Đà Lạt không chỉ nổi tiếng với phong cách mơ mộng, mà còn là điểm đến lý tưởng để thể hiện phong cách cool ngầu. Cùng theo chân đôi bạn thân Đăng Khoa và Ý Nhi khám phá những địa điểm độc đáo tại Đà Lạt với bộ ảnh thần thái.",
//       "content": "<p>Đà Lạt, thành phố ngàn hoa, là một điểm đến không chỉ hấp dẫn với vẻ đẹp lãng mạn mà còn có không ít góc sống ảo tuyệt đẹp cho những ai yêu thích phong cách cá tính và cool ngầu. Câu chuyện của đôi bạn Đăng Khoa và Ý Nhi đã chứng minh rằng Đà Lạt không chỉ có thể phù hợp với phong cách mơ mộng, mà còn có thể mang đến những bức ảnh cool ngầu đầy ấn tượng.</p>\\n\\n<h2>1. Những địa điểm check-in độc đáo</h2>\\n<p>Trong chuyến du xuân tại Đà Lạt, Đăng Khoa và Ý Nhi đã ghé qua các địa điểm nổi tiếng như Làng Cù Lần, Quảng Trường Lâm Viên, hồ Xuân Hương và trường Cao đẳng Sư phạm. Mỗi nơi đều mang đến những bức ảnh độc đáo và mang đậm dấu ấn riêng của đôi bạn thân.</p>\\n\\n<h2>2. Phong cách thời trang đặc biệt</h2>\\n<p>Không theo đuổi phong cách nhẹ nhàng, Đăng Khoa và Ý Nhi chọn trang phục \"all black\" với họa tiết quân đội đầy cá tính. Trước khi đi, cả hai đã dành thời gian Facetime để lên kế hoạch cho bộ ảnh của mình, từ trang phục đến những dáng pose ấn tượng.</p>\\n\\n<h2>3. Thần thái trong từng bức ảnh</h2>\\n<p>Điều quan trọng không phải là nơi chụp ảnh, mà chính là thần thái của người chụp. Đăng Khoa và Ý Nhi đã thể hiện sự tự tin và sáng tạo trong từng bức ảnh, mang đến một bộ ảnh đầy năng lượng và cá tính. Dù là phong cách cool ngầu, nhưng họ vẫn tạo được những khoảnh khắc lãng mạn và đầy thần thái trong từng khung hình.</p>\\n\\n<h2>4. Đà Lạt - Địa điểm cho mọi phong cách</h2>\\n<p>Đà Lạt không chỉ phù hợp với những ai yêu thích phong cách mơ mộng, mà còn là nơi lý tưởng để thể hiện phong cách riêng của mình. Với những địa điểm đa dạng, từ khu vườn hoa đến những con đường mờ sương, Đà Lạt luôn mang đến những góc chụp tuyệt vời cho bất kỳ ai muốn tạo ra những bức ảnh ấn tượng.</p>\\n\\n<p>Với câu chuyện của Đăng Khoa và Ý Nhi, chúng ta có thể thấy rằng, dù theo đuổi phong cách nào, Đà Lạt vẫn là điểm đến lý tưởng để bạn thể hiện cá tính và tạo ra những kỷ niệm đẹp.</p>",
//       "thumbnail": "https://namthientravel.com.vn/wp-content/uploads/2024/09/da-lat.jpg",
//       "author": "Nguyễn Trần Đăng Khoa",
//       "status": "published",
//       "view_count": 0,
//       "createdAt": "2025-03-30T05:30:48.985Z",
//       "updatedAt": "2025-03-30T05:30:48.985Z",
//       "__v": 0
//     }
    
//     // Xử lý nội dung - thay thế \\n\\n bằng xuống dòng thực tế
//     if (blogPost.value.content) {
//       blogPost.value.content = blogPost.value.content.replace(/\\n\\n/g, '')
//     }
    
//     // Lấy các bài viết liên quan (trong ứng dụng thực tế)
//     // const relatedResponse = await fetch(`/api/blogs/related/${blogPost.value._id}`)
//     // relatedPosts.value = await relatedResponse.json()
    
//     // Dữ liệu mẫu cho bài viết liên quan
//     relatedPosts.value = [
//       {
//         _id: '1',
//         title: 'Top 10 địa điểm du lịch không thể bỏ qua khi đến Đà Lạt',
//         slug: 'top-10-dia-diem-du-lich-khong-the-bo-qua-khi-den-da-lat',
//         thumbnail: 'https://stours.vn/wp-content/uploads/2022/12/z3997743858621_b41ce99eb4d7e1753f6ce6d894ff36d4-scaled.jpg',
//         excerpt: 'Đà Lạt không chỉ là thành phố đáng sống nhất Việt Nam mà còn là điểm đến du lịch hấp dẫn với nhiều cảnh đẹp...',
//         createdAt: '2024-12-15T00:00:00.000Z'
//       },
//       {
//         _id: '2',
//         title: 'Kinh nghiệm du lịch Đà Lạt tự túc tiết kiệm',
//         slug: 'kinh-nghiem-du-lich-da-lat-tu-tuc-tiet-kiem',
//         thumbnail: 'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/12/13/cac-dia-diem-check-in-o-ha-long-1-1429.jpg',
//         excerpt: 'Đà Lạt - thành phố mộng mơ, nơi có những bãi biển đẹp nhất hành tinh. Cùng Ant Du lịch khám phá...',
//         createdAt: '2024-11-20T00:00:00.000Z'
//       },
//       {
//         _id: '3',
//         title: 'Mùa nào đẹp nhất để du lịch Đà Lạt?',
//         slug: 'mua-nao-dep-nhat-de-du-lich-da-lat',
//         thumbnail: 'https://ongvove.com/uploads/0005/5390/2024/04/02/gioi-thieu-ve-lao-cai.png',
//         excerpt: 'Đà Lạt đẹp quanh năm, nhưng mỗi mùa lại mang một vẻ đẹp riêng. Cùng Ant Du lịch tìm hiểu mùa nào đẹp nhất để du lịch Đà Lạt...',
//         createdAt: '2024-10-05T00:00:00.000Z'
//       }
//     ]
    
//     isLoading.value = false
//   } catch (err) {
//     console.error('Error loading blog post:', err)
//     error.value = 'Không thể tải bài viết. Vui lòng thử lại sau.'
//     isLoading.value = false
//   }
// })
</script>

<template>
  <div class="blog-detail-page py-5">
    <div class="container">
      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Đang tải bài viết...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <!-- Blog post content -->
      <div v-else class="row">
        <div class="col-lg-8">
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
              <li class="breadcrumb-item"><router-link to="/blog">Blog</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ blogPost.title }}</li>
            </ol>
          </nav>
          
          <!-- Blog header -->
          <div class="blog-header mb-4">
            <h1 class="blog-title mb-3">{{ blogPost.title }}</h1>
            <div class="blog-meta d-flex align-items-center mb-4">
              <div class="author me-4">
                <i class="bi bi-person-circle me-1"></i> {{ blogPost.author }}
              </div>
              <div class="date me-4">
                <i class="bi bi-calendar3 me-1"></i> {{ formatDate(blogPost.createdAt) }}
              </div>
              <div class="reading-time">
                <i class="bi bi-clock me-1"></i> {{ getReadingTime(blogPost.content) }} phút đọc
              </div>
            </div>
          </div>
          
          <!-- Featured image -->
          <div class="blog-featured-image mb-4">
            <img :src="blogPost.thumbnail" :alt="blogPost.title" class="img-fluid rounded">
          </div>
          
          <!-- Blog content -->
          <div class="blog-content mb-5">
            <div class="lead mb-4">
              {{ blogPost.excerpt }}
            </div>
            <div class="content" v-html="blogPost.content"></div>
          </div>
          
          <!-- Tags -->
          <div class="blog-tags mb-5">
            <span class="badge bg-light text-dark me-2 mb-2 p-2">Đà Lạt</span>
            <span class="badge bg-light text-dark me-2 mb-2 p-2">Du lịch</span>
            <span class="badge bg-light text-dark me-2 mb-2 p-2">Chụp ảnh</span>
            <span class="badge bg-light text-dark me-2 mb-2 p-2">Check-in</span>
          </div>
          
          <!-- Author box -->
          <div class="author-box p-4 mb-5 bg-light rounded">
            <div class="row">
              <div class="col-md-2 text-center mb-3 mb-md-0">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Author" class="rounded-circle img-fluid" style="width: 100px; height: 100px; object-fit: cover;">
              </div>
              <div class="col-md-10">
                <h5>{{ blogPost.author }}</h5>
                <p class="text-muted mb-2">Hướng dẫn viên du lịch</p>
                <p class="mb-0">Tác giả với nhiều năm kinh nghiệm trong lĩnh vực du lịch, đặc biệt là các tour khám phá Đà Lạt và các vùng cao nguyên. Luôn tìm tòi và chia sẻ những góc nhìn mới về các địa điểm du lịch nổi tiếng.</p>
              </div>
            </div>
          </div>
          
          <!-- Share buttons -->
          <div class="share-buttons mb-5">
            <h5 class="mb-3">Chia sẻ bài viết</h5>
            <button class="btn btn-primary me-2 mb-2"><i class="bi bi-facebook me-2"></i>Facebook</button>
            <button class="btn btn-info text-white me-2 mb-2"><i class="bi bi-twitter me-2"></i>Twitter</button>
            <button class="btn btn-success me-2 mb-2"><i class="bi bi-whatsapp me-2"></i>WhatsApp</button>
            <button class="btn btn-secondary me-2 mb-2"><i class="bi bi-envelope me-2"></i>Email</button>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Related posts -->
          <div class="sidebar-widget mb-5">
            <h4 class="widget-title mb-4">Bài viết liên quan</h4>
            <div class="related-post mb-3" v-for="post in relatedPosts" :key="post._id">
              <div class="card border-0 shadow-sm">
                <div class="row g-0">
                  <div class="col-4">
                    <img :src="post.thumbnail" class="img-fluid rounded-start h-100" :alt="post.title" style="object-fit: cover;">
                  </div>
                  <div class="col-8">
                    <div class="card-body p-3">
                      <h6 class="card-title mb-1">
                        <router-link :to="`/blog/${post.slug}`" class="text-decoration-none">{{ post.title }}</router-link>
                      </h6>
                      <p class="card-text"><small class="text-muted">{{ formatDate(post.createdAt) }}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Categories -->
          <div class="sidebar-widget mb-5">
            <h4 class="widget-title mb-4">Danh mục</h4>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none">Du lịch trong nước</a>
                <span class="badge bg-primary rounded-pill">14</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none">Du lịch nước ngoài</a>
                <span class="badge bg-primary rounded-pill">8</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none">Kinh nghiệm du lịch</a>
                <span class="badge bg-primary rounded-pill">9</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none">Ẩm thực</a>
                <span class="badge bg-primary rounded-pill">5</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none">Lễ hội - Sự kiện</a>
                <span class="badge bg-primary rounded-pill">3</span>
              </li>
            </ul>
          </div>
          
          <!-- Newsletter -->
          <div class="sidebar-widget bg-light p-4 rounded">
            <h4 class="widget-title mb-3">Đăng ký nhận tin</h4>
            <p class="mb-4">Đăng ký để nhận những thông tin mới nhất về du lịch và các ưu đãi hấp dẫn</p>
            <form>
              <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email của bạn">
              </div>
              <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-detail-page {
  background-color: #f8f9fa;
}

.blog-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.blog-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.blog-content p {
  margin-bottom: 1.5rem;
}

.widget-title {
  position: relative;
  padding-bottom: 15px;
  font-weight: 600;
}

.widget-title:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: #0d6efd;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
}

.related-post .card-title {
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-tags .badge {
  font-weight: normal;
}

.lead {
  font-size: 1.25rem;
  font-weight: 400;
  color: #6c757d;
  border-left: 4px solid #0d6efd;
  padding-left: 1rem;
}

/* Responsive content images */
:deep(.content img) {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 0.25rem;
}
</style>