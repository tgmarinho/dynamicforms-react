import { FormField } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GripVertical, 
  Edit3, 
  Copy, 
  Trash2,
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
import { cn } from "@/lib/utils";

interface DragDropFieldProps {
  field: FormField;
  isActive?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const getFieldIcon = (type: string) => {
  const icons = {
    TEXT: Type,
    EMAIL: Mail,
    NUMBER: Hash,
    SELECT: ChevronDown,
    CHECKBOX: CheckSquare,
    RADIO: Circle,
    DATE: Calendar,
    TEXTAREA: FileText,
    FILE: Upload,
  };
  return icons[type as keyof typeof icons] || Type;
};

const getFieldTypeLabel = (type: string) => {
  const labels = {
    TEXT: 'Texto',
    EMAIL: 'Email',
    NUMBER: 'Número',
    SELECT: 'Lista suspensa',
    CHECKBOX: 'Múltipla escolha',
    RADIO: 'Escolha única',
    DATE: 'Data',
    TEXTAREA: 'Texto longo',
    FILE: 'Arquivo',
  };
  return labels[type as keyof typeof labels] || type;
};

export const DragDropField = ({
  field,
  isActive = false,
  onEdit,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragEnd,
}: DragDropFieldProps) => {
  const Icon = getFieldIcon(field.type);

  return (
    <Card
      className={cn(
        "group relative p-4 cursor-move transition-all duration-200 hover:shadow-md",
        isActive && "ring-2 ring-primary bg-primary/5"
      )}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GripVertical className="w-4 h-4" />
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground truncate">{field.label}</h3>
            {field.required && <Badge variant="secondary" className="text-xs">Obrigatório</Badge>}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{getFieldTypeLabel(field.type)}</span>
            {field.options && field.options.length > 0 && (
              <span>• {field.options.length} opções</span>
            )}
          </div>
          
          {field.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {field.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit3 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDuplicate}>
            <Copy className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};