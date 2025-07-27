import { useState } from "react";
import { FormBuilder } from "@/components/form-builder/FormBuilder";
import { FormViewer } from "@/components/form-viewer/FormViewer";
import { Form, FormSubmission } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ViewMode = 'list' | 'builder' | 'preview';

export const FormBuilderPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [forms, setForms] = useState<Form[]>([]);
  const [currentForm, setCurrentForm] = useState<Form | undefined>();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const { toast } = useToast();

  const handleCreateForm = () => {
    setCurrentForm(undefined);
    setViewMode('builder');
  };

  const handleEditForm = (form: Form) => {
    setCurrentForm(form);
    setViewMode('builder');
  };

  const handlePreviewForm = (form: Form) => {
    setCurrentForm(form);
    setViewMode('preview');
  };

  const handleSaveForm = (form: Form) => {
    const existingIndex = forms.findIndex(f => f.id === form.id);
    
    if (existingIndex >= 0) {
      const updatedForms = [...forms];
      updatedForms[existingIndex] = { ...form, updatedAt: new Date() };
      setForms(updatedForms);
    } else {
      setForms([...forms, { ...form, createdAt: new Date() }]);
    }

    toast({
      title: "Formulário salvo!",
      description: "Seu formulário foi salvo com sucesso.",
    });

    setViewMode('list');
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(f => f.id !== formId));
    setSubmissions(submissions.filter(s => s.formId !== formId));
    
    toast({
      title: "Formulário excluído",
      description: "O formulário foi removido permanentemente.",
    });
  };

  const handleFormSubmission = (submission: FormSubmission) => {
    setSubmissions([...submissions, submission]);
  };

  const getSubmissionCount = (formId: string) => {
    return submissions.filter(s => s.formId === formId).length;
  };

  const renderFormsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Formulários</h1>
          <p className="text-muted-foreground">
            Crie e gerencie formulários dinâmicos para seus eventos
          </p>
        </div>
        <Button onClick={handleCreateForm} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Formulário
        </Button>
      </div>

      {forms.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-muted-foreground space-y-2">
              <p className="text-lg">Nenhum formulário criado ainda</p>
              <p>Comece criando seu primeiro formulário dinâmico</p>
            </div>
            <Button onClick={handleCreateForm} className="mt-4">
              Criar Primeiro Formulário
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <Card key={form.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{form.name}</CardTitle>
                    {form.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {form.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">
                    {form.fields.length} campos
                  </Badge>
                  <Badge variant="outline">
                    {getSubmissionCount(form.id)} respostas
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreviewForm(form)}
                    className="flex-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Visualizar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditForm(form)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteForm(form.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {viewMode === 'list' && (
        <div className="container mx-auto p-6">
          {renderFormsList()}
        </div>
      )}

      {viewMode === 'builder' && (
        <FormBuilder
          initialForm={currentForm}
          onSave={handleSaveForm}
          onPreview={handlePreviewForm}
        />
      )}

      {viewMode === 'preview' && currentForm && (
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Lista
            </Button>
          </div>
          
          <FormViewer
            form={currentForm}
            onSubmit={handleFormSubmission}
          />
        </div>
      )}
    </div>
  );
};