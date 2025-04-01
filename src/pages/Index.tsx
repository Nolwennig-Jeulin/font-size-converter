
import React from 'react';
import FontSizeConverter from '@/components/FontSizeConverter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Font Size Converter</h1>
        <p className="text-muted-foreground">Convertissez facilement entre pt et px</p>
      </header>
      
      <main className="w-full max-w-md">
        <FontSizeConverter />
      </main>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Un outil simple pour les designers et développeurs</p>
      </footer>
    </div>
  );
};

export default Index;
