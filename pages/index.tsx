import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app, { db } from '@/firebase';
import { query, collection, onSnapshot, orderBy, doc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/userReducer';
import { setGleets } from '@/gleetsReducer';
import { Gleet, State } from '@/store';

import Link from 'next/link';
import styles from '@/styles/Home.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
    const name = useSelector<State, string | null>((state) => state.user.name);
    const email = useSelector<State, string | null>((state) => state.user.email);
    const photoUrl = useSelector<State, string | null>((state) => state.user.photoUrl);
    const gleets = useSelector<State, Gleet[]>((state) => state.gleets.gleets);

    const [deleteVisibleList, setDeleteVisibleList] = useState<boolean[]>([]);
    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        const [localName, localEmail, localPhotoUrl] = ['name', 'email', 'photoUrl'].map((e) =>
            localStorage.getItem(e)
        );

        if (localEmail && localName && localPhotoUrl) {
            dispatch(login({ name: localName, email: localEmail, photoUrl: localPhotoUrl }));

            onSnapshot(query(collection(db, 'gleets'), orderBy('created', 'desc')), (querySnapshot) => {
                setDeleteVisibleList((l) => new Array(querySnapshot.size).fill(false));
                dispatch(
                    setGleets(
                        querySnapshot.docs.map((doc) => {
                            const data = doc.data();
                            return Object.assign(data, { id: doc.id, created: JSON.stringify(data.created) });
                        })
                    )
                );
                console.log(deleteVisibleList);
            });
        }
    }, [name, email, photoUrl]);

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
                                    user.displayName && localStorage.setItem('name', user.displayName);
                                    user.email && localStorage.setItem('email', user.email);
                                    user.photoURL && localStorage.setItem('photoUrl', user.photoURL);
                                    dispatch(
                                        login({
                                            name: user.displayName,
                                            email: user.email,
                                            photoUrl: user.photoURL,
                                        })
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
                            <div
                                key={index}
                                className={styles.gleet}
                                onMouseOver={() => {
                                    if (gleet.email === email) {
                                        (document.querySelector(`#delete${index}`) as HTMLDivElement).style.visibility =
                                            'visible';
                                    }
                                }}
                                onMouseOut={() => {
                                    (document.querySelector(`#delete${index}`) as HTMLDivElement).style.visibility =
                                        'hidden';
                                }}
                            >
                                <div className={styles.contentContainer}>
                                    <div>
                                        <img className={styles.pfp} src={gleet.photoUrl} />
                                        {gleet.title}
                                    </div>
                                    <div>{gleet.content}</div>
                                </div>
                                <button
                                    id={`delete${index}`}
                                    className={styles.deleteButton}
                                    onClick={() =>
                                        axios.post('/api/deleteGleet', { id: gleet.id }).finally(() => router.reload())
                                    }
                                >
                                    <svg
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 105.16 122.88"
                                    >
                                        <defs></defs>
                                        <title>delete</title>
                                        <path
                                            style={{ fillRule: 'evenodd' }}
                                            d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"
                                        />
                                    </svg>
                                </button>
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
