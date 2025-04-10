// import React from 'react';
// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';
// import { Button } from './ui/button';
// import { useToast } from '../hooks/use-toast';

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { toast } = useToast();
//   const handleToggleTheme = () => {
//     toggleTheme();
//     // Show toast notification when theme changes
//     toast({
//       title: theme === 'dark' ? '¡Modo claro activado!' : '¡Modo oscuro activado!',
//       description: theme === 'dark'
//         ? 'Cambiando a colores más brillantes'
//         : 'Cambiando a colores más oscuros',
//       duration: 2000,
//     });
//   };

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={handleToggleTheme}
//       aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
//       className="rounded-full transition-colors bg-background hover:bg-accent"
//     >
//       {theme === 'dark' ? (
//         <Sun className="h-5 w-5" aria-hidden="true" />
//       ) : (
//         <Moon className="h-5 w-5" aria-hidden="true" />
//       )}
//     </Button>
//   );
// };

// export default ThemeToggle;
