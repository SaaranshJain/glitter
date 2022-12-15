import styles from '../styles/Home.module.scss';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app, { db } from '../firebase';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../userReducer';
import { setGleets } from '../gleetsReducer';
import { Gleet, State } from '../store';
import Link from 'next/link';

export default function Home() {
    const name = useSelector<State, string | null>((state) => state.user.name);
    const email = useSelector<State, string | null>((state) => state.user.email);
    const photoUrl = useSelector<State, string | null>((state) => state.user.photoUrl);
    const gleets = useSelector<State, Gleet[]>((state) => state.gleets.gleets);

    const dispatch = useDispatch();

    return (
        <div className={styles.content}>
            {!(name && email && photoUrl) ? (
                <div>
                    Please Login to view and post <s>tweets</s> gleets
                    <br />
                    <button
                        className={styles.login}
                        onClick={() => {
                            signInWithPopup(getAuth(app), new GoogleAuthProvider())
                                .then((result) => {
                                    const user = result.user;
                                    console.log(
                                        login({
                                            name: user.displayName,
                                            email: user.email,
                                            photoUrl: user.photoURL,
                                        })
                                    );
                                    dispatch(
                                        login({
                                            name: user.displayName,
                                            email: user.email,
                                            photoUrl: user.photoURL,
                                        })
                                    );

                                    onSnapshot(
                                        query(collection(db, 'gleets'), orderBy('created', 'desc')),
                                        (querySnapshot) => {
                                            dispatch(setGleets(querySnapshot.docs.map((doc) => doc.data())));
                                        }
                                    );
                                })
                                .catch((error) => {
                                    const credential = GoogleAuthProvider.credentialFromError(error);
                                    console.log({ error, credential });
                                });
                        }}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.gleetsContainer}>
                        {gleets.map((gleet, index) => (
                            <div key={index} className={styles.gleet}>
                                <div className={styles.contentContainer}>
                                    <div>
                                        <img className={styles.pfp} src={gleet.photoUrl} />
                                        {gleet.title}
                                    </div>
                                    <div>{gleet.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/add" className={styles.fab}>
                        +
                    </Link>
                </>
            )}
        </div>
    );
}
