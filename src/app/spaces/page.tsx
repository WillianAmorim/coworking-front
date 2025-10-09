'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Search, MapPin, Users, DollarSign } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import spaceService from "@/services/spaceService";
import { Space as SpaceType } from "./types/space";
import { useRouter } from "next/navigation";

const Spaces = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [spaces, setSpaces] = useState<SpaceType[]>([]);

    const route = useRouter();

    const fetchSpaces = async () => {
        try {
            const fetchedSpaces = await spaceService.getSpaces();
            console.log('fetchedSpaces');
            console.log(fetchedSpaces);
            setSpaces(fetchedSpaces);
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
        }
    }

    useEffect(() => {
        fetchSpaces();
    }, []);

    const filteredSpaces = spaces?.filter((space: any) =>
        space.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeColor = (tipo: string) => {
        const colors: { [key: string]: string } = {
            "Sala de Reunião": "bg-primary text-primary-foreground",
            "Mesa Individual": "bg-secondary text-secondary-foreground",
            "Auditório": "bg-warning text-warning-foreground",
            "Espaço Colaborativo": "bg-success text-success-foreground",
        };
        return colors[tipo] || "bg-muted text-muted-foreground";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Espaços</h1>
                    <p className="text-muted-foreground">
                        Gerencie os espaços do coworking
                    </p>
                </div>

                <Button
                    onClick={() => route.push("/spaces/register-space")}
                    className="bg-primary hover:bg-primary-hover"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Espaço
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Buscar Espaços</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nome ou tipo de espaço..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSpaces.map((space) => (
                    <Card key={space.id} className="shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden">
                        <div className="relative">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {space.imagens.map((imagem, idx) => (
                                        <CarouselItem key={idx}>
                                            <div className="aspect-video relative">
                                                <img
                                                    src={imagem.url}
                                                    alt={`${space.nome} - ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2 h-8 w-8" />
                                <CarouselNext className="right-2 h-8 w-8" />
                            </Carousel>
                            <div className="absolute top-3 left-3 z-10">
                                <Badge className={getTypeColor(space.tipo)}>
                                    {space.tipo}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="text-xl">{space.nome}</CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{space.andar}º andar - Sala {space.sala}</span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                                        <Building2 className="w-4 h-4" />
                                        <span>Área</span>
                                    </div>
                                    <p className="font-semibold">{space.area}m²</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                                        <Users className="w-4 h-4" />
                                        <span>Capacidade</span>
                                    </div>
                                    <p className="font-semibold">{space.capacidadePessoas} pessoas</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">Comodidades:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {space.comodidades.slice(0, 3).map((comodidade, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {comodidade}
                                        </Badge>
                                    ))}
                                    {space.comodidades.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{space.comodidades.length - 3} mais
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                            <DollarSign className="w-4 h-4" />
                                            <span>Preços</span>
                                        </div>
                                        <div className="text-sm">
                                            <p><strong>Hora:</strong> R$ {space.precoHora.toFixed(2)}</p>
                                            <p><strong>Dia:</strong> R$ {space.precoDia.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                    onClick={() => route.push(`/spaces/view-space/${space.id}`)}
                                    >
                                        Ver Detalhes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredSpaces.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum espaço encontrado</h3>
                        <p className="text-muted-foreground mb-4">
                            Não há espaços que correspondam à sua busca.
                        </p>
                        <Button onClick={() => setSearchTerm("")}>
                            Limpar busca
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Spaces;