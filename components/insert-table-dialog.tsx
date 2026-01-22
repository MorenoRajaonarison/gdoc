"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";

/**
 * Composant dialogue pour insérer un tableau dans l'éditeur
 * Permet de sélectionner la taille du tableau via une grille interactive
 */
const InsertTableDialog = () => {
  // État pour contrôler l'ouverture/fermeture du dialogue
  const [open, setOpen] = React.useState(false);
  
  // État pour stocker les dimensions sélectionnées par l'utilisateur (clic)
  const [selectedRows, setSelectedRows] = React.useState(0);
  const [selectedCols, setSelectedCols] = React.useState(0);
  
  // État pour stocker les dimensions survolées par l'utilisateur (hover)
  const [hoveredRows, setHoveredRows] = React.useState(0);
  const [hoveredCols, setHoveredCols] = React.useState(0);
  
  // Récupération de l'instance de l'éditeur depuis le store
  const { editor } = useEditorStore();

  /**
   * Gère le clic sur une cellule de la grille
   * Confirme la sélection du tableau avec les dimensions spécifiées
   * @param row - Index de la ligne (0-based)
   * @param col - Index de la colonne (0-based)
   */
  const handleCellClick = (row: number, col: number) => {
    setSelectedRows(row + 1);
    setSelectedCols(col + 1);
  };

  /**
   * Gère l'insertion du tableau dans l'éditeur
   * Utilise la commande insertTable de TipTap avec les dimensions sélectionnées
   */
  const handleInsertTable = () => {
    // Vérification qu'une sélection valide existe et que l'éditeur est disponible
    if (selectedRows > 0 && selectedCols > 0 && editor) {
      // Insertion du tableau sans ligne d'en-tête
      editor.commands.insertTable({ 
        rows: selectedRows, 
        cols: selectedCols, 
        withHeaderRow: false 
      });
      
      // Fermeture du dialogue et réinitialisation des états
      setOpen(false);
      setSelectedRows(0);
      setSelectedCols(0);
      setHoveredRows(0);
      setHoveredCols(0);
    }
  };

  /**
   * Gère le survol d'une cellule pour la prévisualisation
   * @param row - Index de la ligne survolée (0-based)
   * @param col - Index de la colonne survolée (0-based)
   */
  const handleMouseEnter = (row: number, col: number) => {
    setHoveredRows(row + 1);
    setHoveredCols(col + 1);
  };

  /**
   * Réinitialise les états de survol lorsque la souris quitte la grille
   */
  const handleMouseLeave = () => {
    setHoveredRows(0);
    setHoveredCols(0);
  };

  /**
   * Détermine les dimensions à afficher
   * Priorité à la sélection, sinon affiche le survol
   */
  const displayRows = selectedRows > 0 ? selectedRows : hoveredRows;
  const displayCols = selectedCols > 0 ? selectedCols : hoveredCols;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Bouton déclencheur du dialogue */}
      <DialogTrigger asChild>
        <span className="block w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-neutral-200/80 cursor-pointer">
          Custom ...
        </span>
      </DialogTrigger>
      
      {/* Contenu du dialogue */}
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Insert a table</DialogTitle>
          <DialogDescription>
            Click to select or hover to preview the table size
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Grille interactive de sélection */}
          <div 
            className="inline-block border border-gray-200 p-2"
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, index) => {
                // Calcul de la position de la cellule dans la grille 8x8
                const row = Math.floor(index / 8);
                const col = index % 8;
                
                // Détermination de l'état visuel de la cellule
                const isSelected = row < selectedRows && col < selectedCols;
                const isHovered = row < hoveredRows && col < hoveredCols && !isSelected;
                
                return (
                  <div
                    key={index}
                    // Styles dynamiques selon l'état de la cellule
                    className={cn(
                      "w-6 h-6 border border-gray-300 cursor-pointer transition-colors",
                      isSelected && "bg-blue-500 border-blue-600",
                      isHovered && "bg-blue-200 border-blue-300",
                      !isSelected && !isHovered && "bg-white hover:bg-gray-100"
                    )}
                    // Gestionnaires d'événements
                    onClick={() => handleCellClick(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Affichage des dimensions sélectionnées/survollées */}
          {displayRows > 0 && displayCols > 0 && (
            <div className="text-center text-sm text-gray-600">
              Table {displayRows} × {displayCols}
            </div>
          )}
          
          {/* Bouton de confirmation */}
          <DialogFooter>
            <Button 
              onClick={handleInsertTable}
              // Désactivé si aucune sélection n'a été faite
              disabled={selectedRows === 0 || selectedCols === 0}
            >
              Insert table
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsertTableDialog;
