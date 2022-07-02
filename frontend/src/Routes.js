import { Route, Routes } from 'react-router-dom'
import DataPage from './pages/DataPage'
import HomePage from './pages/HomePage'
import PlotPage from './pages/PlotPage'

const PageRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/data" element={<DataPage/>}/>
        <Route path="/plot" element={<PlotPage/>}/>
    </Routes>
    )
}

export default PageRoutes