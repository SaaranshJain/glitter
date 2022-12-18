import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default function deleteGleet(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;
    const gleetDocRef = doc(db, 'gleets', id);

    deleteDoc(gleetDocRef)
        .then(() => {
            res.status(200).json({ deletedDoc: id });
        })
        .catch(() => {
            res.status(500).json({ deletedDoc: null });
        });
}
