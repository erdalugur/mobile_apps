import { AuthContext } from 'navigation'
import React from 'react'


export function useAuthContext(component: any) {
    const context = React.useContext(AuthContext)
    const Component = component;
    return <Component {...context} />
}