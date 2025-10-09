'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, MapPin, Users, DollarSign, Building2, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import spaceService from "@/services/spaceService";

const mockSpace = {
    id: 1,
    nome: "Sala de Reunião Alpha",
    tipo: "Sala de Reunião",
    area: 25.5,
    capacidadePessoas: 8,
    andar: 2,
    sala: "201",
    precoHora: 35.00,
    precoDia: 200.00,
    comodidades: ["TV 55\"", "Ar condicionado", "Mesa de vidro", "Cadeiras ergonômicas", "Wi-Fi", "Whiteboard", "Projetor", "Sistema de som"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    descricao: "Sala de reunião moderna e bem equipada, ideal para apresentações e reuniões corporativas. Localizada no 2º andar com vista panorâmica da cidade.",
    disponivel: true,
    avaliacaoMedia: 4.8,
    totalAvaliacoes: 24
};

interface ParamsType {
    id: number;
}

const SpaceDetails = ({ params }: { params: Promise<ParamsType> }) => {
    const router = useRouter();
    const { id } = use(params);

    const [space, setSpace] = useState<any>('')

    useEffect(() => {
        if (!id) return

        const getUserById = async () => {
            const resultSpace = await spaceService.getSpaceById(Number(id))
            const resultGetSpaces = await spaceService.getSpaces()
            console.log(resultGetSpaces, "resultGetSpaces")
            console.log(resultSpace, "resultSpace")
            setSpace(resultSpace)
        }

        getUserById()
    }, [id])

    const getTypeColor = (tipo: string) => {
        const colors: { [key: string]: string } = {
            "Sala de Reunião": "bg-primary text-primary-foreground",
            "Mesa Individual": "bg-secondary text-secondary-foreground",
            "Auditório": "bg-warning text-warning-foreground",
            "Espaço Colaborativo": "bg-success text-success-foreground",
        };
        return colors[tipo] || "bg-muted text-muted-foreground";
    };

    // const baseURL = 'http://localhost:3001/api';

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Detalhes do Espaço</h1>
                    <p className="text-muted-foreground">
                        Informações completas do espaço
                    </p>
                </div>
                <Button
                    // onClick={() => navigate(`/espaco/${id}/editar`)}
                    className="bg-primary hover:bg-primary-hover"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informações Principais */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden">
                        <div className="aspect-video relative">
                            <img
                                src={
                                    space.imagens?.[0]
                                        ? `${space.imagens[0].url}`
                                        : '/placeholder.jpg' // ou uma imagem padrão
                                }
                                alt={space.nome}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className={getTypeColor(space.tipo)}>
                                    {space.tipo}
                                </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                                <Badge variant="outline" className="bg-white/90 text-foreground">
                                    {space.disponivel ? "Disponível" : "Indisponível"}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{space.nome}</CardTitle>
                                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{space.andar}º andar - Sala {space.sala}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span>{space.avaliacaoMedia} ({space.totalAvaliacoes} avaliações)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Descrição</h3>
                                <p className="text-muted-foreground">{space.descricao}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">Área</p>
                                    <p className="font-semibold">{space.area}m²</p>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">Capacidade</p>
                                    <p className="font-semibold">{space.capacidadePessoas} pessoas</p>
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">Por Hora</p>
                                    {/* <p className="font-semibold">R$ {space.precoHora.toFixed(2)}</p> */}
                                </div>
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                                    <p className="text-sm text-muted-foreground">Por Dia</p>
                                    {/* <p className="font-semibold">R$ {space.precoDia.toFixed(2)}</p> */}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Comodidades</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {/* {space.comodidades.map((comodidade, index) => (
                                        <Badge key={index} variant="outline" className="text-center justify-center py-2">
                                            {comodidade}
                                        </Badge>
                                    ))} */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar com ações e informações */}
                <div className="space-y-6">
                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Ações Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full bg-primary hover:bg-primary-hover">
                                Agendar Reserva
                            </Button>
                            <Button variant="outline" className="w-full">
                                Ver Calendário
                            </Button>
                            <Button variant="outline" className="w-full">
                                Histórico de Reservas
                            </Button>
                        </CardContent>
                    </Card> */}

                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Técnicas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div><strong>ID:</strong> #{space.id}</div>
                            <div><strong>Localização:</strong> {space.andar}º andar</div>
                            <div><strong>Sala:</strong> {space.sala}</div>
                            <div><strong>Status:</strong> {space.disponivel ? "Ativo" : "Inativo"}</div>
                            <div><strong>Última atualização:</strong> 20/12/2024</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preços</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Por hora</span>
                                <span className="font-semibold">R$ {space.precoHora.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Por dia (8h)</span>
                                <span className="font-semibold">R$ {space.precoDia.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-sm text-muted-foreground">Economia diária</span>
                                <span className="font-semibold text-green-600">
                                    R$ {((space.precoHora * 8) - space.precoDia).toFixed(2)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SpaceDetails;