'use client'
import {useUser} from 'use/user';

export default function Generate(){
    const {isLoaded, isSigned, user} = useUser()
    const {flashcard, setFlashcard} = useState([])
    const {flipped, setFlipped} = useState([])
}