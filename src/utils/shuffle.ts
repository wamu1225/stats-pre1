// 配列を並べ替えた新しい配列を返す（Fisher–Yates。sort(() => Math.random() - 0.5) は偏るので使わない）
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
