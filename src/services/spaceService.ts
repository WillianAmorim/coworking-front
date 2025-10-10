import { Space } from '@/app/spaces/types/space';
import api from '@/lib/api';


class SpaceService {

    // listar todos os usuários
    async getSpaces(): Promise<Space[]> {
        try {
            const response = await api.get<Space[]>('/spaces');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw new Error('Falha ao carregar usuários');
        }
    }


    async getSpaceById(id: number): Promise<Space> {
        try {
            const response = await api.get<Space>(`/spaces/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw new Error('Falha ao carregar usuário');
        }
    }

    // async addUserEmployee(data: any): Promise<Users> {
    //     try {
    //         const response = await api.post<Users>(`/users/employee`, data);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Erro ao adicionar usuário:', error);
    //         throw new Error('Falha ao carregar usuário');
    //     }
    // }

    async addSpace(data: any): Promise<Space> {
        try {
            const response = await api.post<Space>(`/spaces`, data);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw new Error('Falha ao carregar usuário');
        }
    }

    // async updateUser(id: number, formData: any): Promise<Users> {
    //     try {
    //         const response = await api.put<Users>(`/users/${id.toString()}`, formData);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Erro ao adicionar usuário:', error);
    //         throw new Error('Falha ao carregar usuário');
    //     }
    // }

    // async deleteUser(id: number): Promise<void> {
    //     try {
    //         await api.delete(`/users/${id}`);
    //     } catch (error) {
    //         console.error('Erro ao deletar usuário:', error);
    //         throw new Error('Falha ao deletar usuário');
    //     }
    // }




}

// Exportar uma instância única do serviço
const spaceService = new SpaceService();
export default spaceService;