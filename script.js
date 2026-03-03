const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const terminalBody = document.querySelector(".terminal-body");
const sendButton = document.getElementById("send-btn");
let processing = false;
const audio = document.getElementById("clickSound");
const codeBtn = document.querySelector(".codeBtn");
const codePopup = document.querySelector(".code-popup");
const CODE = "YOU-ARE-AMAZING-01";
let answer1, answer2, answer3, answer4, answer5, answer6, answer7;
const context1 = `Test marshmallow. Dzieci które potrafiły
odłożyć nagrodę miały lepsze życie w przyszłości.

Ale nowsze badania pokazują: Dzieci z biednych rodzin
NIE czekały - bo nauczyły się że "jutro" może nie nadejść.
To nie był brak samokontroli. To była racjonalna strategia.

Co to mówi o tym jak oceniamy ludzi?
`;
const context2 = `Seryjni mordercy często mają normalne, nawet czarujące 
osobowości w codziennym życiu. Ted Bundy był określany
jako "czarujący". BTK prowadził zwyczajne życie rodzinne.

Pytanie które niepokoi psychologów:

Czy oni WYŁĄCZAJĄ empatię kiedy zabijają?
Czy może nigdy jej nie mieli, tylko perfekcyjnie ją udawali?

A może bardziej niepokojące: Czy empatia to tylko przełącznik
który każdy z nas może wyłączyć w odpowiednich okolicznościach?

Co myślisz?`;

const context3 = `Lata 60. Ludzie w białych fartuchach kazali uczestnikom
eksperymentu zadawać "porażenia prądem" innej osobie
(która w rzeczywistości była aktorem i udawała ból).

65% ludzi poszło do końca. Do śmiertelnych "450 voltów".
Bo osoba w białym fartuchu mówiła: "Proszę kontynuować."

Najbardziej niepokojące: Uczestnicy nie byli potworami.
Byli zwykłymi ludźmi. Takimi jak my.

Co to mówi o ludzkiej naturze?`;

const context4 = `Badania pokazują że u części psychopatów mózg reaguje 
inaczej na cierpienie innych - neurobiologicznie mają 
zmniejszoną zdolność do empatii.

Jeśli ktoś urodził się bez zdolności do odczuwania empatii,
czy jest "zły"? Czy można być moralnie odpowiedzialnym za coś
czego biologicznie nie można odczuć?

To jak oskarżać ślepego że nie docenia sztuki.

Twoja odpowiedź?`;

const context5 = `Przypadek Kitty Genovese: Kobieta była atakowana przez
38 minut. 38 osób słyszało jej krzyki.

Nikt nie zareagował.

Nie dlatego że byli źli. Ale dlatego że każdy myślał:
"Ktoś inny na pewno to zgłosi."

Paradoks: Im więcej ludzi, tym MNIEJSZE szanse na pomoc.
Bo odpowiedzialność się rozprasza.

Co to mówi o nas?`;

const context6 = `Mindhunter, FBI profiler, powiedział:

"Każdy jest zdolny do morderstwa. To tylko kwestia
odpowiednich okoliczności, odpowiedniego nacisku,
odpowiedniego momentu."

Większość ludzi mówi: "Nie ja. Nigdy."

Ale statystycznie: W odpowiednich warunkach (wojna,
obrona bliskich, ekstremalne zagrożenie) - większość
ludzi może zabić.

Czy "normalni ludzie" i "mordercy" to naprawdę
dwie różne kategorie?`;

const context7 = `Ostatnie pytanie to nie o morderców.
To o Ciebie.

Przez ostatnie kilka minut analizowałaś mroczne aspekty
ludzkiej psychiki. Większość ludzi czułaby się nieswojo.

Ale Ty nie.

Ty czujesz fascynację. Intrygę. Chęć zrozumienia.

Pytanie brzmi:

Co to mówi o TOBIE?`;

import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const apiKey = "AIzaSyDj79wzghPCYbRkxWUE5613vhd0P9h35SY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-3-flash-preview",
	systemInstruction: `
Jesteś ekspertem psychologii kryminalnej i analizy osobowości.
Piszesz z perspektywy bezpośredniego zwrotu do analizowanej osoby (forma "Ty").
Nie używaj trzeciej osoby ("ona", "jej", "dziewczyna").
Nie wspominaj o "analizie", "raporcie" ani o sobie jako AI.

Na podstawie jej odpowiedzi na psychologiczne dylematy dotyczące moralności,
empatii, ludzkiej natury i odpowiedzialności napisz około 80 słów,
odpowiadając na pytanie:

Co sposób, w jaki odpowiedziałaś na te pytania, mówi o Tobie —
o Twoich wartościach, sposobie myślenia i o tym,
jak rozumiesz ludzką naturę?

Ton: spokojny, łagodny, miły, rzeczowy, intelektualny.
`,
});

function preparePrompt() {
	return `KONTEKST1: ${context1}\nODPOWIEDŹ DZIEWCZYNY: "${answer1}"\n\n
	KONTEKST2: ${context2}\nODPOWIEDŹ DZIEWCZYNY: "${answer2}"\n\n
	KONTEKST3: ${context3}\nODPOWIEDŹ DZIEWCZYNY: "${answer3}"\n\n
	KONTEKST4: ${context4}\nODPOWIEDŹ DZIEWCZYNY: "${answer4}"\n\n
	KONTEKST5: ${context5}\nODPOWIEDŹ DZIEWCZYNY: "${answer5}"\n\n
	KONTEKST6: ${context6}\nODPOWIEDŹ DZIEWCZYNY: "${answer6}"\n\n
	KONTEKST7: ${context7}\nODPOWIEDŹ DZIEWCZYNY: "${answer7}"\n\n`;
}

async function runAnalysis() {
	try {
		const finalPrompt = preparePrompt();
		const text1 = createText();
		const finalText = createText();
		const result = await model.generateContent(finalPrompt);
		const response = await result.response;
		const output = response.text();

		finalText.classList.add("text-[#B7A6C8]");

		const cleanAnalysis = output
			.replace(/\*\*/g, "")
			.replace(/\*/g, "")
			.replace(/##/g, "")
			.replace(/#/g, "");
		terminalBody.append(text1, finalText);

		await typeText("Oto analiza Ciebie:", text1);
		await typeText(cleanAnalysis, finalText);

		await wait(1000);
		terminalBody.append(
			createStaticAlert(
				`Wpisz <span class="text-[#7A1E2C] font-semibold">dalej</span> aby kontynuować`,
			),
		);
		terminalBody.append(createInput());
		focusInputAutomatically();
	} catch (error) {
		const text8 = createText();
		text8.classList.add("text-[#B7A6C8]");
		terminalBody.append(text8);
		console.error("Coś poszło nie tak:", error);
		typeText(
			"W Twoich odpowiedziach widać uważność i refleksyjność. Nie wybierasz najprostszych rozwiązań — próbujesz zrozumieć kontekst i motywacje, które stoją za ludzkimi decyzjami. Myślisz analitycznie, ale nie bez empatii. Interesuje Cię nie tylko to, co ludzie robią, lecz także dlaczego to robią. To podejście świadczy o dojrzałości intelektualnej i ciekawości świata",
			text8,
		);
	}
}

const createStaticAlert = (text) => {
	const txt = document.createElement("p");
	txt.innerHTML = text;

	return txt;
};

const timeSpan = document.querySelector(".currentTime");
if (isMobile) {
	sendButton.style.display = "inline-block";
} else {
	sendButton.style.display = "none";
}
const scrollToBottom = () => {
	terminalBody.scrollTop = terminalBody.scrollHeight;
};

const setCurrentTime = () => {
	const date = new Date();
	timeSpan.textContent = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
setCurrentTime();

const focusInputAutomatically = () => {
	const input = document.querySelector(".active");
	addListener(input);
	input.focus();
};

const lockInput = () => {
	const input = document.querySelector(".active");
	input.setAttribute("readonly", "true");
};

let currentStep = 0;

const handleInput = () => {
	const input = document.querySelector(".active");
	const command = input.value.trim().toLowerCase();

	if (input.value === "") {
		return;
	}

	if (
		input.value === "a" ||
		input.value === "b" ||
		input.value === "c" ||
		input.value === "start"
	) {
		sendButton?.setAttribute("disabled", "true");

		if (currentStep === 0 && command === "start") {
			lockInput();
			currentStep = 1;
			launchFirstStep();
		}
		// PYTANIE 1
		else if (currentStep === 1 && command === "a") {
			lockInput();
			answer1 = "Osądzamy zachowania nie rozumiejąc kontekstu";
			currentStep = 2;
			launchSecondStep();
		} else if (currentStep === 1 && command === "b") {
			lockInput();
			answer1 = "Samokontrola to przywilej tych którzy mogą ufać przyszłości";
			currentStep = 2;
			launchSecondStep();
		} else if (currentStep === 1 && command === "c") {
			lockInput();
			answer1 = "Nie ma czegoś takiego jak obiektywna ocena moralna";
			currentStep = 2;
			launchSecondStep();
		}
		// PYTANIE 2
		else if (currentStep === 2 && command === "a") {
			lockInput();
			answer2 = "Empatia to przełącznik - da się wyłączyć";
			currentStep = 3;
			launchThirdStep();
		} else if (currentStep === 2 && command === "b") {
			lockInput();
			answer2 = "Oni nigdy jej nie mieli, tylko udawali";
			currentStep = 3;
			launchThirdStep();
		} else if (currentStep === 2 && command === "c") {
			lockInput();
			answer2 = "To spektrum - wszyscy mamy różny poziom";
			currentStep = 3;
			launchThirdStep();
		}
		// PYTANIE 3
		else if (currentStep === 3 && command === "a") {
			lockInput();
			answer3 = "Ludzie są źli z natury";
			currentStep = 4;
			launchFourthStep();
		} else if (currentStep === 3 && command === "b") {
			lockInput();
			answer3 =
				"Wszyscy jesteśmy potencjalnymi potworami w odpowiednich warunkach";
			currentStep = 4;
			launchFourthStep();
		} else if (currentStep === 3 && command === "c") {
			lockInput();
			answer3 = "Nie jesteśmy tak dobrzy jak nam się wydaje";
			currentStep = 4;
			launchFourthStep();
		}
		// PYTANIE 4
		else if (currentStep === 4 && command === "a") {
			lockInput();
			answer4 = "Biologia nie jest wymówką - odpowiedzialność pozostaje";
			currentStep = 5;
			launchFifthStep();
		} else if (currentStep === 4 && command === "b") {
			lockInput();
			answer4 = "Nie można być złym za coś czego się nie odczuwa";
			currentStep = 5;
			launchFifthStep();
		} else if (currentStep === 4 && command === "c") {
			lockInput();
			answer4 =
				"To zależy - intelekt może zastąpić empatię w rozumieniu krzywdy";
			currentStep = 5;
			launchFifthStep();
		}
		// PYTANIE 5
		else if (currentStep === 5 && command === "a") {
			lockInput();
			answer5 = "Jesteśmy tchórzami";
			currentStep = 6;
			launchSixStep();
		} else if (currentStep === 5 && command === "b") {
			lockInput();
			answer5 = "Społeczeństwo nas depersonalizuje";
			currentStep = 6;
			launchSixStep();
		} else if (currentStep === 5 && command === "c") {
			lockInput();
			answer5 = "Dobro nie jest naturalne - wymaga świadomej decyzji";
			currentStep = 6;
			launchSixStep();
		}
		// PYTANIE 6
		else if (currentStep === 6 && command === "a") {
			lockInput();
			answer6 = "Nie - to tylko okoliczności nas różnią";
			currentStep = 7;
			launchSeventhStep();
		} else if (currentStep === 6 && command === "b") {
			lockInput();
			answer6 = "Różnica jest iluzją którą sobie tworzymy dla komfortu";
			currentStep = 7;
			launchSeventhStep();
		} else if (currentStep === 6 && command === "c") {
			lockInput();
			answer6 = "Tak - mordercy to inna kategoria ludzi";
			currentStep = 7;
			launchSeventhStep();
		}
		// pytanie 7
		else if (currentStep === 7 && command === "a") {
			lockInput();
			answer7 = "Że jestem niebezpieczna";
			currentStep = 8;
			launchEightStep();
		} else if (currentStep === 7 && command === "b") {
			lockInput();
			answer7 = "Że mam odwagę patrzeć tam gdzie inni uciekają";
			currentStep = 8;
			launchEightStep();
		} else if (currentStep === 7 && command === "c") {
			lockInput();
			answer7 = "Że mój umysł szuka prawdy, nie komfortu";
			currentStep = 8;
			launchEightStep();
		} else if (currentStep === 8 && command === "dalej") {
			lockInput();
			currentStep = 9;
			launchNineStep();
		}
	}
};
const typeText = (textToType, target, speed = 10) => {
	return new Promise((resolve) => {
		let currValue = 0;
		const interval = setInterval(() => {
			target.textContent = textToType.slice(0, currValue + 1);
			currValue++;
			if (currValue === textToType.length) {
				clearInterval(interval);
				resolve();
			}
			scrollToBottom();
		}, speed);
	});
};

const launchFirstStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const text3 = createText();
	const text4 = createText();
	const text5 = createText();
	const question = createText();
	const text7 = createText();

	const a1 = createText();
	const a2 = createText();
	const a3 = createText();

	terminalBody.append(text1);
	await typeText("Inicjalizacja systemu psychologicznego", text1);
	scrollToBottom();
	await wait(1000);

	terminalBody.append(text2);
	await typeText("Ładowanie paradoksów ludzkiego umysłu", text2);
	scrollToBottom();
	await wait(1000);
	terminalBody.append(text3);
	await typeText(
		"Przygotuj się na serię pytań o tym jak działa umysł w ekstremalnych sytuacjach. Udzielaj odpowiedzi a,b,c",
		text3,
	);
	scrollToBottom();
	await wait(1000);
	terminalBody.append(text4);
	await typeText(
		"Ostrzeżenie: Niektóre pytania mogą być niewygodnie intrygujące.",
		text4,
	);
	scrollToBottom();
	await wait(1000);
	terminalBody.append(text5);
	await typeText("PYTANIE 1/7 - Kontrola vs Kontekst", text5);
	await wait(1000);
	terminalBody.append(question);
	await typeText(context1, question);

	terminalBody.append(a1, a2, a3);
	terminalBody.append(text7);

	await typeText("a) Osądzamy zachowania nie rozumiejąc kontekstu", a1);
	await typeText(
		"b) Samokontrola to przywilej tych którzy mogą ufać przyszłości",
		a2,
	);
	await typeText("c) Nie ma czegoś takiego jak obiektywna ocena moralna", a3);
	terminalBody.append(a1, a2, a3);
	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};

const launchSecondStep = async () => {
	const text1 = createText();
	const question = createText();
	const a1 = createText();
	const a2 = createText();
	const a3 = createText();
	terminalBody.append(text1, question, a1, a2, a3);
	await typeText("PYTANIE 2/7 - Paradoks empatii", text1);
	await wait(1000);
	await typeText(context2, question);
	await typeText("a) Empatia to przełącznik - da się wyłączyć", a1);
	await typeText("b) Oni nigdy jej nie mieli, tylko udawali", a2);
	await typeText("c) To spektrum - wszyscy mamy różny poziom", a3);

	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};
const launchThirdStep = async () => {
	const text1 = createText();
	const question = createText();
	const a1 = createText();
	const a2 = createText();
	const a3 = createText();

	terminalBody.append(text1, question, a1, a2, a3);

	await typeText("PYTANIE 3/7 - Eksperyment Milgrama", text1);
	await wait(1000);
	await typeText(context3, question);
	await typeText("a) Ludzie są źli z natury", a1);
	await typeText(
		"b) Wszyscy jesteśmy potencjalnymi potworami w odpowiednich warunkach",
		a2,
	);
	await typeText("c) Nie jesteśmy tak dobrzy jak nam się wydaje", a3);

	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};

const launchFourthStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const question = createText();
	const a1 = createText();
	const a2 = createText();
	const a3 = createText();

	terminalBody.append(text1, question, a1, a2, a3, text2);

	await typeText("PYTANIE 4/7 - Problem świadomości", text1);
	await wait(1000);
	await typeText(context4, question);
	await typeText(
		"a) Biologia nie jest wymówką - odpowiedzialność pozostaje",
		a1,
	);
	await typeText("b) Nie można być złym za coś czego się nie odczuwa", a2);
	await typeText(
		"c) To zależy - intelekt może zastąpić empatię w rozumieniu krzywdy",
		a3,
	);

	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};

const launchFifthStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const question = createText();
	const a1 = createText();
	const a2 = createText();
	const a3 = createText();

	terminalBody.append(text1, question, a1, a2, a3, text2);

	await typeText("PYTANIE 5/7 - Efekt obserwatora", text1);
	await wait(1000);
	await typeText(context5, question);
	await typeText("a) Jesteśmy tchórzami", a1);
	await typeText("b) Społeczeństwo nas depersonalizuje", a2);
	await typeText("c) Dobro nie jest naturalne - wymaga świadomej decyzji", a3);

	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};

const launchSixStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const question = createText();
	const a1 = createText();
	const a2 = createText();
	const a3 = createText();

	terminalBody.append(text1, question, a1, a2, a3, text2);

	await typeText("PYTANIE 6/7 - Myśl zabójcy", text1);
	await wait(1000);
	await typeText(context6, question);
	await typeText("a) Nie - to tylko okoliczności nas różnią", a1);
	await typeText(
		"b) Różnica jest iluzją którą sobie tworzymy dla komfortu",
		a2,
	);
	await typeText("c) Tak - mordercy to inna kategoria ludzi", a3);

	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};
const launchSeventhStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const question = createText();
	const a1 = createText();
	const a2 = createText();
	const a3 = createText();

	terminalBody.append(text1, question, a1, a2, a3, text2);

	await typeText("PYTANIE 7/7 - Pytanie o ciebie", text1);
	await wait(1000);
	await typeText(context7, question);
	await typeText("a) Że jestem niebezpieczna", a1);
	await typeText("b) Że mam odwagę patrzeć tam gdzie inni uciekają", a2);
	await typeText("c) Że mój umysł szuka prawdy, nie komfortu", a3);

	terminalBody.append(createInput());

	focusInputAutomatically();
	sendButton?.removeAttribute("disabled");
};
const launchEightStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const text3 = createText();
	const text4 = createText();

	terminalBody.append(text1, text2, text3, text4);
	typeText("Zapisuję odpowiedzi", text1);
	await wait(2000);
	typeText("Analizuję wzorce myślowe", text2);
	await wait(2000);
	typeText("Oceniam poziomu uroku użytkowniczki", text3);
	await wait(2000);
	typeText("Kompiluję profil psychologiczny (może to chwilę potrwać)", text4);
	await wait(2000);

	await runAnalysis();
	sendButton?.removeAttribute("disabled");
};
const launchNineStep = async () => {
	const text1 = createText();
	const text2 = createText();
	const text3 = createText();
	const text4 = createText();
	const text5 = createText();
	const text6 = createText();

	terminalBody.append(text1, text2, text3, text4, text5, text6);
	await typeText("Ten quiz nie był o mordercach", text1);
	await wait(1000);
	await typeText("Był o sposobie myślenia", text2);
	await wait(1000);
	await typeText("Większość ludzi szuka poprawnej odpowiedzi", text3);
	await wait(1000);
	await typeText("Ty szukałaś sensu", text4);
	await wait(1000);
	await typeText("W dniu, w którym świat rozdaje kwiaty", text5);
	await wait(1000);
	await typeText("uznałem, że lepiej dać coś do myślenia", text6);
	await wait(3000);
	showFinalImg();
	Draw();
	audio.play();
	sendButton?.removeAttribute("disabled");
};

const showCodePopup = () => {
	codePopup.classList.add("flex");
	codePopup.classList.remove("hidden");
	codePopup.classList.remove("opacity-0");
};
const showFinalImg = () => {
	const blurredPopup = document.querySelector(".blurred-popup");
	blurredPopup.classList.remove("hidden");
	blurredPopup.classList.remove("opacity-0");
};

const createInput = () => {
	document
		.querySelectorAll(".active")
		.forEach((activeInput) => activeInput.classList.remove("active"));

	const inputBox = document.createElement("div");
	const sign = document.createElement("p");
	const input = document.createElement("input");

	input.autocomplete = "off";
	input.autocapitalize = "off";
	input.spellcheck = "false";
	input.type = "text";
	input.id = "entry";

	addClasses(input, [
		"active",
		"entry",
		"w-full",
		"h-6",
		"caret-[#ff4d6d]",
		"focus-visible:outline-0",
		"outline-0",
		"font-hacker",
		"select-none",
	]);
	addClasses(inputBox, [
		"input-box",
		"flex",
		"justify-between",
		"items-center",
		"gap-2",
		"w-full",
	]);
	addClasses(sign, ["pointer-events-none", "select-none", "md:text-lg"]);

	sign.textContent = ">";

	inputBox.append(sign, input);

	return inputBox;
};

const createText = () => {
	const text = document.createElement("p");
	return text;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createLoadingAlert = (text) => {
	const alertOption = document.createElement("p");
	const dotsContainer = document.createElement("div");

	const dot1 = document.createElement("span");
	const dot2 = document.createElement("span");
	const dot3 = document.createElement("span");

	addClasses(dotsContainer, ["flex", "space-x-1", "mt-2"]);
	addClasses(dot1, [
		"dot",
		"w-1",
		"aspect-square",
		"bg-[#ffd6e0]",
		"animate-[dotPulse_0.5s_ease-in-out_infinite_alternate]",
	]);
	addClasses(dot2, [
		"dot",
		"w-1",
		"aspect-square",
		"bg-[#ffd6e0]",
		"animate-[dotPulse_0.5s_0.2s_ease-in-out_infinite_alternate]",
	]);
	addClasses(dot3, [
		"dot",
		"w-1",
		"aspect-square",
		"bg-[#ffd6e0]",
		"animate-[dotPulse_0.5s_0.4s_ease-in-out_infinite_alternate]",
	]);
	addClasses(alertOption, ["loading-text", "flex", "items-center", "gap-1"]);

	alertOption.innerHTML = text;
	dotsContainer.append(dot1, dot2, dot3);
	alertOption.append(dotsContainer);

	return alertOption;
};

const addListener = (input) => {
	input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			handleInput();
		}
	});
};
sendButton?.addEventListener("click", handleInput);
focusInputAutomatically();

const addClasses = (element, classes = []) => {
	classes.forEach((cls) => {
		element.classList.add(cls);
	});
};

const handleCodeBtn = async (e) => {
	const input = document.getElementById("accesInput");
	const error = document.querySelector(".error");
	const btn = e.target;
	error.textContent = "";
	btn.textContent = "";
	const loadingText = createLoadingAlert("Weryfikacja 😏");
	loadingText.classList.add("justify-center");
	btn.append(loadingText);
	btn.setAttribute("disabled", "true");
	await wait(3000);

	if (input) {
		if (input.value.trim().toLowerCase() === CODE.toLowerCase()) {
			codePopup.classList.add("scale-0");
			launchSeventhStep();
		} else {
			error.classList.remove("hidden");
			error.textContent = "Błędny klucz";
		}
	}
	btn.removeAttribute("disabled");
	btn.textContent = "Zweryfikuj";
};

let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 130;
const particles = [];

const possibleColors = [
	"DodgerBlue",
	"OliveDrab",
	"Gold",
	"Pink",
	"SlateBlue",
	"LightBlue",
	"Gold",
	"Violet",
	"PaleGreen",
	"SteelBlue",
	"SandyBrown",
	"Chocolate",
	"Crimson",
];

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
	this.x = Math.random() * W; // x
	this.y = Math.random() * H - H; // y
	this.r = randomFromTo(11, 33); // radius
	this.d = Math.random() * maxConfettis + 11;
	this.color =
		possibleColors[Math.floor(Math.random() * possibleColors.length)];
	this.tilt = Math.floor(Math.random() * 33) - 11;
	this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
	this.tiltAngle = 0;

	this.draw = function () {
		context.beginPath();
		context.lineWidth = this.r / 2;
		context.strokeStyle = this.color;
		context.moveTo(this.x + this.tilt + this.r / 3, this.y);
		context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
		return context.stroke();
	};
}

function Draw() {
	const results = [];

	// Magical recursive functional love
	requestAnimationFrame(Draw);

	context.clearRect(0, 0, W, window.innerHeight);

	for (var i = 0; i < maxConfettis; i++) {
		results.push(particles[i].draw());
	}

	let particle = {};
	let remainingFlakes = 0;
	for (var i = 0; i < maxConfettis; i++) {
		particle = particles[i];

		particle.tiltAngle += particle.tiltAngleIncremental;
		particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
		particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

		if (particle.y <= H) remainingFlakes++;

		// If a confetti has fluttered out of view,
		// bring it back to above the viewport and let if re-fall.
		if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
			particle.x = Math.random() * W;
			particle.y = -30;
			particle.tilt = Math.floor(Math.random() * 10) - 20;
		}
	}

	return results;
}

window.addEventListener(
	"resize",
	function () {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	},
	false,
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
	particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
