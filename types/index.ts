export interface User {
  id: number
  email: string
  password: string
  studentId: string
  name: string
  createdAt: Date
  role: 'ADMIN' | 'USER'
  posts: Board[]
}

export interface Board {
  id: number
  title: string
  content: string
  author: User
  authorId: number
  createdAt: Date
  updatedAt: Date
  type: 'Rights' | 'Sports' | 'Campaign' | 'Event' | 'General' | 'Main'
}
