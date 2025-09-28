"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Search, MapPin, Users, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data - em produção viria de uma API
const mockSpaces = [
    {
        id: 1,
        nome: "Sala de Reunião Alpha",
        tipo: "Sala de Reunião",
        area: 25.5,
        capacidadePessoas: 8,
        andar: 2,
        sala: "201",
        precoHora: 35.00,
        precoDia: 200.00,
        comodidades: ["TV 55\"", "Ar condicionado", "Mesa de vidro", "Cadeiras ergonômicas"],
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop"
    },
    {
        id: 2,
        nome: "Estação de Trabalho Beta",
        tipo: "Mesa Individual",
        area: 4.0,
        capacidadePessoas: 1,
        andar: 1,
        sala: "103",
        precoHora: 15.00,
        precoDia: 80.00,
        comodidades: ["Monitor", "Cadeira ergonômica", "Gaveta", "Tomadas"],
        imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=300&fit=crop"
    },
    {
        id: 3,
        nome: "Auditório Principal",
        tipo: "Auditório",
        area: 120.0,
        capacidadePessoas: 50,
        andar: 1,
        sala: "Térreo",
        precoHora: 150.00,
        precoDia: 800.00,
        comodidades: ["Projetor 4K", "Sistema de som", "Microfones", "Palco", "Ar condicionado"],
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=300&fit=crop"
    },
    {
        id: 4,
        nome: "Sala Colaborativa Gamma",
        tipo: "Espaço Colaborativo",
        area: 35.0,
        capacidadePessoas: 12,
        andar: 3,
        sala: "301",
        precoHora: 45.00,
        precoDia: 280.00,
        comodidades: ["Lousa interativa", "Puffs", "Mesa redonda", "Wi-Fi", "Café"],
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop"
    },
];

const Spaces = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSpaces = mockSpaces.filter((space) =>
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
                    //   onClick={() => navigate("/cadastro-espaco")}
                    className="bg-warning hover:bg-orange-600 text-warning-foreground
transition-all duration-300 ease-in-out 
hover:scale-105 hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-1
transform active:scale-95"
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
                        <div className="aspect-video relative">
                            <img
                                src={space.imageUrl}
                                alt={space.nome}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
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
                                        onClick={() => router.push(`/spaces/${space.id}`)}
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