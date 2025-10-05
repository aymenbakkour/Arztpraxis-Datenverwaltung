
import React from 'react';
import type { Doctor } from '../types';

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: string) => void;
}

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors, onEdit, onDelete }) => {
  if (doctors.length === 0) {
    return (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Keine Ärzte gefunden</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Passen Sie Ihre Filter an oder fügen Sie einen neuen Arzt hinzu.</p>
        </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Adresse</th>
            <th scope="col" className="px-6 py-3">Telefon</th>
            <th scope="col" className="px-6 py-3">Fachgebiet</th>
            <th scope="col" className="px-6 py-3">Stadt</th>
            <th scope="col" className="px-6 py-3 text-right">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{doctor.name}</td>
              <td className="px-6 py-4">{doctor.adresse}</td>
              <td className="px-6 py-4">{doctor.telefon}</td>
              <td className="px-6 py-4">{doctor.fachgebiet}</td>
              <td className="px-6 py-4">{doctor.stadt}</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <button onClick={() => onEdit(doctor)} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline mr-4">Bearbeiten</button>
                <button onClick={() => onDelete(doctor.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
