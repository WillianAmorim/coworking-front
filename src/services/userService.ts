import api from '@/lib/api';
import { Users } from '@/types/user';


class UserService {
  
  // listar todos os usuários
  async getUsers(): Promise<Users[]> {
    try {
      const response = await api.get<Users[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Falha ao carregar usuários');
    }
  }

  
  async getUserById(id: number): Promise<Users> {
    try {
      const response = await api.get<Users>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Falha ao carregar usuário');
    }
  }

  

  
  
}

// Exportar uma instância única do serviço
const userService = new UserService();
export default userService;