import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { fetchProjects } from '../lib/api'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProjects() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchProjects(null)
        setProjects(data)
      } catch (err: any) {
        setError(err.message || 'Error fetching projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <Card className="w-full max-w-4xl animate-glow">
        <CardHeader>
          <CardTitle className="text-center text-primary mb-4">Your Projects Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-secondary text-center">Loading projects...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && projects.length === 0 && <p className="text-secondary text-center">No projects found.</p>}
          <ul>
            {projects.map((project: any) => (
              <li key={project.id} className="border border-primary rounded p-4 mb-3">
                <h3 className="text-primary font-semibold text-lg">{project.name}</h3>
                <p className="text-secondary">Set: {project.set}</p>
                <p className="text-secondary">Due Date: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}</p>
                <p className="text-secondary">User: {project.user?.username || 'Unknown'}</p>
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
