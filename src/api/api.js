import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,

  headers: { 
    "API-KEY": "8ae9626f-40c3-410e-9241-66e199dcb1cf" 
  }
})

export const usersAPI = {
  getUsers(pageSize, currentPage) {
    return instance.get(`users?count=${pageSize}&page=${currentPage}`)
    .then( response => response.data)
  },

  setFollow(userId) {
    return instance.post(`follow/${userId}`)
    .then(response => response.data)
  },

  setUnfollow(userId) {
    return instance.delete(`follow/${userId}`)
    .then(response => response.data)
  }
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
    .then(response => response.data)     
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
    .then(response => {
      return response.data
  })
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, {status: status})
    .then(response => response.data)
  },
  savePhoto(file) {
    const formData = new FormData()
    formData.append('image', file)

    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data)
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile)
    .then(response => response.data)
  }
}

export const authAPI = {
  authMe() {
    return instance.get('auth/me')
    .then(response => response.data)
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post('auth/login', {email, password, rememberMe, captcha})
    .then(response => response.data)
  },
  logout() {
    return instance.delete('auth/login')
    .then(response => response.data)
  }
}

export const securityAPI = {
  getCaptcha() {
    return instance.get(`security/get-captcha-url`)
    .then(response => response.data)
  }
}