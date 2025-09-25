'use client';

import { useState } from 'react';
import useSWR from 'swr';
import styles from './page.module.css';
import { fetchOnePost } from '@/libs/fetchOnePost';

// Здесь проблема в разных ключах,
// из-за этого компоненты пользуются разными кэшами,
// нужно использовать одинаковый ключ для обоих компонентов
const SWR_KEY = 'common_key';

const ComponentOne = () => {
    const { data } = useSWR(SWR_KEY, fetchOnePost);
    //...some logic

    return data ? (
        <div className={styles.card}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <span>ComponentOne</span>
        </div>
    ) : (
        <div>...Loading ComponentOne</div>
    );
};

const ComponentTwo = () => {
    // Также отключаем ревалидацию при монтировании
    const { data } = useSWR(SWR_KEY, fetchOnePost, {
        revalidateIfStale: false,
        revalidateOnMount: false,
        revalidateOnFocus: false
    });
    //...some logic

    return data ? (
        <div className={styles.card}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <span>ComponentTwo</span>
        </div>
    ) : (
        <div>...Loading ComponentTwo</div>
    );
};

export default function Home() {
    const [showComponentTwo, setShowComponentTwo] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <ComponentOne />
                {showComponentTwo ? (
                    <ComponentTwo />
                ) : (
                    <button className={styles.btn} onClick={() => setShowComponentTwo(true)}>
                        Show ComponentTwo
                    </button>
                )}
            </div>
        </main>
    );
}