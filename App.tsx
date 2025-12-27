import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import RootLayout from "@/app/_layout";
import {store} from "@/src/store/store";
import database from '@/src/db'

export default function App() {
    useEffect(() => {
        database.init().then(() => console.log('[Database]: db initialized'))
    }, []);
    console.log(1)
    return (
        <Provider store={store}>
            <RootLayout />
        </Provider>
    );
}
