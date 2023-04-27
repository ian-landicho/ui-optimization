import MoveState from './with-move-state';
import SlowCounter from './slow-counter';
import WithMemo from './with-memo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div>
        <code className="font-mono font-bold">UI Optimization</code>
      </div>
      <div className="pt-20 font-mono">
        {/* <SlowCounter /> */}
        {/* <WithMemo /> */}
        <MoveState />
      </div>
    </main>
  );
}
