import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldType } from "@/types/form";
import { 
  Type, 
  Mail, 
  Hash, 
  ChevronDown, 
  CheckSquare, 
  Circle, 
  Calendar, 
  FileText, 
  Upload 
} from "lucide-react";

interface FieldTypeSelectorProps {
  onSelectType: (type: FieldType) => void;
  onClose: () => void;
}

const fieldTypes: Array<{
  type: FieldType;
  label: string;
  icon: typeof Type;
  description: string;
}> = [
  { type: 'TEXT', label: 'Texto', icon: Type, description: 'Campo de texto simples' },
  { type: 'EMAIL', label: 'Email', icon: Mail, description: 'Campo de email com validação' },
  { type: 'NUMBER', label: 'Número', icon: Hash, description: 'Campo numérico' },
  { type: 'SELECT', label: 'Lista suspensa', icon: ChevronDown, description: 'Seleção de uma opção' },
  { type: 'CHECKBOX', label: 'Múltipla escolha', icon: CheckSquare, description: 'Múltiplas seleções' },
  { type: 'RADIO', label: 'Escolha única', icon: Circle, description: 'Uma seleção de múltiplas opções' },
  { type: 'DATE', label: 'Data', icon: Calendar, description: 'Seletor de data' },
  { type: 'TEXTAREA', label: 'Texto longo', icon: FileText, description: 'Campo de texto multilinha' },
  { type: 'FILE', label: 'Arquivo', icon: Upload, description: 'Upload de arquivo' },
];

export const FieldTypeSelector = ({ onSelectType, onClose }: FieldTypeSelectorProps) => {
  return (
    <Card className="absolute top-full left-0 mt-2 p-4 w-80 bg-card shadow-lg border-border z-50">
      <h3 className="text-sm font-medium text-foreground mb-3">Escolha o tipo de campo</h3>
      <div className="grid grid-cols-1 gap-2">
        {fieldTypes.map(({ type, label, icon: Icon, description }) => (
          <Button
            key={type}
            variant="ghost"
            className="justify-start p-3 h-auto text-left hover:bg-muted transition-colors"
            onClick={() => {
              onSelectType(type);
              onClose();
            }}
          >
            <div className="flex items-start gap-3">
              <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};