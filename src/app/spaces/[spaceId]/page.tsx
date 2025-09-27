// import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, MapPin, Users, DollarSign, Building2, Clock, Star } from "lucide-react";

// Mock data - em produção viria de uma API
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

const SpaceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

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
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
        //   onClick={() => navigate("/espacos")}
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
        //   onClick={() => navigate(`/espaco/${id}/editar`)}
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
                src={mockSpace.imageUrl}
                alt={mockSpace.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getTypeColor(mockSpace.tipo)}>
                  {mockSpace.tipo}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-white/90 text-foreground">
                  {mockSpace.disponivel ? "Disponível" : "Indisponível"}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{mockSpace.nome}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mockSpace.andar}º andar - Sala {mockSpace.sala}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{mockSpace.avaliacaoMedia} ({mockSpace.totalAvaliacoes} avaliações)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-muted-foreground">{mockSpace.descricao}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-semibold">{mockSpace.area}m²</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Capacidade</p>
                  <p className="font-semibold">{mockSpace.capacidadePessoas} pessoas</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Por Hora</p>
                  <p className="font-semibold">R$ {mockSpace.precoHora.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Por Dia</p>
                  <p className="font-semibold">R$ {mockSpace.precoDia.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Comodidades</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mockSpace.comodidades.map((comodidade, index) => (
                    <Badge key={index} variant="outline" className="text-center justify-center py-2">
                      {comodidade}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar com ações e informações */}
        <div className="space-y-6">
          <Card>
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
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><strong>ID:</strong> #{mockSpace.id}</div>
              <div><strong>Localização:</strong> {mockSpace.andar}º andar</div>
              <div><strong>Sala:</strong> {mockSpace.sala}</div>
              <div><strong>Status:</strong> {mockSpace.disponivel ? "Ativo" : "Inativo"}</div>
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
                <span className="font-semibold">R$ {mockSpace.precoHora.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Por dia (8h)</span>
                <span className="font-semibold">R$ {mockSpace.precoDia.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">Economia diária</span>
                <span className="font-semibold text-green-600">
                  R$ {((mockSpace.precoHora * 8) - mockSpace.precoDia).toFixed(2)}
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