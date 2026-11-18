import { useQuery } from '@tanstack/react-query';
import { studentService } from '../services/studentService';

export const useCourses = () => {
  return useQuery({
    queryKey: ['cursos'],
    queryFn: () => studentService.getCourses(),
    staleTime: 1000 * 60 * 60, // Cache de 1 hora para a lista de cursos
  });
};