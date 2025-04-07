import { useEffect, useState } from 'react';
import axios from 'axios';
import { Project } from '../types/project'; 

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]); 

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const togglePublish = async (id: string, published: boolean) => {
    const token = localStorage.getItem('token');
    await axios.patch(
      `http://localhost:3000/projects/publish/${id}`,
      { published: !published },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    fetchProjects();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard Admin</h1>
      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{p.fields?.Titre || 'Sans titre'}</p>
                <p>{p.fields?.Likes || 0} ❤️</p>
              </div>
              <button
                onClick={() => togglePublish(p.id, p.fields?.Publié ?? false)}
                className={`px-4 py-2 rounded ${
                  p.fields?.Publié ? 'bg-red-500' : 'bg-green-500'
                } text-white`}
              >
                {p.fields?.Publié ? 'Dépublier' : 'Publier'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
