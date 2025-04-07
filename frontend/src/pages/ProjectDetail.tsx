import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../types/project';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLiking, setIsLiking] = useState(false);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/projects/${id}`);
      setProject(res.data[0]);
    } catch (error) {
      console.error('Erreur lors du chargement du projet :', error);
    }
  };

  const likeProject = async () => {
    if (!id) return;
    setIsLiking(true);
    try {
      await axios.post(`http://localhost:3000/projects/${id}/like`);
      await fetchProject(); // Rafraîchit le projet pour mettre à jour les likes
    } catch (error) {
      console.error('Erreur lors du like :', error);
    } finally {
      setIsLiking(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-3">{project.fields?.Titre || 'Projet sans titre'}</h1>
      <p className="mb-4">{project.fields?.Description || 'Pas de description.'}</p>
      <p className="mb-4 text-gray-600">❤️ {project.fields?.Likes ?? 0} like(s)</p>
      <button
        onClick={likeProject}
        disabled={isLiking}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {isLiking ? 'Merci !' : '❤️ Liker'}
      </button>
    </div>
  );
}
