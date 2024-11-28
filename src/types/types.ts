export type PostType = {
  id: number
  post: string
  likesCount: number
}
export type PhotosType = {
  small: string | null
  large: string | null
}
export type ProfileType = {
  userId: number | null
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  сontacts: object
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
  photos: PhotosType
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
 }

export type DialogType = {
  id: number
  name: string
  img: string
}
export type MessageType = {
  id: number
  message: string
}
 