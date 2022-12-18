import { State } from '@/store';
import { logout } from '@/userReducer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileButton() {
    const name = useSelector<State, string | null>((state) => state.user.name);
    const email = useSelector<State, string | null>((state) => state.user.email);
    const photoUrl = useSelector<State, string | null>((state) => state.user.photoUrl);

    const dispatch = useDispatch();
    const router = useRouter();

    if (name && email && photoUrl) {
        return (
            <>
                <Link id="profile" href="/profile">
                    <img src={photoUrl}></img>
                </Link>
                <button
                    onClick={() => {
                        dispatch(logout());
                        localStorage.clear();
                        router.reload();
                    }}
                    id="logout"
                >
                    Logout
                </button>
            </>
        );
    }

    return null;
}
