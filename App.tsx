import React, { useState, useMemo, ChangeEvent, useRef, useEffect } from 'react';
import type { Doctor } from './types';
import { useDoctors } from './hooks/useDoctors';
import DoctorTable from './components/DoctorTable';
import DoctorModal from './components/DoctorModal';
import FilterControls from './components/FilterControls';

// This makes TypeScript aware of the XLSX global variable from the script tag
declare const XLSX: any;

const App: React.FC = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, importDoctors } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('ServiceWorker registered with scope: ', registration.scope);
        }).catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
      });
    }
  }, []);

  const uniqueCities = useMemo(() => [...new Set(doctors.map(doc => doc.stadt))].sort(), [doctors]);
  const uniqueSpecialties = useMemo(() => [...new Set(doctors.map(doc => doc.fachgebiet))].sort(), [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (doctor.name.toLowerCase().includes(searchLower) ||
         doctor.adresse.toLowerCase().includes(searchLower) ||
         doctor.telefon.toLowerCase().includes(searchLower)) &&
        (cityFilter === '' || doctor.stadt === cityFilter) &&
        (specialtyFilter === '' || doctor.fachgebiet === specialtyFilter)
      );
    });
  }, [doctors, searchTerm, cityFilter, specialtyFilter]);

  const handleAddClick = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Arzt löschen möchten?')) {
      deleteDoctor(id);
    }
  };

  const handleSaveDoctor = (doctor: Doctor) => {
    if (editingDoctor) {
      updateDoctor(doctor);
    } else {
      addDoctor(doctor);
    }
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(doctors.map(({id, ...rest}) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ärzte');
    XLSX.writeFile(workbook, 'aerzte_daten.xlsx');
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: Omit<Doctor, 'id'>[] = XLSX.utils.sheet_to_json(worksheet);
        
        const newDoctors: Doctor[] = json.map(doc => ({ ...doc, id: Date.now().toString() + Math.random().toString() }));
        importDoctors(newDoctors);
        alert('Daten erfolgreich importiert!');
      } catch (error) {
        console.error("Fehler beim Importieren der Datei:", error);
        alert('Fehler beim Importieren der Datei. Bitte stellen Sie sicher, dass es eine gültige Excel-Datei ist.');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = ''; // Reset file input
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Arztpraxis-Datenverwaltung</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Ein fortschrittliches Tool zur Verwaltung Ihrer Arztdaten.</p>
        </header>

        <main>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
            <FilterControls
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              cityFilter={cityFilter}
              onCityChange={(e) => setCityFilter(e.target.value)}
              specialtyFilter={specialtyFilter}
              onSpecialtyChange={(e) => setSpecialtyFilter(e.target.value)}
              cities={uniqueCities}
              specialties={uniqueSpecialties}
              onAddClick={handleAddClick}
              onImportClick={handleImportClick}
              onExportClick={handleExport}
            />
             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx, .xls" className="hidden" />
          </div>

          <DoctorTable
            doctors={filteredDoctors}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </main>
        
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
          <p>تم تصميمه من قبل المبرمج أيمن بكور</p>
        </footer>
      </div>

      {isModalOpen && (
        <DoctorModal
          doctor={editingDoctor}
          onSave={handleSaveDoctor}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;