import bycrypt from 'bcryptjs'

export const encodePassword = (password) => {
  const salt = bycrypt.genSaltSync(10)
  return bycrypt.hashSync(password, salt)
}

export const verifyPassword = (password, hashedPassword) => {
  return bycrypt.compareSync(password, hashedPassword)
}
