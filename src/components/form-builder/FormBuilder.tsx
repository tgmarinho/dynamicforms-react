import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FieldType } from "@/types/form";
import { DragDropField } from "./DragDropField";
import { FieldEditor } from "./FieldEditor";
import { FieldTypeSelector } from "./FieldTypeSelector";
import { Plus, Eye, Save } from "lucide-react";

interface FormBuilderProps {
  initialForm?: Form;
  onSave: (form: Form) => void;
  onPreview: (form: Form) => void;
}

export const FormBuilder = ({ initialForm, onSave, onPreview }: FormBuilderProps) => {
  const [form, setForm] = useState<Form>(
    initialForm || {
      id: crypto.randomUUID(),
      name: "Novo Formulário",
      description: "",
      fields: [],
    }
  );
  
  const [activeFieldId, setActiveFieldId] = useState<string>();
  const [showFieldTypes, setShowFieldTypes] = useState(false);
  const [draggedFieldId, setDraggedFieldId] = useState<string>();

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      label: `Campo ${form.fields.length + 1}`,
      type,
      order: form.fields.length,
      required: false,
      options: ['SELECT', 'CHECKBOX', 'RADIO'].includes(type) ? ['Opção 1'] : undefined,
    };

    setForm({ ...form, fields: [...form.fields, newField] });
    setActiveFieldId(newField.id);
  };

  const updateField = (updatedField: FormField) => {
    const updatedFields = form.fields.map(field =>
      field.id === updatedField.id ? updatedField : field
    );
    setForm({ ...form, fields: updatedFields });
  };

  const deleteField = (fieldId: string) => {
    const updatedFields = form.fields.filter(field => field.id !== fieldId);
    setForm({ ...form, fields: updatedFields });
    setActiveFieldId(undefined);
  };

  const duplicateField = (fieldId: string) => {
    const fieldToDuplicate = form.fields.find(field => field.id === fieldId);
    if (fieldToDuplicate) {
      const duplicatedField: FormField = {
        ...fieldToDuplicate,
        id: crypto.randomUUID(),
        label: `${fieldToDuplicate.label} (Cópia)`,
        order: form.fields.length,
      };
      setForm({ ...form, fields: [...form.fields, duplicatedField] });
    }
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const updatedFields = [...form.fields];
    const [movedField] = updatedFields.splice(fromIndex, 1);
    updatedFields.splice(toIndex, 0, movedField);
    
    // Update order property
    updatedFields.forEach((field, index) => {
      field.order = index;
    });
    
    setForm({ ...form, fields: updatedFields });
  };

  const activeField = form.fields.find(field => field.id === activeFieldId);

  return (
    <div className="flex h-screen bg-background">
      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="text-lg font-semibold border-none p-0 focus:ring-0"
                placeholder="Nome do formulário"
              />
              <Textarea
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descrição do formulário (opcional)"
                className="border-none p-0 resize-none focus:ring-0"
                rows={2}
              />
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" onClick={() => onPreview(form)}>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
              <Button onClick={() => onSave(form)}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Form Builder Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-4">
            {form.fields.map((field, index) => (
              <DragDropField
                key={field.id}
                field={field}
                isActive={activeFieldId === field.id}
                onEdit={() => setActiveFieldId(field.id)}
                onDelete={() => deleteField(field.id)}
                onDuplicate={() => duplicateField(field.id)}
                onDragStart={() => setDraggedFieldId(field.id)}
                onDragEnd={() => setDraggedFieldId(undefined)}
              />
            ))}
            
            {/* Add Field Button */}
            <div className="relative">
              <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-center p-8">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-muted-foreground"
                    onClick={() => setShowFieldTypes(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar campo
                  </Button>
                </CardContent>
              </Card>
              
              {showFieldTypes && (
                <FieldTypeSelector
                  onSelectType={addField}
                  onClose={() => setShowFieldTypes(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Field Editor Sidebar */}
      {activeField && (
        <FieldEditor
          field={activeField}
          onUpdate={updateField}
          onDelete={() => deleteField(activeField.id)}
          onClose={() => setActiveFieldId(undefined)}
        />
      )}
    </div>
  );
};