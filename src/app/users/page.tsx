"use client"

import { useState, useEffect} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Search, Filter, Mail, Phone, User, Grid, List, Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";
import { Users } from "@/types/user";

const Page = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  const [users, setUsers] = useState<Users[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // Função para buscar usuários da API
const fetchUsers = async () => {
  try {
    // setLoading(true);
    // setError(null);
    const fetchedUsers = await userService.getUsers();
    console.log(fetchedUsers, "fetchedUsers")
    setUsers(fetchedUsers);
  } catch (err) {
    // setError('Erro ao carregar usuários. Tente novamente.');
    console.error('Erro ao buscar usuários:', err);
  } finally {
    // setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

  const filteredUsers = users.filter((users) => {
  const matchesSearch = users.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    users.email.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesRole = roleFilter === "todos" || users.role === roleFilter;
  return matchesSearch && matchesRole;
});

  const getRoleBadge = (role: string) => {
    return role === "FUNCIONARIO" ? (
      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
        Funcionário
      </Badge>
    ) : (
      <Badge variant="default" className="bg-primary text-primary-foreground">
        Cliente
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie funcionários e clientes do coworking
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => router.push("/users/employeeForm")}
            className="bg-secondary hover:bg-secondary-hover text-secondary-foreground 
                transition-all duration-300 ease-in-out 
                hover:scale-105 hover:shadow-lg hover:shadow-purple-200 
                transform active:scale-95"
          >
            <UserPlus className="w-4 h-4 mr-2 bg-purple-500 hover:bg-purple-600" />
            Novo Funcionário
          </Button>
          <Button
            onClick={() => router.push("/users/clientForm")}
            className="bg-primary hover:bg-primary-hover text-primary-foreground
              transition-all duration-300 ease-in-out 
              hover:scale-105 hover:shadow-lg hover:shadow-blue-200 
              transform active:scale-95"
          >
            <UserPlus className="w-4 h-4 mr-2 bg-blue-500 hover:bg-blue-600" />
            Novo Cliente
          </Button>
        </div>
      </div>

      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="overflow-visible">
          <div className="flex flex-col lg:flex-row gap-4 overflow-visible">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full sm:w-48 relative">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper" 
                    side="bottom" 
                    align="start"
                    className="w-[250px] max-h-[250px]"
                  >
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="FUNCIONARIO">Funcionários</SelectItem>
                    <SelectItem value="CLIENTE">Clientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.nome}</h3>
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{user.contacts?.[0].celular1}</span>
                </div>

                {user.role === "FUNCIONARIO" ? (
                  <div className="space-y-1">
                    <p className="text-sm"><strong>Cargo:</strong> {user.employee.cargo}</p>
                    <p className="text-sm"><strong>Departamento:</strong> {user.employee.departamento}</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm"><strong>Plano:</strong> {user.client.plano}</p>
                    <p className="text-sm"><strong>Tipo:</strong> {user.client.tipoPessoa}</p>
                  </div>
                )}

                <div className="hidden sm:flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/users/view-user/${user.id}`)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/users/edit-user/${user.id}`)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="min-w-0 flex-1 flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{user.nome}</h3>
                          {getRoleBadge(user.role)}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1 min-w-0">
                            <Mail className="w-3 h-3 flex-shrink-0 text-blue-500" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 flex-shrink-0 text-green-500" />
                            <span>{user.contacts?.[0].celular1}</span>
                          </div>
                        </div>
                        {user.role === "funcionario" ? (
                          <div className="text-xs text-muted-foreground mt-1">
                            {user.cargo} • {user.departamento}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground mt-1">
                            {user.plano} • {user.tipoPessoa}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => navigate(`/usuario/${user.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => navigate(`/usuario/${user.id}/editar`)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                    {/* Actions - mobile */}
                    <div className="sm:hidden flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-11 w-11" 
                      >
                        <span className="text-lg">⋯</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum usuário encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Não há usuários que correspondam aos filtros aplicados.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setRoleFilter("todos");
            }}>
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;