import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Building2, Plus, X, Upload } from "lucide-react";

const SpaceForm = () => {
    // const navigate = useNavigate();
    // const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [newComodidade, setNewComodidade] = useState("");

    const [formData, setFormData] = useState({
        nome: "",
        tipo: "",
        area: "",
        capacidadePessoas: "",
        andar: "",
        sala: "",
        precoHora: "",
        precoDia: "",
        comodidades: [] as string[],
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addComodidade = () => {
        if (newComodidade.trim() && !formData.comodidades.includes(newComodidade.trim())) {
            setFormData(prev => ({
                ...prev,
                comodidades: [...prev.comodidades, newComodidade.trim()]
            }));
            setNewComodidade("");
        }
    };

    const removeComodidade = (comodidade: string) => {
        setFormData(prev => ({
            ...prev,
            comodidades: prev.comodidades.filter(c => c !== comodidade)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simular chamada da API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // toast({
            //     title: "Espaço cadastrado!",
            //     description: "O espaço foi cadastrado com sucesso.",
            // });

            // navigate("/espacos");
        } catch (error) {
            // toast({
            //     title: "Erro ao cadastrar",
            //     description: "Ocorreu um erro ao cadastrar o espaço.",
            //     variant: "destructive",
            // });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    // onClick={() => navigate("/espacos")}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Cadastro de Espaço</h1>
                    <p className="text-muted-foreground">
                        Preencha os dados do novo espaço
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Building2 className="w-5 h-5" />
                            <span>Informações Básicas</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome do Espaço *</Label>
                            <Input
                                id="nome"
                                value={formData.nome}
                                onChange={(e) => handleInputChange("nome", e.target.value)}
                                placeholder="Ex: Sala de Reunião Alpha"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo de Espaço *</Label>
                            <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sala de Reunião">Sala de Reunião</SelectItem>
                                    <SelectItem value="Mesa Individual">Mesa Individual</SelectItem>
                                    <SelectItem value="Espaço Colaborativo">Espaço Colaborativo</SelectItem>
                                    <SelectItem value="Auditório">Auditório</SelectItem>
                                    <SelectItem value="Sala Privativa">Sala Privativa</SelectItem>
                                    <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area">Área (m²) *</Label>
                            <Input
                                id="area"
                                type="number"
                                step="0.1"
                                value={formData.area}
                                onChange={(e) => handleInputChange("area", e.target.value)}
                                placeholder="Ex: 25.5"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacidadePessoas">Capacidade (pessoas) *</Label>
                            <Input
                                id="capacidadePessoas"
                                type="number"
                                value={formData.capacidadePessoas}
                                onChange={(e) => handleInputChange("capacidadePessoas", e.target.value)}
                                placeholder="Ex: 8"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="andar">Andar *</Label>
                            <Input
                                id="andar"
                                type="number"
                                value={formData.andar}
                                onChange={(e) => handleInputChange("andar", e.target.value)}
                                placeholder="Ex: 2"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sala">Identificação da Sala *</Label>
                            <Input
                                id="sala"
                                value={formData.sala}
                                onChange={(e) => handleInputChange("sala", e.target.value)}
                                placeholder="Ex: 201, Térreo, A1"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preços</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="precoHora">Preço por Hora (R$) *</Label>
                            <Input
                                id="precoHora"
                                type="number"
                                step="0.01"
                                value={formData.precoHora}
                                onChange={(e) => handleInputChange("precoHora", e.target.value)}
                                placeholder="Ex: 35.00"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="precoDia">Preço por Dia (R$) *</Label>
                            <Input
                                id="precoDia"
                                type="number"
                                step="0.01"
                                value={formData.precoDia}
                                onChange={(e) => handleInputChange("precoDia", e.target.value)}
                                placeholder="Ex: 200.00"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Comodidades</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex space-x-2">
                            <Input
                                value={newComodidade}
                                onChange={(e) => setNewComodidade(e.target.value)}
                                placeholder="Digite uma comodidade (Ex: TV 55&quot;, Ar condicionado)"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addComodidade();
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                onClick={addComodidade}
                                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        {formData.comodidades.length > 0 && (
                            <div className="space-y-2">
                                <Label>Comodidades adicionadas:</Label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.comodidades.map((comodidade, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center space-x-1 text-sm"
                                        >
                                            <span>{comodidade}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-auto p-0 hover:bg-transparent"
                                                onClick={() => removeComodidade(comodidade)}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Imagens</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Adicione fotos do espaço</h3>
                            <p className="text-muted-foreground mb-4">
                                Arraste e solte suas imagens aqui ou clique para selecionar
                            </p>
                            <Button type="button" variant="outline">
                                Selecionar Imagens
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        // onClick={() => navigate("/espacos")}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary-hover"
                    >
                        {isLoading ? (
                            "Salvando..."
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Salvar Espaço
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SpaceForm;