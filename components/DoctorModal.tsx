
import React, { useState, useEffect } from 'react';
import type { Doctor } from '../types';

interface DoctorModalProps {
  doctor: Doctor | null;
  onSave: (doctor: Doctor) => void;
  onClose: () => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Doctor, 'id'>>({
    name: '',
    adresse: '',
    telefon: '',
    fachgebiet: '',
    stadt: '',
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        adresse: doctor.adresse,
        telefon: doctor.telefon,
        fachgebiet: doctor.fachgebiet,
        stadt: doctor.stadt,
      });
    } else {
      setFormData({
        name: '',
        adresse: '',
        telefon: '',
        fachgebiet: '',
        stadt: '',
      });
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value.trim() === '')) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }
    onSave({
      id: doctor?.id || Date.now().toString(),
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {doctor ? 'Arzt bearbeiten' : 'Neuen Arzt hinzufügen'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800">
              Abbrechen
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800">
              Speichern
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DoctorModal;
