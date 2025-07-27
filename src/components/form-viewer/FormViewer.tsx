import { useState } from "react";
import { Form, FormSubmission, FieldValue } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormFieldComponent } from "./FormField";
import { useToast } from "@/hooks/use-toast";

interface FormViewerProps {
  form: Form;
  onSubmit?: (submission: FormSubmission) => void;
  readonly?: boolean;
}

export const FormViewer = ({ form, onSubmit, readonly = false }: FormViewerProps) => {
  const [fieldValues, setFieldValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFieldChange = (fieldId: string, value: string | string[]) => {
    setFieldValues({ ...fieldValues, [fieldId]: value });
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors({ ...errors, [fieldId]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    form.fields.forEach(field => {
      const value = fieldValues[field.id];
      
      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.id] = "Este campo é obrigatório";
      }

      if (field.type === 'EMAIL' && value && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.id] = "Email inválido";
        }
      }

      if (field.type === 'NUMBER' && value && typeof value === 'string') {
        if (isNaN(Number(value))) {
          newErrors[field.id] = "Deve ser um número válido";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os erros antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: FormSubmission = {
        id: crypto.randomUUID(),
        formId: form.id,
        fieldValues: Object.entries(fieldValues).map(([fieldId, value]) => ({
          fieldId,
          value: Array.isArray(value) ? value : [value],
        })),
        submittedAt: new Date(),
      };

      if (onSubmit) {
        await onSubmit(submission);
      }

      toast({
        title: "Formulário enviado!",
        description: "Suas respostas foram salvas com sucesso.",
      });

      // Reset form
      setFieldValues({});
      setErrors({});
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{form.name}</CardTitle>
          {form.description && (
            <p className="text-muted-foreground">{form.description}</p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {sortedFields.map((field) => (
            <FormFieldComponent
              key={field.id}
              field={field}
              value={fieldValues[field.id]}
              onChange={(value) => handleFieldChange(field.id, value)}
              error={errors[field.id]}
            />
          ))}
          
          {!readonly && (
            <div className="flex justify-end pt-4 border-t border-border">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="px-8"
              >
                {isSubmitting ? "Enviando..." : "Enviar Formulário"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};