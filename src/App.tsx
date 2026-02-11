import './App.css'
import { AuthPage } from './features/auth'
import { DashboardUsersManage } from './features/admin-users'

function App() {
  return (
    <div>
      <AuthPage />
      <DashboardUsersManage />
    </div>
  )
}

export default App
