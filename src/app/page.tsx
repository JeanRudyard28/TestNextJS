// Importation des hooks useState et useEffect de React, axios pour les requêtes HTTP, 
// Ajout pour le composant d'ajout et modification des étudiants, et Swal pour les alertes.
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Ajout from "./components/Ajout";
import Swal from "sweetalert2";

// Définition de l'interface Student pour typer les objets étudiants.
interface Student {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
}

// Définition du composant principal Home en utilisant React.FC (fonction composant).
const Home: React.FC = () => {
  // Déclaration des états pour les étudiants et l'étudiant en cours de modification.
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Utilisation de useEffect pour charger les étudiants lors du montage du composant.
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fonction pour récupérer les étudiants depuis l'API.
  const fetchStudents = async () => {
    try {
      // Requête GET vers l'API pour récupérer la liste des étudiants.
      const response = await axios.get<Student[]>(
        "http://localhost:8000/api/etudiant"
      );
      // Mise à jour de l'état students avec les données récupérées.
      setStudents(response.data);
    } catch (error) {
      // Affichage d'un message d'erreur en cas de problème lors de la récupération.
      console.error("Erreur lors de la récupération des étudiants:", error);
    }
  };

  // Fonction pour supprimer un étudiant.
  const handleDelete = async (id: number) => {
    try {
      // Requête DELETE vers l'API pour supprimer un étudiant par son ID.
      await axios.delete(`http://localhost:8000/api/etudiant/${id}`);
      // Actualisation de la liste des étudiants après suppression.
      fetchStudents();
      // Affichage d'une alerte de succès avec SweetAlert2.
      Swal.fire({
        title: 'Supprimé!',
        text: "L'étudiant a été supprimé.",
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      // Affichage d'une alerte d'erreur en cas de problème lors de la suppression.
      console.error("Erreur lors de la suppression de l'étudiant:", error);
      Swal.fire({
        title: 'Erreur!',
        text: "Une erreur s'est produite lors de la suppression.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Fonction pour gérer la sauvegarde (ajout ou modification) d'un étudiant.
  const handleSave = () => {
    // Réinitialisation de l'état editingStudent à null après la sauvegarde.
    setEditingStudent(null);
    // Actualisation de la liste des étudiants après la sauvegarde.
    fetchStudents();
    // Affichage d'une alerte de succès avec SweetAlert2.
    Swal.fire({
      title: 'Modifié!',
      text: "Les informations de l'étudiant ont été modifiées.",
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  // Rendu du composant principal.
  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div>
        {/* Titre principal */}
        <h1 className="bg-orange-500 p-3 rounded font-bold">Étudiants</h1>
        {/* Composant Ajout pour ajouter ou modifier un étudiant */}
        <Ajout student={editingStudent} onSave={handleSave} />
        {/* Tableau affichant la liste des étudiants */}
        <table className="table border rounded">
          <thead>
            <tr className="bg-green-600 px-5">
              {/* En-têtes de colonnes */}
              <th className="px-7 border">Nom</th>
              <th className="px-7 border">Adresse</th>
              <th className="px-7 border">Téléphone</th>
              <th className="px-7 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Boucle sur la liste des étudiants pour créer une ligne pour chaque étudiant */}
            {students.map((student) => (
              <tr key={student.id}>
                {/* Cellules pour afficher les informations de l'étudiant */}
                <td className="px-2 border">{student.nom}</td>
                <td className="px-2 border">{student.adresse}</td>
                <td className="px-2 border">{student.telephone}</td>
                <td className="px-2 border">
                  {/* Bouton pour éditer un étudiant */}
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="text-sm mx-2"
                  >
                    Editer
                  </button>
                  {/* Bouton pour supprimer un étudiant */}
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

// Exportation du composant Home.
export default Home;