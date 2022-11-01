// import { useState, createEffect, Show } from 'solid-js';
// import { createViewportObserver } from '@solid-primitives/intersection-observer';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { isDark } from '../stores/darkmode';
import { showcase } from '../text.json';
import '../styles/Showcase.scss';

interface ComponentProps {
	lang: 'en' | 'he';
}
type SquareChildSrcType =
	| '/assets/problem.webp'
	| `/assets/proof-${'he' | 'en'}.jpg`;

export default function Showcase({ lang }: ComponentProps) {
	const [viewRef, isVisible, entry] = useInView({ threshold: 1 });

	const [containerClass, setContainerClass] = useState('showcase-container');
	const [fieldClass, setFieldClass] = useState('showcase-field');
	const [squareClass, setSquareClass] = useState('square-image');
	const [problemClass, setProblemClass] = useState('math-problem');
	const [replayButtonClass, setReplayButtonClass] = useState('replay-button');
	const [textContainerClass, setTextContainerClass] = useState(
		`text-container ${lang}`
	);

	const [getSquareChildSrc, setSquareChildSrc] = useState<SquareChildSrcType>(
		'/assets/problem.webp'
	);

	const animate = () => {
		setContainerClass('showcase-container animate');
		setFieldClass('showcase-field animate');
		setSquareClass(`square-image ${lang} animate`);
		setProblemClass('math-problem animate');
		setTextContainerClass(`text-container ${lang} animate`);
		setReplayButtonClass('replay-button animate');
		const darkTimeout = setTimeout(() => {
			isDark.set(false);
			setSquareChildSrc(`/assets/proof-${lang}.jpg`);
		}, 4900);
		return () => clearTimeout(darkTimeout);
	};

	const resetAnimation = () => {
		setContainerClass('showcase-container');
		setFieldClass('showcase-field');
		setSquareClass(`square-image ${lang}`);
		setProblemClass('math-problem');
		setTextContainerClass(`text-container ${lang}`);
		setSquareChildSrc('/assets/problem.webp');
		setReplayButtonClass('replay-button');
		isDark.set(true);
	};

	useEffect(() => {
		if (isVisible) {
			return animate();
		}
	});

	return (
		<div className={containerClass}>
			<div className={fieldClass} ref={viewRef}>
				<div className={textContainerClass}>
					<p>{showcase.showcaseFieldText[lang]}</p>
				</div>
				<div className={squareClass}>
					<img
						src={getSquareChildSrc}
						className={problemClass}
						alt="math problem"
					/>
				</div>
			</div>
			<button className={replayButtonClass} onClick={resetAnimation}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					height="25"
					width="25">
					<path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
				</svg>
			</button>
		</div>
	);
}
