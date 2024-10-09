import dynamic from 'next/dynamic'
const CounterUp = dynamic(() => import('./Counterup'), {
	ssr: false,
})

export default function CountetNumber({ count }) {
	return (
		<CounterUp count={count} time={1} />
	)
}
