import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { State } from '../store';
import styles from '../styles/Add.module.scss';
import { useRouter } from 'next/router';

export default function Add() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const photoUrl = useSelector<State, string | null>((state) => state.user.photoUrl);

    useEffect(() => {
        console.log(photoUrl);
    }, [photoUrl]);

    return (
        <>
            <div className={styles.content}>
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <input
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    ></input>
                    <textarea value={content} onChange={(ev) => setContent(ev.target.value)}></textarea>
                    <button
                        onClick={() =>
                            addDoc(collection(db, 'gleets'), { title, content, photoUrl, created: Timestamp.now() })
                                .then(() => router.replace('/'))
                                .catch(console.log)
                        }
                    >
                        Create
                    </button>
                </form>
            </div>
        </>
    );
}
