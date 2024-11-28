import axios, { AxiosResponse } from 'axios'
import { ProfileType, PhotosType } from '../types/types'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,

  headers: { 
    "API-KEY": "8ae9626f-40c3-410e-9241-66e199dcb1cf" 
  }
})

export const usersAPI = {
  getUsers(pageSize: number, currentPage: number) {
    return instance.get(`users?count=${pageSize}&page=${currentPage}`)
    .then( response => response.data)
  },

  setFollow(userId: number) {
    return instance.post(`follow/${userId}`)
    .then(response => response.data)
  },

  setUnfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
    .then(response => response.data)
  }
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`)
    .then(response => response.data)     
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
    .then(response => {
      return response.data
  })
  },
  updateStatus(status: string) {
    return instance.put(`profile/status/`, {status: status})
    .then(response => response.data)
  },
  // (file: PhotosType)
  
  savePhoto(file: File) {
    const formData = new FormData()
    formData.append('image', file)

    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data)
    },

    /*
    if(file.small instanceof Blob) {
      formData.append('image', file.small)
    } else{
      if(typeof file.small === 'string') {
        formData.append('image', new Blob([file.small], {type: 'text/plain'}))
      } else {
        console.error('file.small is neither Blob nor string')
      }
    */
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile)
    .then(response => response.data)
  }
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodeCaptcha {
  CaptchaRequired = 10
}

type MeResponseType = {
  data: { id: number, email: string, login: string }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: { userId: number }
  resultCode: ResultCodeEnum
  messages: Array<string>
}


export const authAPI = {
  authMe() {
    return instance.get<MeResponseType>('auth/me')
    .then(response => response.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
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

//instance.get(`auth/me`).then((response: AxiosResponse<string>) => response.data.toUpperCase())
// OR
//instance.get<string>(`auth/me`).then(response => response.data.toLowerCase())
/*
instance.get(`auth/me`).then((response: AxiosResponse<{ login: string }>) => {
  const login = response.data.login
  console.log(login.toLowerCase())
})
  */