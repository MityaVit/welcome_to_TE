import { Fragment, memo, useCallback } from 'react';

const MainComponent = () => {
    // Проблема в том, что при каждом рендере этого компонента создается новая функция makeLog,
    // это приводит к повторным рендерам ChildComponent, даже если его props не изменились.
    // Чтобы починить, можно использовать useCallback для мемоизации функции makeLog
    const makeLog = useCallback(() => console.log('hi from MainComponent'), []); // function to make logs from MainComponent

    return (
        <Fragment>
            <ChildComponent makeLog={makeLog} />
        </Fragment>
    );
};

// memoized component
const ChildComponent = memo(({ makeLog }) => (
    <button onClick={makeLog}>say Hi from ChildComponent</button>
));
