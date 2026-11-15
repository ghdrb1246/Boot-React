import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>
const ProductsList = lazy(() => import("../pages/products/ListPage"))

const productsRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace to="/products/list"/>
        },

        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductsList/></Suspense>
        },
        
        {
            path: "add",
            element: <Suspense fallback={Loading}><ProductsAdd/></Suspense>
        },

        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><ProductRead/></Suspense>
        },

        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><ProductModify/></Suspense>
        }
    ]
}

export default productsRouter;