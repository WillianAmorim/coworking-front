// import { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowLeft, Save, Building2, Plus, X } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";

// const SpaceEdit = () => {
//     // const { id } = useParams();
//     // const navigate = useNavigate();
//     // const { toast } = useToast();

//     // Mock data - em produção viria de uma API
//     const [formData, setFormData] = useState({
//         nome: "Sala de Reunião Alpha",
//         tipo: "Sala de Reunião",
//         area: "25.5",
//         capacidadePessoas: "8",
//         andar: "2",
//         sala: "201",
//         precoHora: "35.00",
//         precoDia: "200.00",
//         descricao: "Sala de reunião moderna e bem equipada, ideal para apresentações e reuniões corporativas. Localizada no 2º andar com vista panorâmica da cidade.",
//         imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop"
//     });

//     const [comodidades, setComodidades] = useState([
//         "TV 55\"", "Ar condicionado", "Mesa de vidro", "Cadeiras ergonômicas", "Wi-Fi", "Whiteboard", "Projetor", "Sistema de som"
//     ]);
//     const [novaComodidade, setNovaComodidade] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Aqui faria a chamada da API para atualizar o espaço
//         // toast({
//         //     title: "Espaço atualizado!",
//         //     description: "As informações foram salvas com sucesso.",
//         // });
//         // navigate(`/espaco/${id}`);
//     };

//     const handleChange = (field: string, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const adicionarComodidade = () => {
//         if (novaComodidade.trim() && !comodidades.includes(novaComodidade.trim())) {
//             setComodidades([...comodidades, novaComodidade.trim()]);
//             setNovaComodidade("");
//         }
//     };

//     const removerComodidade = (index: number) => {
//         setComodidades(comodidades.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="space-y-6">
//             <div className="flex items-center gap-4">
//                 <Button
//                     variant="outline"
//                     size="sm"
//                     // onClick={() => navigate(`/espaco/${id}`)}
//                 >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Voltar
//                 </Button>
//                 <div className="flex-1">
//                     <h1 className="text-3xl font-bold">Editar Espaço</h1>
//                     <p className="text-muted-foreground">
//                         Altere as informações do espaço
//                     </p>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Informações Básicas */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <Building2 className="w-5 h-5" />
//                             Informações Básicas
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="nome">Nome do Espaço*</Label>
//                                 <Input
//                                     id="nome"
//                                     value={formData.nome}
//                                     onChange={(e) => handleChange("nome", e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="tipo">Tipo de Espaço*</Label>
//                                 <Select value={formData.tipo} onValueChange={(value) => handleChange("tipo", value)}>
//                                     <SelectTrigger>
//                                         <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="Sala de Reunião">Sala de Reunião</SelectItem>
//                                         <SelectItem value="Mesa Individual">Mesa Individual</SelectItem>
//                                         <SelectItem value="Auditório">Auditório</SelectItem>
//                                         <SelectItem value="Espaço Colaborativo">Espaço Colaborativo</SelectItem>
//                                         <SelectItem value="Sala Privativa">Sala Privativa</SelectItem>
//                                         <SelectItem value="Espaço de Evento">Espaço de Evento</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="area">Área (m²)*</Label>
//                                 <Input
//                                     id="area"
//                                     type="number"
//                                     step="0.1"
//                                     value={formData.area}
//                                     onChange={(e) => handleChange("area", e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="capacidadePessoas">Capacidade (pessoas)*</Label>
//                                 <Input
//                                     id="capacidadePessoas"
//                                     type="number"
//                                     value={formData.capacidadePessoas}
//                                     onChange={(e) => handleChange("capacidadePessoas", e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="andar">Andar*</Label>
//                                 <Input
//                                     id="andar"
//                                     type="number"
//                                     value={formData.andar}
//                                     onChange={(e) => handleChange("andar", e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="sala">Sala/Identificação*</Label>
//                                 <Input
//                                     id="sala"
//                                     value={formData.sala}
//                                     onChange={(e) => handleChange("sala", e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="descricao">Descrição</Label>
//                             <Textarea
//                                 id="descricao"
//                                 value={formData.descricao}
//                                 onChange={(e) => handleChange("descricao", e.target.value)}
//                                 rows={3}
//                                 placeholder="Descreva as características do espaço..."
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="imageUrl">URL da Imagem</Label>
//                             <Input
//                                 id="imageUrl"
//                                 type="url"
//                                 value={formData.imageUrl}
//                                 onChange={(e) => handleChange("imageUrl", e.target.value)}
//                                 placeholder="https://exemplo.com/imagem.jpg"
//                             />
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Preços */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Preços</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="precoHora">Preço por Hora (R$)*</Label>
//                                 <Input
//                                     id="precoHora"
//                                     type="number"
//                                     step="0.01"
//                                     value={formData.precoHora}
//                                     onChange={(e) => handleChange("precoHora", e.target.value)}
//                                     required
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="precoDia">Preço por Dia (R$)*</Label>
//                                 <Input
//                                     id="precoDia"
//                                     type="number"
//                                     step="0.01"
//                                     value={formData.precoDia}
//                                     onChange={(e) => handleChange("precoDia", e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Comodidades */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Comodidades</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="flex gap-2">
//                             <Input
//                                 value={novaComodidade}
//                                 onChange={(e) => setNovaComodidade(e.target.value)}
//                                 placeholder="Digite uma comodidade..."
//                                 onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarComodidade())}
//                             />
//                             <Button
//                                 type="button"
//                                 onClick={adicionarComodidade}
//                                 disabled={!novaComodidade.trim()}
//                             >
//                                 <Plus className="w-4 h-4 mr-2" />
//                                 Adicionar
//                             </Button>
//                         </div>

//                         <div className="flex flex-wrap gap-2">
//                             {comodidades.map((comodidade, index) => (
//                                 <div key={index} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
//                                     <span className="text-sm">{comodidade}</span>
//                                     <Button
//                                         type="button"
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() => removerComodidade(index)}
//                                         className="h-auto p-1 hover:bg-destructive hover:text-destructive-foreground"
//                                     >
//                                         <X className="w-3 h-3" />
//                                     </Button>
//                                 </div>
//                             ))}
//                         </div>

//                         {comodidades.length === 0 && (
//                             <p className="text-muted-foreground text-sm">
//                                 Nenhuma comodidade adicionada ainda.
//                             </p>
//                         )}
//                     </CardContent>
//                 </Card>

//                 <div className="flex justify-end gap-4">
//                     <Button
//                         type="button"
//                         variant="outline"
//                         // onClick={() => navigate(`/espaco/${id}`)}
//                     >
//                         Cancelar
//                     </Button>
//                     <Button type="submit" className="bg-primary hover:bg-primary-hover">
//                         <Save className="w-4 h-4 mr-2" />
//                         Salvar Alterações
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default SpaceEdit;