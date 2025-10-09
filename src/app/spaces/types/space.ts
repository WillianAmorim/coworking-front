interface Imagens {
    espacoId: number,
    id: number,
    url: string
}

export interface Space {
    id: number,
    andar: number,
    area: number,
    atualizadoEm?: string,
    comodidades: string[],
    criadoEm?: string,
    imagens: Imagens[],
    nome: string,
    precoDia: number,
    precoHora: number,
    sala: string,
    tipo: string
    capacidadePessoas: number
}