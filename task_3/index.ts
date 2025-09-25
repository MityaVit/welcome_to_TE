interface BallonI {
  id: number;
  isPublic: boolean;
}

/**
 * @description имитация fetch. возвращает количество шариков
 * @param {Number} id ID шарика по цвету
 * @returns {Number} количество шариков
 * @example const res = await fetchBallonAmount(202);
 */
async function fetchBallonAmount(id: BallonI["id"]): Promise<number> {
  const RANDOM_TIMEOUT: number = Math.ceil(Math.random() * 10000); // 1-9 секунд
  const RANDOM_AMOUNT: number = Math.ceil(Math.random() * id); // случайное число

  return new Promise((resolve) =>
    setTimeout(() => resolve(RANDOM_AMOUNT), RANDOM_TIMEOUT)
  );
}

// данные о шариках
const BALLONS: { [key: string]: BallonI } = {
  red: {
    id: 202,
    isPublic: true,
  },
  blue: {
    id: 356,
    isPublic: false,
  },
  yellow: {
    id: 451,
    isPublic: false,
  },
  black: {
    id: 35,
    isPublic: true,
  },
  green: {
    id: 191,
    isPublic: true,
  },
  white: {
    id: 911,
    isPublic: true,
  },
};

async function getPublicBallonsCount(): Promise<number> {
  let publicBallons = Object.values(BALLONS).filter((b) => b.isPublic);
  let results = await Promise.allSettled(
    publicBallons.map((b) => fetchBallonAmount(b.id))
  );

  let total = 0;
  
  results.forEach((r, i) => {
    if (r.status === "fulfilled") total += r.value;
    else
      console.warn(
        `fetchBallonsFailed for id=${publicBallons[i].id}, reason: ${r.reason}`
      );
  });

  return total;
}
