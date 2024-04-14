import './App.css'
import { Header } from './common/Header/Header'
import { SideNav } from './common/SideNav/SideNav'
import { Body } from './pages/Body/Body'

function App() {

    return (
        <>
            <Header />
            <Body />
        </>
        // <div className="App-content-grid">
            // <Body />
            // <SideNav />
        // </div>
    )
}

export default App
