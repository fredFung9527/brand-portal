export interface Role {
  objectId?: string,
}

export interface User {
  avatar?: string,
  blocked?: boolean,
  createdAt?: string,
  email?: string,
  firstName?: string,
  id?: string,
  isAdmin?: boolean,
  lastName?: string,
  roles?: {
    objectId?: string,
  }[],
  updatedAt?: string,
  username?: string,
}