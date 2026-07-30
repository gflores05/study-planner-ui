import type { UserDTO } from '../dtos/user.dto'
import type { User } from '../types/user.types'

export const UserMapper = {
  fromDTO: (dto: UserDTO): User => ({
    id: dto.id,
    name: dto.name,
    picture: dto.picture,
    email: dto.email
  })
}
