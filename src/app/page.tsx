"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Ajout from "./components/Ajout";

interface Student {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
}

const Home: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get<Student[]>(
        "http://localhost:8000/api/etudiant"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/etudiant/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant:", error);
    }
  };

  const handleSave = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div>
        <h1 className="bg-orange-500 p-3 rounded font-bold">Étudiants</h1>
        <Ajout student={editingStudent} onSave={handleSave} />
        <table className="table border rounded">
          <thead>
            <tr className="bg-green-600 px-5" >
              <th className="px-7 border">Nom</th>
              <th className="px-7 border">Adresse</th>
              <th className="px-7 border">Téléphone</th>
              <th className="px-7 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-2 border">{student.nom}</td>
                <td className="px-2 border">{student.adresse}</td>
                <td className="px-2 border">{student.telephone}</td>
                <td className="px-2 border">
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="text-sm mx-2"
                  >
                    Editer
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-sm mx-2 text-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Home;
