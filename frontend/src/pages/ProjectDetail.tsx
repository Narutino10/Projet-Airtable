import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../types/project'; // 👈

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null); // 👈
  useEffect(() => {
    axios.get(`http://localhost:3000/projects/${id}`).then((res) => {
      setProject(res.data[0]);
    });
  }, [id]);

  if (!project) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{project.fields?.Titre}</h1>
      <p className="mb-2">{project.fields?.Description}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() =>
          axios.post(`http://localhost:3000/projects/${id}/like`).then(() => {
            alert('Merci pour le like !');
          })
        }
      >
        ❤️ Liker
      </button>
    </div>
  );
}
