'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface EntityFormProps {
  fields: Field[];
  initialData?: any;
  onSubmit: (data: any) => Promise<any>;
  entityName: string;
  entityPath: string;
  isEditing?: boolean;
}

export default function EntityForm({
  fields,
  initialData = {},
  onSubmit,
  entityName,
  entityPath,
  isEditing = false,
}: EntityFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Inicializar el formulario con datos iniciales SOLO UNA VEZ
  useEffect(() => {
    if (!isInitialized) {
      const data: any = {};
      fields.forEach((field) => {
        data[field.name] = initialData[field.name] || (field.type === 'color' ? '#ffffff' : '');
      });
      setFormData(data);
      setIsInitialized(true);
    }
  }, [initialData, fields, isInitialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
      router.push(`/dashboard/${entityPath}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ha ocurrido un error al guardar los datos');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? `Editar ${entityName}` : `Añadir ${entityName}`}
        </h2>
        <Link href={`/dashboard/${entityPath}`}>
          <Button variant="outline" className="text-gray-400">
            Cancelar
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="pt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-300"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="bg-gray-900 border border-gray-700 text-white rounded-md w-full p-2"
                  >
                    <option value="">Seleccionar...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'color' ? (
                  <div className="flex items-center space-x-3">
                    <Input
                      type="color"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || '#ffffff'}
                      onChange={handleChange}
                      required={field.required}
                      className="h-10 w-10 p-1 cursor-pointer bg-gray-900 border border-gray-700"
                    />
                    <Input
                      type="text"
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      name={field.name}
                      className="bg-gray-900 border border-gray-700 text-white"
                      placeholder="#000000"
                    />
                  </div>
                ) : (
                  <Input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="bg-gray-900 border border-gray-700 text-white"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[color:var(--f1-red)]"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  'Guardar'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}