import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {   
        path: "/",
        lazy: {
            Component: async () => {
                const component = await import("../auth/login")

                return component.default
            }
        }
    },
    {   
        path: "/register",
        lazy: {
            Component: async () => {
                const component = await import("../auth/register")

                return component.default
            }
        }
    },
    {
        path: "/home",
        lazy: {
            Component: async () => {
                
                const component = await import("../page/home")

                return component.default
            }
        }
    },
    {
        path: "/createTask",
        lazy: {
            Component: async () => {
                
                const component = await import("../page/CreateTask")

                return component.default
            }
        }
    }
    
]);

export default router;