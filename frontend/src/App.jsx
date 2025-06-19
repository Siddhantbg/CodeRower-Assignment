import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Import pages
import FetchConfig from './pages/FetchConfig'
import UpdateRemark from './pages/UpdateRemark'

// Import components
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FetchConfig />} />
          <Route path="update" element={<UpdateRemark />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
