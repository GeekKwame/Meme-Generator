import { memo } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {
    return (
        <ErrorBoundary>
            <Header />
            <Main />
        </ErrorBoundary>
    )
}

export default memo(App)