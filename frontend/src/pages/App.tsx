import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Project } from '../types/project';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/projects').then((res) => {
      setProjects(res.data);
    });
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Projets publiés</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            <Link to={`/project/${p.id}`} className="text-blue-600 underline">
              {p.fields?.Titre || 'Sans titre'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
