import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/types/form";
import { X, Plus, Trash2 } from "lucide-react";

interface FieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
  onClose: () => void;
}

export const FieldEditor = ({ field, onUpdate, onDelete, onClose }: FieldEditorProps) => {
  const [localField, setLocalField] = useState<FormField>(field);

  const handleSave = () => {
    onUpdate(localField);
    onClose();
  };

  const addOption = () => {
    const newOptions = [...(localField.options || []), ""];
    setLocalField({ ...localField, options: newOptions });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(localField.options || [])];
    newOptions[index] = value;
    setLocalField({ ...localField, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = localField.options?.filter((_, i) => i !== index) || [];
    setLocalField({ ...localField, options: newOptions });
  };

  const needsOptions = ['SELECT', 'CHECKBOX', 'RADIO'].includes(localField.type);

  return (
    <Card className="fixed inset-y-0 right-0 w-80 bg-card border-l border-border shadow-xl z-50">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Editar Campo</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Rótulo do campo</Label>
          <Input
            id="label"
            value={localField.label}
            onChange={(e) => setLocalField({ ...localField, label: e.target.value })}
            placeholder="Digite o rótulo do campo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input
            id="placeholder"
            value={localField.placeholder || ""}
            onChange={(e) => setLocalField({ ...localField, placeholder: e.target.value })}
            placeholder="Texto de ajuda (opcional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={localField.description || ""}
            onChange={(e) => setLocalField({ ...localField, description: e.target.value })}
            placeholder="Descrição adicional do campo (opcional)"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={localField.required || false}
            onCheckedChange={(checked) => setLocalField({ ...localField, required: checked })}
          />
          <Label htmlFor="required">Campo obrigatório</Label>
        </div>

        {needsOptions && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Opções</Label>
              <Button type="button" variant="outline" size="sm" onClick={addOption}>
                <Plus className="w-3 h-3 mr-1" />
                Adicionar
              </Button>
            </div>
            
            <div className="space-y-2">
              {localField.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Opção ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Salvar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};