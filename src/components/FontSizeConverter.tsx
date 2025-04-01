
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const FontSizeConverter = () => {
  const [ptValue, setPtValue] = useState<string>('12');
  const [pxValue, setPxValue] = useState<string>('16');
  const [previewText, setPreviewText] = useState<string>("Exemple de texte");
  const { toast } = useToast();

  // Conversion functions
  const ptToPx = (pt: number): number => {
    return Math.round(pt * 1.3333333333);
  };

  const pxToPt = (px: number): number => {
    return Math.round((px / 1.3333333333) * 100) / 100;
  };

  // Update values when one changes
  useEffect(() => {
    if (ptValue !== '') {
      const ptNum = parseFloat(ptValue);
      if (!isNaN(ptNum)) {
        setPxValue(ptToPx(ptNum).toString());
      }
    }
  }, [ptValue]);

  useEffect(() => {
    if (pxValue !== '') {
      const pxNum = parseFloat(pxValue);
      if (!isNaN(pxNum)) {
        setPtValue(pxToPt(pxNum).toString());
      }
    }
  }, [pxValue]);

  // Handle input changes
  const handlePtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPtValue(value);
    }
  };

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPxValue(value);
    }
  };

  // Copy to clipboard function
  const copyToClipboard = (value: string, unit: string) => {
    navigator.clipboard.writeText(value + unit).then(() => {
      toast({
        title: "Copié!",
        description: `${value}${unit} a été copié dans le presse-papiers.`,
      });
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier dans le presse-papiers.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center text-primary">Convertisseur de Font-Size</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* PT Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="pt-input" className="text-sm font-medium">Points (pt)</label>
              <button 
                onClick={() => copyToClipboard(ptValue, 'pt')}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Copier
              </button>
            </div>
            <Input
              id="pt-input"
              type="text"
              value={ptValue}
              onChange={handlePtChange}
              className="text-lg font-medium"
              placeholder="Entrez une valeur en pt"
            />
          </div>

          {/* Conversion direction arrows */}
          <div className="flex justify-center space-x-4">
            <ArrowDown className="text-primary animate-pulse" size={24} />
            <ArrowUp className="text-primary animate-pulse" size={24} />
          </div>

          {/* PX Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="px-input" className="text-sm font-medium">Pixels (px)</label>
              <button 
                onClick={() => copyToClipboard(pxValue, 'px')}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Copier
              </button>
            </div>
            <Input
              id="px-input"
              type="text"
              value={pxValue}
              onChange={handlePxChange}
              className="text-lg font-medium"
              placeholder="Entrez une valeur en px"
            />
          </div>

          {/* Preview */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Aperçu</h3>
            <div className="p-4 bg-secondary rounded-md">
              <p 
                className={cn(
                  "font-preview text-center",
                  pxValue === '' ? '' : `text-[${pxValue}px]`
                )}
                style={{ fontSize: `${pxValue}px` }}
              >
                {previewText}
              </p>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                {pxValue}px / {ptValue}pt
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FontSizeConverter;
