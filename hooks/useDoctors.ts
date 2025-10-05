
import { useState, useEffect } from 'react';
import type { Doctor } from '../types';

const DOCTORS_STORAGE_KEY = 'doctorsData';

const initialData: Doctor[] = [
    { id: '1', name: 'Dr. med. Anja Schmidt', adresse: 'Hauptstraße 12', telefon: '030-1234567', fachgebiet: 'Allgemeinmedizin', stadt: 'Berlin' },
    { id: '2', name: 'Dr. med. Klaus Müller', adresse: 'Marktplatz 5', telefon: '089-7654321', fachgebiet: 'Kardiologie', stadt: 'München' },
    { id: '3', name: 'Dr. med. Sabine Weber', adresse: 'Goethestraße 23', telefon: '040-9876543', fachgebiet: 'Pädiatrie', stadt: 'Hamburg' },
    { id: '4', name: 'Dr. med. Thomas Bauer', adresse: 'Schillerweg 8', telefon: '0221-1122334', fachgebiet: 'Orthopädie', stadt: 'Köln' },
    { id: '5', name: 'Dr. med. Petra Wagner', adresse: 'Berliner Allee 45', telefon: '069-5566778', fachgebiet: 'Dermatologie', stadt: 'Frankfurt am Main' },
];

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const storedData = localStorage.getItem(DOCTORS_STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Daten aus dem LocalStorage:", error);
    }
    return initialData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(doctors));
    } catch (error) {
      console.error("Fehler beim Speichern der Daten im LocalStorage:", error);
    }
  }, [doctors]);

  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    const newDoctor: Doctor = { ...doctor, id: Date.now().toString() };
    setDoctors(prevDoctors => [newDoctor, ...prevDoctors]);
  };

  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(prevDoctors =>
      prevDoctors.map(doc => (doc.id === updatedDoctor.id ? updatedDoctor : doc))
    );
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prevDoctors => prevDoctors.filter(doc => doc.id !== id));
  };
  
  const importDoctors = (importedDoctors: Doctor[]) => {
    setDoctors(importedDoctors);
  }

  return {
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    importDoctors,
  };
};
