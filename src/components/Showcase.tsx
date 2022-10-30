/** @jsxImportSource solid-js */
import { createSignal, createEffect, Show } from 'solid-js';
import { createViewportObserver } from '@solid-primitives/intersection-observer';
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
	const isVisible = createSignal<boolean>(false);
	const [add] = createViewportObserver([], { threshold: 1 });
	const observer = (
		el: Element,
		signalFunction: () => [() => boolean, any]
	) => {
		const [_getter, setter] = signalFunction();
		add(el, signalFunction => setter(signalFunction.isIntersecting));
	};

	////////////////////////////////////////////////////////////////////

	const [containerClass, setContainerClass] =
		createSignal('showcase-container');
	const [fieldClass, setFieldClass] = createSignal('showcase-field');
	const [squareClass, setSquareClass] = createSignal('square-image');
	const [problemClass, setProblemClass] = createSignal('math-problem');
	const [textContainerClass, setTextContainerClass] = createSignal(
		`text-container ${lang}`
	);

	const [getSquareChildSrc, setSquareChildSrc] =
		createSignal<SquareChildSrcType>('/assets/problem.webp');
	const [showReloadButton, setShowReloadButton] = createSignal(false);
	let animatedTillBright = false;
	const animate = () => {
		setContainerClass('showcase-container animate');
		setFieldClass('showcase-field animate');
		setSquareClass(`square-image ${lang} animate`);
		setProblemClass('math-problem animate');
		setTextContainerClass(`text-container ${lang} animate`);
		if (animatedTillBright) isDark.set(false);
		else {
			setTimeout(() => {
				animatedTillBright = true;
				isDark.set(false);
				setSquareChildSrc(`/assets/proof-${lang}.jpg`);
			}, 4900);
			setTimeout(() => {
				setShowReloadButton(true);
			}, 6650);
		}
	};

	createEffect(() => {
		if (isVisible[0]()) {
			animate();
		}
	});

	const resetAnimation = () => {
		setContainerClass('showcase-container');
		setFieldClass('showcase-field');
		setSquareClass(`square-image ${lang}`);
		setProblemClass('math-problem');
		setTextContainerClass(`text-container ${lang}`);
		isDark.set(true);
		animatedTillBright = false;

		setSquareChildSrc('/assets/problem.webp');
		setShowReloadButton(false);
		animate();
	};

	return (
		<div class={containerClass()}>
			{/* @ts-expect-error */}
			<div class={fieldClass()} use:observer={isVisible}>
				<div class={textContainerClass()}>
					<p>{showcase.showcaseFieldText[lang]}</p>
				</div>
				<div class={squareClass()}>
					<img
						src={getSquareChildSrc()}
						class={problemClass()}
						alt="math problem"
					/>
				</div>
			</div>
			<Show when={showReloadButton()}>
				<button class="replay-button" onClick={resetAnimation}>
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
			</Show>
		</div>
	);
}
