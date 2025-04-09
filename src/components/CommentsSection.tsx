
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Simple type for comments
interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: number;
}

// Form schema with validation
const commentFormSchema = z.object({
  name: z.string().min(1, { message: 'Por favor ingresa tu nombre' }),
  comment: z.string().min(1, { message: 'Por favor ingresa un comentario' })
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

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
  
  // Get comments from localStorage on component mount
  useEffect(() => {
    setComments(getLocalComments());
  }, []);

  // Form handling with validation
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: '',
      comment: ''
    }
  });

  const onSubmit = (values: CommentFormValues) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name: values.name,
      text: values.comment,
      timestamp: Date.now()
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    saveLocalComments(updatedComments);
    
    form.reset();
    toast.success('¡Gracias por tu comentario!');
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
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-churrasca-600" />
        <h3 className="text-xl font-semibold text-churrasca-900 dark:text-churrasca-50">
          Comentarios de Clientes
        </h3>
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
                <h4 className="font-medium text-churrasca-800 dark:text-churrasca-200">
                  {comment.name}
                </h4>
                <span className="text-xs text-churrasca-500 dark:text-churrasca-400">
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-churrasca-500 dark:text-churrasca-400">
            <p>¡Sé el primero en comentar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
