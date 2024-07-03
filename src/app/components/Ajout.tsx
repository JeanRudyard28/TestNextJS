import { useState, useEffect } from "react";
import axios from "axios";

interface Student {
  id?: number;
  nom: string;
  adresse: string;
  telephone: string;
}

interface StudentFormProps {
  student?: Student | null;
  onSave: () => void;
}

const Ajout: React.FC<StudentFormProps> = ({ student, onSave }) => {
  const [nom, setNom] = useState(student ? student.nom : "");
  const [adresse, setAdresse] = useState(student ? student.adresse : "");
  const [telephone, setTelephone] = useState(student ? student.telephone : "");

  useEffect(() => {
    if (student) {
      setNom(student.nom);
      setAdresse(student.adresse);
      setTelephone(student.telephone);
    }
  }, [student]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nom, adresse, telephone };

    try {
      if (student && student.id) {
        await axios.put(
          `http://localhost:8000/api/etudiant/${student.id}`,
          data
        );
      } else {
        await axios.post("http://localhost:8000/api/etudiant", data);
      }
      onSave();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'étudiant:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 m-2 rounded"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom . . . "
        />
        <br />
        <input
          className="border p-2 m-2 rounded"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Adresse . . . "
        />
        <br />
        <input
          className="border p-2 m-2 rounded"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Téléphone . . . "
        />
        <br />
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

export default Ajout;
