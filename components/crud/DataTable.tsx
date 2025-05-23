'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FilterDropdown from './FilterDropdown';
import ConfirmationModal from './ConfirmationModal';

interface DataTableProps {
    data: any[];
    columns: { key: string; label: string; render?: (item: any) => React.ReactNode }[];
    entityName: string;
    entityPath: string;
    onDelete: (id: string) => void;
    filterOptions?: { label: string; value: string }[];
    filterKey?: string;
}

export default function DataTable({
    data,
    columns,
    entityName,
    entityPath,
    onDelete,
    filterOptions,
    filterKey
}: DataTableProps) {
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Este efecto inicializa filteredData una vez con los datos recibidos
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleFilter = (value: string | null) => {
        setActiveFilter(value);
        if (!value || value === 'all') {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item[filterKey as string] === value));
        }
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            setIsDeleting(true);
            try {
                await onDelete(itemToDelete);
                setFilteredData(prevData => prevData.filter(item => item.id !== itemToDelete));
            } catch (error) {
                console.error("Error al eliminar:", error);
                // Aquí podrías mostrar un mensaje de error
            } finally {
                setIsDeleting(false);
                setIsModalOpen(false);
                setItemToDelete(null);
            }
        }
    };

    return (
        <div className="overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{entityName}</h2>
                <div className="flex items-center gap-4">
                    {filterOptions && filterKey && (
                        <FilterDropdown
                            options={filterOptions}
                            activeFilter={activeFilter}
                            onFilterChange={handleFilter}
                        />
                    )}
                    <Link href={`/dashboard/${entityPath}/add`}>
                        <Button className="bg-[color:var(--f1-red)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Añadir {entityName.slice(0, -1)}
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                                {columns.map((column) => (
                                    <th key={column.key} className="px-6 py-3">
                                        {column.label}
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-gray-700/30">
                                        {columns.map((column) => (
                                            <td key={`${item.id || index}-${column.key}`} className="px-6 py-4">
                                                {column.render ? column.render(item) : item[column.key]}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={`/dashboard/${entityPath}/edit/${item.id}`}>
                                                <Button size="sm" variant="outline" className="text-blue-400 hover:text-blue-300 border-blue-500/50">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-400 hover:text-red-300 border-red-500/50"
                                                onClick={() => handleDeleteClick(item.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-400">
                                        No hay datos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirmar eliminación"
                message={`¿Estás seguro de que deseas eliminar este ${entityName.slice(0, -1).toLowerCase()}? Esta acción no se puede deshacer.`}
                isLoading={isDeleting}
            />
        </div>
    );
}