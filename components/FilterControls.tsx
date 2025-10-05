
import React from 'react';

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cityFilter: string;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  specialtyFilter: string;
  onSpecialtyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cities: string[];
  specialties: string[];
  onAddClick: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  onSearchChange,
  cityFilter,
  onCityChange,
  specialtyFilter,
  onSpecialtyChange,
  cities,
  specialties,
  onAddClick,
  onImportClick,
  onExportClick
}) => {
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
                <label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Suche</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Suchen nach Name, Adresse..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="cityFilter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nach Stadt filtern</label>
                <select id="cityFilter" value={cityFilter} onChange={onCityChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Alle Städte</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="specialtyFilter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nach Fachgebiet filtern</label>
                <select id="specialtyFilter" value={specialtyFilter} onChange={onSpecialtyChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Alle Fachgebiete</option>
                    {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                </select>
            </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-end">
            <button onClick={onImportClick} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border border-transparent rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900/75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors">
                <UploadIcon /> Importieren
            </button>
            <button onClick={onExportClick} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 border border-transparent rounded-md hover:bg-green-200 dark:hover:bg-green-900/75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800 transition-colors">
                <DownloadIcon /> Exportieren
            </button>
            <button onClick={onAddClick} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors">
                <PlusIcon /> Arzt hinzufügen
            </button>
        </div>
    </div>
  );
};

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V13H5.5z" /><path d="M9 13h2v5H9v-5z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;


export default FilterControls;
