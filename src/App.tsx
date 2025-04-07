import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <div>
        <Routes>
            <Route path="/todo">
                <Route
                    index
                    element={<></>}
                />
            </Route>
            <Route
            path="*"
            element={
                <Navigate
                replace
                to="/todo"
                />
            }
            />
        </Routes>
    </div>
  )
}

export default App
