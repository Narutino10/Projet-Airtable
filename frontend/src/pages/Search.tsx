import { useState } from 'react';
import axios from 'axios';
import { Project } from '../types/project';
import { Link } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/projects/search?q=${encodeURIComponent(query)}`
      );
      setResults(res.data);
    } catch (err) {
      console.error('Erreur de recherche :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Recherche de projets</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Mot-clé..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Rechercher
        </button>
      </div>

      {loading && <p>Chargement...</p>}

      {searched && !loading && results.length === 0 && (
        <p>Aucun résultat trouvé.</p>
      )}

      <ul className="space-y-3">
        {results.map((project) => (
          <li key={project.id} className="border p-3 rounded">
            <Link to={`/projects/${project.id}`} className="text-blue-600 font-semibold">
              {project.fields?.Titre || 'Projet sans titre'}
            </Link>
            <p className="text-sm text-gray-600">
              ❤️ {project.fields?.Likes ?? 0} like(s)
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
