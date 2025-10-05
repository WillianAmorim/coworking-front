import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, UserPlus, PlusCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const Page = () => {
  // const navigate = useNavigate();

  const stats = [
    {
      title: "Total de Usuários",
      value: "156",
      description: "Funcionários e clientes",
      hover: "shadow-blue-200 rotate-1 scale-105 bg-blue-50",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Funcionários",
      value: "24",
      description: "Membros da equipe",
      hover: "shadow-purple-200",
      icon: UserPlus,
      color: "text-secondary",
    },
    {
      title: "Clientes",
      value: "132",
      description: "Usuários do coworking",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Espaços",
      value: "18",
      description: "Salas disponíveis",
      icon: Building2,
      color: "text-warning",
    },
  ];

  const quickActions = [
    {
      title: "Gerenciar Usuários",
      description: "Visualizar e cadastrar funcionários e clientes",
      icon: Users,
      // action: () => navigate("/usuarios"),
      color: "bg-warning hover:bg-orange-500",
    },
    {
      title: "Gerenciar Espaços",
      description: "Visualizar e cadastrar espaços do coworking",
      icon: Building2,
      // action: () => navigate("/espacos"),
      color: "bg-secondary hover:bg-purple-600",
    },
    {
      title: "Novo Funcionário",
      description: "Cadastrar novo membro da equipe",
      icon: UserPlus,
      // action: () => navigate("/cadastro-funcionario"),
      color: "bg-success hover:bg-green-600",
    },
    {
      title: "Novo Espaço",
      description: "Adicionar novo espaço ao coworking",
      icon: PlusCircle,
      // action: () => navigate("/cadastro-espaco"),
      color: "bg-warning hover:bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard CoWorkspace
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sistema completo de gerenciamento para seu coworking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-card hover:shadow-elegant transition-all duration-300
              hover:scale-105 hover:-translate-y-2 hover:shadow-xl
              cursor-pointer group transform active:scale-100"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-3xl transition-all duration-300">{stat.value}</div>
              <p className="text-xs text-muted-foreground group-hover:text-sm transition-all duration-300">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <action.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <Button
                // onClick={action.action}
                className={`w-full ${action.color} text-white font-medium`}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
