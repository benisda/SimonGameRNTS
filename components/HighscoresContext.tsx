import React, { useEffect, useState } from 'react';
import { getData, storeData } from '../utils/Utils';

export interface Score {
    name: string;
    score: number;
}

export interface HightscoreContextType {
    hightscores: Score[];
    saveHightscore: (hightscore: Score) => void;
}

export const HightscoreContext = React.createContext<HightscoreContextType | null>(null);

const HightscoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hightscores, setHightscores] = useState<Score[]>([]);

    useEffect(() => {
        const getHightscores = async () => {
            const data = await getData('hightscores');
            setHightscores(data ? JSON.parse(data) : []);
        };
        getHightscores();
    }, []);

    const saveHightscore = (hightscore: Score): void => {
        let newArr = [...hightscores, hightscore];
        newArr.sort((a, b) => b.score - a.score);
        newArr = newArr.slice(0, 10);
        setHightscores(newArr);
        storeData('hightscores', JSON.stringify(newArr));
    };

    return <HightscoreContext.Provider value={{ hightscores, saveHightscore }}>{children}</HightscoreContext.Provider>;
};

export default HightscoreProvider;