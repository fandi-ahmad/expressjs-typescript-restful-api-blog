import prisma from "@/lib/prisma";
import { UserDTO } from "@/interface/userDTO";

export const UserRepository = {
  createUser: async (data: UserDTO) => {
    return await prisma.user.create({ data });
  },

  getUserById: async (id: number) => {
    return await prisma.user.findUnique({ where: { id } })
  },

  getUserByEmail: async (email: string) => {
    return await prisma.user.findFirst({ where: { email } })
  },

  getUserByUsername: async (username: string) => {
    return await prisma.user.findFirst({ where: { username } })
  },

  getAllUsers: async () => {
    return await prisma.user.findMany()
  },

  updateUser: async (id: number, data: UserDTO) => {
    return await prisma.user.update({
      where: { id },
      data: data
    })
  },

  deleteUser: async (id: number) => {
    return await prisma.user.delete({ where: { id } })
  },

  checkConflictEmailAndUsername: async (id: number, email: string, username: string) => {
    return await prisma.user.findFirst({
      where: {
        OR: [
          { email, NOT: { id: id } },
          { username, NOT: { id: id } },
        ],
      },
    });
  }
}