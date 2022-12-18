import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import ProfileButton from '@/components/ProfileButton';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <nav id="navbar">
                <Link id="glitter" href="/">
                    <h1>
                        <s>Twitter</s> Glitter
                    </h1>
                </Link>
                <ProfileButton />
            </nav>
            <Component style={{ height: 'calc(100% - 4rem)', width: '100%' }} {...pageProps} />
        </Provider>
    );
}
