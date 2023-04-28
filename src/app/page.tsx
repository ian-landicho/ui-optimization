import SlowCounter from './slow-counter';
import WithMemo from './with-memo';
import MoveState from './with-move-state';
import WithChildren from './with-children';
import WithSlowProvider from './with-slow-provider';
import WithFastProvider from './with-fast-provider';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div>
        <code className="font-mono font-bold">UI Optimization</code>
      </div>
      <div className="pt-20 font-mono">
        {/* <SlowCounter /> */}
        {/* <WithMemo /> */}
        {/* <MoveState /> */}
        {/* <WithChildren /> */}
        {/* <WithSlowProvider /> */}
        <WithFastProvider />
      </div>
    </main>
  );
}
