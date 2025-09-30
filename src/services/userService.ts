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

  async addUserEmployee(data: any): Promise<Users> {
    try {
      const response = await api.post<Users>(`/users/employee`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw new Error('Falha ao carregar usuário');
    }
  }

  async addUserClient(data: any): Promise<Users> {
    try {
      const response = await api.post<Users>(`/users/client`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw new Error('Falha ao carregar usuário');
    }
  }




}

// Exportar uma instância única do serviço
const userService = new UserService();
export default userService;