import './App.css'
import { SideNav } from './common/SideNav/SideNav'
import { Body } from './pages/Body/Body'

function App() {

    return (
        <div className="App-content-grid">
            <Body />
            <SideNav />
        </div>
    )
}

export default App
