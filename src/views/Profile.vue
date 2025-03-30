<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isEditing = ref(false)
const isUploading = ref(false)
const avatarPreview = ref(null)
const successMessage = ref('')
const errorMessage = ref('')
const token = localStorage.getItem('token')
const baseUrl = import.meta.env.VITE_BASE_URL
const userDataa = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
// User data
const userData = ref({
  email: '',
  password: '',
  full_name: '',
  phone: '',
  avatar: '',
  address: ''
})


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
        router.push('/');
    })
    .catch((e) => {
        // toast.error(e.response?.data?.message);
    })
    .finally(() => {
        // loadinglogout.value = false;
    });
}

const getUser = async() => {
    // loading.value = true;
    await axios.get(`${baseUrl}/users/${userDataa?._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
      userData.value = res.data.data;
    })
    .catch((e) => {
        toast.error(e.response?.data?.message);
    }).finally(() => {
        // loading.value = false;
    });
};
getUser();



// Copy for editing
const editData = ref({...userData.value})

onMounted(() => {
  // Check if user is logged in
  if (userDataa === null) {
    router.push('/login')
    return
  }
  
  // For demo, we'll use the sample data directly
  userData.value = {
    email: "nguyenviethoang@gmail.com",
    password: "210203",
    fullname: "Nguyễn Việt Hoàng",
    phone: "0984567123",
    avatar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/4f/7d/fc/caption.jpg?w=1200&h=1200&s=1",
    address: "Hà Đông, Hà Nội"
  }
  
  // Initialize edit data
  editData.value = {...userData.value}
})

const startEditing = () => {
  editData.value = {...userData.value}
  isEditing.value = true
  successMessage.value = ''
  errorMessage.value = ''
}

const cancelEditing = () => {
  isEditing.value = false
  errorMessage.value = ''
}

const saveChanges = async() => {
  // Validate
  if (!editData.value.fullname.trim()) {
    errorMessage.value = 'Vui lòng nhập họ tên'
    return
  }
  
  if (!editData.value.phone.trim()) {
    errorMessage.value = 'Vui lòng nhập số điện thoại'
    return
  }
  
  if (!editData.value.email.trim()) {
    errorMessage.value = 'Vui lòng nhập email'
    return
  }
  
  // In a real app, you would send this data to your API
  userData.value = {...editData.value}
  await axios.patch(`${baseUrl}/users/${userDataa._id}`, editData.value, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        // toast.success(res.data.message);
        successMessage.value = 'Thông tin của bạn đã được cập nhật thành công!'
    })
    .catch((e) => {
        toast.error(e.response?.data?.message || 'update failed!Please try again!');
    }).finally(() => {
        // loading.value = false;
    });
  
  // Save to localStorage for demo purposes
  
  // Show success message
  isEditing.value = false
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    isUploading.value = true
    
    // Create preview URL
    avatarPreview.value = URL.createObjectURL(file)
    
    // In a real app, you would upload the file to a server
    // For demo purposes, we'll just update the preview and simulate upload
    setTimeout(() => {
      editData.value.avatar = avatarPreview.value
      isUploading.value = false
    }, 1000)
  }
}

const changePassword = () => {
  // This would open a password change modal in a real app
  alert('Tính năng đổi mật khẩu sẽ được triển khai sau')
}
</script>

<template>
  <div class="profile-page py-5">
    <div class="container">
      <div class="row">
        <!-- Left sidebar -->
        <div class="col-md-3 mb-4 p-2">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center mb-4">
                <div class="avatar-container position-relative mb-3">
                  <img 
                    :src="userData?.avatar || 'https://bootdey.com/img/Content/avatar/avatar7.png'" 
                    alt="Avatar" 
                    class="rounded-circle" 
                    width="150"
                    height="150"
                    style="object-fit: cover;"
                  >
                </div>
                <div>
                  <h4 class="mb-0">{{ userData?.fullname }}</h4>
                  <p class="text-muted">{{ userData?.email }}</p>
                </div>
              </div>
              
              <ul class="list-group list-group-flush">
                <li class="list-group-item active d-flex justify-content-between align-items-center px-2">
                  <span>Thông tin cá nhân</span>
                  <i class="bi bi-person text-white"></i>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center px-2">
                  <span>Tour yêu thích</span>
                  <i class="bi bi-heart text-primary"></i>
                </li>
                <router-link to="/booking-history" class="list-group-item d-flex justify-content-between align-items-center px-2">
                  <span>Lịch sử đặt tour</span>
                  <i class="bi bi-clock-history text-primary"></i>
                </router-link>
                <li class="list-group-item d-flex justify-content-between align-items-center px-2" @click="handleLogout">
                  <span>Đăng xuất</span>
                  <i class="bi bi-box-arrow-right text-primary"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Main content area - User Profile -->
        <div class="col-md-9">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="card-title">Thông tin cá nhân</h3>
                <div v-if="!isEditing">
                  <button @click="startEditing" class="btn btn-primary">
                    <i class="bi bi-pencil-square me-2"></i>Chỉnh sửa
                  </button>
                </div>
                <div v-else class="d-flex gap-2">
                  <button @click="cancelEditing" class="btn btn-outline-secondary">
                    Hủy
                  </button>
                  <button @click="saveChanges" class="btn btn-primary">
                    <i class="bi bi-check-lg me-2"></i>Lưu thay đổi
                  </button>
                </div>
              </div>
              
              <!-- Success message -->
              <div v-if="successMessage" class="alert alert-success mb-4">
                {{ successMessage }}
              </div>
              
              <!-- Error message -->
              <div v-if="errorMessage" class="alert alert-danger mb-4">
                {{ errorMessage }}
              </div>
              
              <!-- View mode -->
              <div v-if="!isEditing">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="text-muted mb-1">Họ tên</label>
                      <p class="form-control-static">{{ userData?.fullname }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="text-muted mb-1">Email</label>
                      <p class="form-control-static">{{ userData?.email }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="text-muted mb-1">Số điện thoại</label>
                      <p class="form-control-static">{{ userData?.phone }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="text-muted mb-1">Địa chỉ</label>
                      <p class="form-control-static">{{ userData?.address }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="text-muted mb-1">Mật khẩu</label>
                      <p class="form-control-static">••••••••</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Edit mode -->
              <form v-else @submit.prevent="saveChanges">
                <div class="row mb-4">
                  <div class="col-md-12">
                    <div class="text-center mb-3">
                      <div class="position-relative d-inline-block">
                        <img 
                          :src="avatarPreview || editData.avatar || 'https://bootdey.com/img/Content/avatar/avatar7.png'" 
                          alt="Avatar" 
                          class="rounded-circle" 
                          width="150"
                          height="150"
                          style="object-fit: cover;"
                        >
                        <div class="avatar-edit position-absolute bottom-0 end-0">
                          <label for="avatar-upload" class="btn btn-sm btn-primary rounded-circle">
                            <i class="bi bi-camera"></i>
                            <input 
                              type="file" 
                              id="avatar-upload" 
                              @change="handleAvatarChange" 
                              accept="image/*" 
                              class="d-none"
                            >
                          </label>
                        </div>
                      </div>
                      <div v-if="isUploading" class="mt-2">
                        <div class="spinner-border spinner-border-sm text-primary" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        <span class="ms-2">Đang tải ảnh...</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="full_name" class="form-label">Họ tên</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="full_name" 
                        v-model="editData.fullname"
                        required
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        id="email" 
                        readonly
                        v-model="editData.email"
                        required
                      >
                    </div>
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone" class="form-label">Số điện thoại</label>
                      <input 
                        type="tel" 
                        class="form-control" 
                        id="phone" 
                        v-model="editData.phone"
                        required
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="address" class="form-label">Địa chỉ</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="address" 
                        v-model="editData.address"
                      >
                    </div>
                  </div>
                  <div class="col-md-6 mt-2">
                    <div class="form-group">
                      <label for="address" class="form-label">Link avatar</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="avatar" 
                        v-model="editData.avatar"
                      >
                    </div>
                  </div>
                </div>
                
                <div class="row mb-4">
                  <div class="col-12">
                    <button type="button" @click="changePassword" class="btn btn-outline-primary">
                      <i class="bi bi-key me-2"></i>Đổi mật khẩu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background-color: #f8f9fa;
  min-height: 85vh;
}
.form-control-static {
  font-weight: 500;
  margin-bottom: 0;
  min-height: 24px;
}
.list-group-item {
  cursor: pointer;
  transition: all 0.2s;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
.active {
  background-color: #0d6efd;
  color: white;
  border-color: #0d6efd;
}
.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-edit {
  cursor: pointer;
}
</style> 