import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Zap, 
  Layers, 
  BarChart3, 
  ArrowRight,
  FormInput,
  Eye,
  Edit3
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: FormInput,
      title: "Campos Dinâmicos",
      description: "Crie formulários com diversos tipos de campos: texto, email, seleção, checkboxes e muito mais."
    },
    {
      icon: Eye,
      title: "Visualização em Tempo Real",
      description: "Veja como seu formulário ficará enquanto o constrói, com preview instantâneo."
    },
    {
      icon: Edit3,
      title: "Editor Intuitivo",
      description: "Interface drag-and-drop simples para organizar e personalizar seus campos."
    },
    {
      icon: BarChart3,
      title: "Coleta de Respostas",
      description: "Sistema completo para receber e gerenciar as respostas dos formulários."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Zap className="w-3 h-3 mr-2" />
            Sistema de Formulários Dinâmicos
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Crie Formulários Como no Google Forms
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Construa formulários personalizados com campos dinâmicos, validação automática e interface intuitiva. 
            Perfeito para eventos, pesquisas e coleta de dados.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="px-8">
              <Link to="/form-builder">
                Começar Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa para criar formulários profissionais
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Criar Seu Primeiro Formulário?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Comece agora mesmo e veja como é fácil criar formulários profissionais e funcionais.
            </p>
            <Button asChild size="lg" className="px-8">
              <Link to="/form-builder">
                <Layers className="w-4 h-4 mr-2" />
                Criar Formulário
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
