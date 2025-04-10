import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Trash2, ThumbsUp, ThumbsDown, Image, CircleCheck, CircleX } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

// Enhanced comment type with image and utility features
interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: number;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  isAdmin?: boolean;
}

// Form schema with validation
const commentFormSchema = z.object({
  name: z.string().min(1, { message: 'Por favor ingresa tu nombre' }),
  comment: z.string().min(1, { message: 'Por favor ingresa un comentario' }),
  imageUrl: z.string().optional(),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

// Admin password - Normally this would be handled by auth system
const ADMIN_PASSWORD = "admin101churrascas";

// Use localStorage for persistent storage
const getLocalComments = (): Comment[] => {
  if (typeof window === 'undefined') return [];
  const storedComments = localStorage.getItem('productComments');
  return storedComments ? JSON.parse(storedComments) : [];
};

const saveLocalComments = (comments: Comment[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('productComments', JSON.stringify(comments));
  }
};

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // Store status for open/closed indicator
  const [isStoreOpen, setIsStoreOpen] = useState(() => {
    // Get initial state from localStorage or default to true (open)
    const savedStatus = localStorage.getItem('storeStatus');
    return savedStatus !== null ? savedStatus === 'open' : true;
  });
  
  // Get comments from localStorage on component mount
  useEffect(() => {
    setComments(getLocalComments());
  }, []);
  // Update localStorage when store status changes
  const toggleStoreStatus = () => {
    if (isAdmin) {
      const newStatus = !isStoreOpen;
      setIsStoreOpen(newStatus);
      localStorage.setItem('storeStatus', newStatus ? 'open' : 'closed');
      
      // Force other components to update by dispatching a storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'storeStatus',
        newValue: newStatus ? 'open' : 'closed'
      }));
      
      toast.success(`Tienda ${newStatus ? 'abierta' : 'cerrada'}`);
    }
  };

  // Form handling with validation
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      imageUrl: '',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      setSelectedImage(null);
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor sube solo archivos de imagen');
      return;
    }
    
    // Create URL for preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setSelectedImage(file);
  };

  const onSubmit = (values: CommentFormValues) => {
    // Convert image to data URL if present
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        submitWithImage(values, imageUrl);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      submitWithImage(values, undefined);
    }
  };

  const submitWithImage = (values: CommentFormValues, imageUrl?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name: values.name,
      text: values.comment,
      timestamp: Date.now(),
      imageUrl: imageUrl,
      likes: 0,
      dislikes: 0,
      isAdmin,
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    saveLocalComments(updatedComments);
    
    form.reset();
    setImagePreview(null);
    setSelectedImage(null);
    toast.success('¡Gracias por tu comentario!');
  };

  const handleDeleteComment = (commentId: string) => {
    if (!isAdmin) {
      // Show admin login dialog
      setAdminDialogOpen(true);
      return;
    }

    // Admin is already authenticated, proceed with deletion
    deleteComment(commentId);
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminPassword('');
      setAdminDialogOpen(false);
      toast.success('¡Modo administrador activado!');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const deleteComment = (commentId: string) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    saveLocalComments(updatedComments);
    toast.success('Comentario eliminado');
  };

  const updateCommentVote = (commentId: string, type: 'like' | 'dislike') => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        if (type === 'like') {
          return { ...comment, likes: comment.likes + 1 };
        } else {
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
      }
      return comment;
    });
    
    setComments(updatedComments);
    saveLocalComments(updatedComments);
    toast.success(type === 'like' ? 'Comentario marcado como útil' : 'Comentario marcado como no útil');
  };

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-CL', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-churrasca-100 dark:border-churrasca-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-churrasca-600" />
          <h3 className="text-xl font-semibold text-churrasca-900 dark:text-churrasca-50">
            Comentarios de Clientes
          </h3>
        </div>
        {isAdmin && (
          <div className="flex items-center space-x-4">
            {/* Store Status Toggle for Admin */}
            <button
              onClick={toggleStoreStatus}
              className={`flex items-center gap-2 py-1 px-3 rounded-full text-sm ${
                isStoreOpen 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {isStoreOpen ? (
                <>
                  <CircleCheck className="h-4 w-4" />
                  <span>Abierto</span>
                </>
              ) : (
                <>
                  <CircleX className="h-4 w-4" />
                  <span>Cerrado</span>
                </>
              )}
            </button>
            <span className="bg-green-100 text-green-700 text-xs py-1 px-2 rounded-md">Modo Administrador</span>
          </div>
        )}
      </div>

      {/* Comment form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    className="border-churrasca-200 focus-visible:ring-churrasca-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Comparte tu experiencia con nuestras churrascas..."
                    className="min-h-[100px] border-churrasca-200 focus-visible:ring-churrasca-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Image upload section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-churrasca-800 dark:text-churrasca-200">
              Adjuntar imagen (opcional)
            </label>
            
            <div className="flex items-center gap-2">
              <label 
                htmlFor="comment-image" 
                className="cursor-pointer flex items-center gap-2 px-3 py-2 border border-churrasca-200 rounded-md hover:bg-churrasca-50 dark:border-churrasca-700 dark:hover:bg-gray-800"
              >
                <Image className="h-5 w-5 text-churrasca-600" />
                <span className="text-sm">Seleccionar imagen</span>
              </label>
              <input
                id="comment-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="h-24 w-auto object-cover rounded-md border border-churrasca-200" 
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="bg-churrasca-600 hover:bg-churrasca-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Comentario
          </Button>
        </form>
      </Form>

      {/* Comments list */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment.id} 
              className="border-b border-churrasca-100 dark:border-churrasca-800 pb-4"
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-churrasca-800 dark:text-churrasca-200 flex items-center gap-1">
                  {comment.name}
                  {comment.isAdmin && (
                    <span className="bg-churrasca-100 text-xs text-churrasca-700 px-1 rounded ml-1">Admin</span>
                  )}
                </h4>
                <span className="text-xs text-churrasca-500 dark:text-churrasca-400">
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.text}</p>
              
              {/* Display image if present */}
              {comment.imageUrl && (
                <div className="mt-2 mb-3">
                  <img 
                    src={comment.imageUrl} 
                    alt="Imagen adjunta" 
                    className="max-h-48 w-auto object-cover rounded-md border border-churrasca-200" 
                  />
                </div>
              )}
              
              {/* Comment actions */}
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={() => updateCommentVote(comment.id, 'like')}
                  className="flex items-center gap-1 text-xs text-churrasca-600 hover:text-churrasca-800"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Útil ({comment.likes})</span>
                </button>
                <button 
                  onClick={() => updateCommentVote(comment.id, 'dislike')}
                  className="flex items-center gap-1 text-xs text-churrasca-600 hover:text-churrasca-800"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span>No útil ({comment.dislikes})</span>
                </button>
                <button 
                  onClick={() => handleDeleteComment(comment.id)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 ml-auto"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-churrasca-500 dark:text-churrasca-400">
            <p>¡Sé el primero en comentar!</p>
          </div>
        )}
      </div>

      {/* Admin login dialog */}
      <AlertDialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Autenticación de Administrador</AlertDialogTitle>
            <AlertDialogDescription>
              Ingresa la contraseña de administrador para eliminar comentarios
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input 
              type="password" 
              placeholder="Contraseña" 
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdminLogin}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentsSection;
