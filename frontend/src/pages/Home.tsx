import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../types/project';
import { Link } from 'react-router-dom';
import '../styles/pages/_home.scss';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:3000/projects/published');
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="home">
      <h1>Projets publiés</h1>
      <div className="project-grid">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
            <h2>{project.fields?.Titre || 'Sans titre'}</h2>
            <p>{String(project.fields?.['Résumé'] || 'Pas de description.')}</p>
            <span>{project.fields?.Likes || 0} ❤️</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
