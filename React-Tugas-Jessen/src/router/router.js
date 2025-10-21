import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./protectedRoute";
const ProtectedRoute = () =>{
    const user = null
    return user ? <Outlet/> : <Navigate to ="/login"/>
}
const router = createBrowserRouter([
    {   
        path: "/login",
        lazy: {
            Component: async () => {
                const component = await import("../auth/login")

                return component.default
            }
        }
    },
    {
        ProtectedRoute
        path: "/",
        lazy: {
            Component: async () => {
                
                const component = await import("../page/home")

                return component.default
            }
        }
    }
    
]);

export default router;