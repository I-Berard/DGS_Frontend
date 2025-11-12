import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Label } from '../components/ui/Label'
import { Input } from '../components/ui/Input'
import { PasswordInput } from '../components/ui/PasswordInput'
import { Button } from '../components/ui/Button'
import { UserPlus } from 'lucide-react'
import { signup } from '../lib/api'

export default function Signup() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [sandai_email, setSandaiEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signup({ 
        name, 
        username: email.split('@')[0], 
        sandai_email: sandai_email, 
        personal_email: email, 
        password, 
        role: 'user' 
      })
      navigate('/login')
    } catch (err: any) {
      setError(err?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-grid bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md animate-glow">
        <CardHeader>
          <CardTitle className='text-center mb-3'>Create your account</CardTitle>
          <CardDescription className='text-center'>Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="sandai_email">Sandai Email</Label>
              <Input id="sandai_email" type="email" placeholder="you@sandaicares.org" value={sandai_email} onChange={(e) => setSandaiEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              <UserPlus className="mr-2" size={18} /> {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline pl-1 cursor-pointer">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
