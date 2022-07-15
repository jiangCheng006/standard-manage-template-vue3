export interface loginForm {
  username?: string
  password?: string
}

export interface loginResult {
  token?: string
}

export interface sendSmsForm {
  mobilePhone?: string
}
