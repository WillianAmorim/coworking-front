'use client';

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
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import spaceService from "@/services/spaceService";
import { parse } from "path";

const SpaceForm = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [newComodidade, setNewComodidade] = useState("");

    const initialFormData = {
        nome: "",
        tipo: "",
        area: "",
        capacidadePessoas: "",
        andar: "",
        sala: "",
        precoHora: "",
        precoDia: "",
        comodidades: [] as string[],
        images: [] as File[]
    }

    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (field: string, value: string) => {
        // setFormData(prev => ({
        //     ...prev,
        //     [field]: value
        // }));
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

    const teste = async () => {
        const result = await spaceService.getSpaces();
        console.log(result);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formPayload = new FormData();

            // Campos de texto/number
            formPayload.append("nome", formData.nome);
            formPayload.append("tipo", formData.tipo);
            formPayload.append("area", parseFloat(formData.area).toString());
            formPayload.append("capacidadePessoas", parseInt(formData.capacidadePessoas).toString());
            formPayload.append("andar", parseInt(formData.andar).toString());
            formPayload.append("sala", formData.sala);
            formPayload.append("precoHora", parseFloat(formData.precoHora).toString());
            formPayload.append("precoDia", parseFloat(formData.precoDia).toString());


            // Comodidades (array)
            formData.comodidades.forEach((c, index) => {
                formPayload.append(`comodidades[${index}]`, c);
            });

            // Imagens (múltiplos arquivos)
            formData.images.forEach((file) => {
                formPayload.append("images", file);
            });

            await api.post("/spaces", formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Espaço cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar espaço:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6" >
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
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                placeholder="Ex: Sala de Reunião Alpha"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo de Espaço *</Label>
                            <Select
                                value={formData.tipo}
                                onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                            >
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
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, capacidadePessoas: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, andar: e.target.value })}
                                placeholder="Ex: 2"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sala">Identificação da Sala *</Label>
                            <Input
                                id="sala"
                                value={formData.sala}
                                onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, precoHora: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, precoDia: e.target.value })}
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
                                onKeyDown={(e) => {
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

                            {/* Label aciona o input de arquivo */}
                            <label htmlFor="file-upload">
                                <Button type="button" variant="outline" asChild>
                                    <span>Selecionar Imagens</span>
                                </Button>
                            </label>

                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        // adiciona os novos arquivos ao estado
                                        setFormData((prev) => ({
                                            ...prev,
                                            images: [...prev.images, ...Array.from(files)],
                                        }));
                                    }
                                }}
                            />
                        </div>

                        {formData.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {formData.images.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="w-full h-32 object-cover rounded-lg border"
                                        />
                                        <p className="text-xs mt-1 text-muted-foreground truncate">
                                            {file.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary-hover"
                        onChange={handleSubmit}
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
                    <button onClick={teste}>Testeeee</button>
                </div>
            </form>
        </div >
    );
};

export default SpaceForm;