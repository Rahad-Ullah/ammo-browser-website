interface QueueItem<T> {
  task: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

export interface RequestQueue {
  enqueue: <T>(task: () => Promise<T>) => Promise<T>;
}

export function createRequestQueue(): RequestQueue {
  let running = false;
  const q: QueueItem<unknown>[] = [];

  const runNext = (): void => {
    if (running || q.length === 0) return;
    running = true;

    const item = q.shift();
    if (!item) return;

    const { task, resolve, reject } = item;
    Promise.resolve()
      .then(task)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        running = false;
        runNext();
      });
  };

  function enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      q.push({ task, resolve, reject } as QueueItem<unknown>);
      runNext();
    });
  }

  return { enqueue };
}
