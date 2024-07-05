// Importation des hooks useState et useEffect de React, axios pour les requêtes HTTP, et Swal pour les alertes.
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Définition de l'interface Student pour typer les objets étudiants.
interface Student {
  id?: number;
  nom: string;
  adresse: string;
  telephone: string;
}

// Définition des props pour le composant Ajout, qui incluent un étudiant optionnel et une fonction onSave.
interface StudentFormProps {
  student?: Student | null;
  onSave: () => void;
}

// Définition du composant Ajout en utilisant React.FC (fonction composant).
const Ajout: React.FC<StudentFormProps> = ({ student, onSave }) => {
  // Déclaration des états pour les champs du formulaire : nom, adresse et téléphone.
  const [nom, setNom] = useState(student ? student.nom : "");
  const [adresse, setAdresse] = useState(student ? student.adresse : "");
  const [telephone, setTelephone] = useState(student ? student.telephone : "");

  // Utilisation de useEffect pour mettre à jour les champs du formulaire lorsque l'étudiant change.
  useEffect(() => {
    if (student) {
      setNom(student.nom);
      setAdresse(student.adresse);
      setTelephone(student.telephone);
    } else {
      // Effacement des champs du formulaire si aucun étudiant n'est fourni.
      setNom("");
      setAdresse("");
      setTelephone("");
    }
  }, [student]);

  // Fonction pour gérer la soumission du formulaire.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom, adresse, telephone };

    try {
      if (student && student.id) {
        // Si un étudiant avec un ID existe, effectuer une requête PUT pour le mettre à jour.
        await axios.put(
          `http://localhost:8000/api/etudiant/${student.id}`,
          data
        );
        // Affichage d'une alerte de succès avec SweetAlert2.
        Swal.fire({
          title: "Succès",
          text: "Étudiant modifié avec succès!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        // Sinon, effectuer une requête POST pour ajouter un nouvel étudiant.
        await axios.post("http://localhost:8000/api/etudiant", data);
        // Affichage d'une alerte de succès avec SweetAlert2.
        Swal.fire({
          title: "Succès",
          text: "Étudiant ajouté avec succès!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      // Appel de la fonction onSave pour signaler la sauvegarde.
      onSave();
      // Effacement des champs du formulaire après la sauvegarde.
      setNom("");
      setAdresse("");
      setTelephone("");
    } catch (error) {
      // Affichage d'une alerte d'erreur en cas de problème lors de la sauvegarde.
      console.error("Erreur lors de l'enregistrement de l'étudiant:", error);
      Swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite lors de l'enregistrement.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Rendu du formulaire.
  return (
    <main className="flex flex-col items-center justify-between p-10">
      <form onSubmit={handleSubmit}>
        {/* Champ de saisie pour le nom */}
        <input
          className="border p-2 m-2 rounded"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom . . . "
        />
        <br />
        {/* Champ de saisie pour l'adresse */}
        <input
          className="border p-2 m-2 rounded"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Adresse . . . "
        />
        <br />
        {/* Champ de saisie pour le téléphone */}
        <input
          className="border p-2 m-2 rounded"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Téléphone . . . "
        />
        <br />
        {/* Bouton pour soumettre le formulaire */}
        <button
          type="submit"
          className="border p-2 rounded h-10 m-2"
        >
          Enregistrer
        </button>
      </form>
    </main>
  );
};

// Exportation du composant Ajout.
export default Ajout;
