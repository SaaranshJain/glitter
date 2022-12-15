import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <nav id="navbar">
                <a href="/">
                    <h1>
                        <s>Twitter</s> Glitter
                    </h1>
                </a>
            </nav>
            <Component style={{ height: 'calc(100% - 4rem)', width: '100%' }} {...pageProps} />
        </Provider>
    );
}
