const $ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document),
body = $('body');

$('.wrapper').addEventListener("click", chooseOptionClick);

function chooseOptionClick(event){
	if(event.target.classList.contains('filter__btn')) {
		openFilterList();
		filter();
	} else {if($$('.filter').length > 0) $('.filter__list').classList.remove('filter__list_active')};
	if(event.target.closest('.test-quiz__variant')||
	event.target.closest('.test-quiz__variant-q4')) checkboxActive();
	if(event.target.closest('.test-quiz__question_3')) renderCheckboxActive();
	if(event.target.classList.contains('quiz-btn-next')) nextQuiz();
	if(event.target.classList.contains('quiz-btn-prev')) prevQuiz();
	if(event.target.classList.contains('modal-open')) openModal();
	if(event.target.classList.contains('modal-close')||
	event.target.classList.contains('modal')) closeModal();
	if(event.target.classList.contains('main__btn')) quizScroll();
	if(event.target.closest('.menu__burger')) openBurger();
	if(event.target.classList.contains('goods-card__btn-list')) switchDescription();
	if(event.target.closest('.goods-card__dots')) changeSlide(event.target);
	if(event.target.classList.contains('show-more-cards')) showMoreCards(event.target);
	if(event.target.classList.contains('show-more-cards1')) showMoreCards1(event.target);
	if(event.target.classList.contains('slider-next')||
		event.target.classList.contains('slider-prev')) sliderMove(event.target);
	if(event.target.classList.contains('slider-next-main')||
		event.target.classList.contains('slider-prev-main')) sliderMoveMain(event.target);
	if(event.target.classList.contains('rainbow__list-title')) openRainbow(event.target);
}

function openRainbow(el){
	el.classList.toggle('rainbow__list-title_active');
	el.nextElementSibling.classList.toggle('rainbow__sub-list_active');
}

function openBurger(){
	if(!$('.menu').classList.contains(('menu__active'))) {
		body.classList.add('lock');
	} else{body.classList.remove('lock');}
	$('.menu').classList.toggle('menu__active');
	$('.menu__burger').classList.toggle('menu__burger-icon_active');
}

if($$('.quiz').length > 0){
const counterCommon = $('.test-quiz__count'),
sides = $$('[name="position"]'),
questions = $$('.test-quiz__question'),
quizWindow = $('.test-quiz'),
checkBoxes = $$('[type="checkbox"]'),
ranges = $$('.test-quiz__range');
let counter = 0;

counterRender();
checkboxActive();
function checkboxActive(){
	const checkboxes = $$('.check');
	for(let checkbox of checkboxes){
		if(checkbox.checked){
			checkbox.parentElement.classList.add('quiz_active-box');
		} else{checkbox.parentElement.classList.remove('quiz_active-box');}
	}
	renderRange();
}
renderCheckboxActive();
function renderCheckboxActive(){
	checkboxCounter = 0;
	checkBoxes.forEach((item, index) =>{
		if(item.checked){
			checkboxCounter++;
			item.previousElementSibling.textContent = checkboxCounter;
		}
	});
}

function nextQuiz(){
	if(counter >= questions.length-1) return;
	counter++;
	questions.forEach((item, index) =>{
		if(index == counter) {
			item.classList.remove('hidden');
		} else {item.classList.add('hidden');}
	});
	counterRender(counter);
	quizScroll();
}
function prevQuiz(event){
	if(counter <= 0) return;
	counter--;
	questions.forEach((item, index) =>{
		if(index == counter) {
			item.classList.remove('hidden');
		} else {item.classList.add('hidden');}
	});
	counterRender(counter);
	quizScroll();
}

function counterRender(){
	counterCommon.innerHTML = `<span>${counter}</span>/${questions.length-1}`;
}

function renderRange(){
	ranges.forEach((item) =>{item.classList.add('hidden');});
	sides.forEach((item, index) =>{
		if(item.checked){
			for(let i = 0; i <= index; i++){
				ranges[i].classList.remove('hidden');
			}
		}
	});
}

function quizScroll(){
	quizWindow.scrollIntoView({
		block: "end",
		behavior: "smooth",
	});
}
$$('.range').forEach((item) => item.addEventListener('input', changeRange));
	function changeRange(){
		let el = this.closest('.test-quiz__range'),
		range = el.querySelector('.range');
		el.querySelector('.test-quiz__output').textContent = range.value;
		el.querySelector('.test-quiz__cursor').style.left = `${range.value/range.max * 100}%`;
		el.querySelector('.test-quiz__bg-line').style.width = `${range.value/range.max * 100}%`;
	}
}

if($$('.modal').length > 0){
	let zIndex = 11;
	function openModal() {
		zIndex++;
		let element = $(`.${event.target.dataset.modal}`);
		if(event.target.closest('.card-material__item')) renderCardMaterial(event.target.parentElement);
		if(event.target.closest('.models-popular__item')) renderGoodsCard(event.target.closest('.models-popular__item'));
		if(event.target.closest('.goods-card__block')) renderGoodsCardSend(event.target.closest('.goods-card__block'));
		if(event.target.closest('.slider-track-src')) getModaSliderElements(event.target.closest('.slider-track-src'));
		element.style.top = event.clientX + 'px';
		element.style.left = event.clientY + 'px';
		element.style.zIndex = zIndex;
		element.classList.remove('hidden');
		setTimeout(() => {
			element.style.top = '';
			element.style.left = '';
			}, 50)
		setTimeout(() => element.classList.remove('show'), 10)
		let paddingCorrect = window.innerWidth - $('body').clientWidth;
		body.classList.add('lock');
		body.style.paddingRight = paddingCorrect + 'px';
	}
	function closeModal(){
		zIndex--;
		let element = event.target.closest('.modal');
		element.style.zIndex = '';
		setTimeout(() => element.classList.add('hidden'), 305);
		element.classList.add('show');
		body.classList.remove('lock');
		body.style.paddingRight = '';
		}
	function renderCardMaterial(element){
		$('.call__card-material').innerHTML = `
		${element.querySelector('img').outerHTML}
		${element.querySelector('.card-material__title').textContent}
		`;
	}
	function switchDescription(element){
		element = $(`.${event.target.dataset.switch}`);
		$$('.goods-card__btn-list').forEach((item) =>{
			item.classList.remove('goods-card__btn-list_active');
		});
		event.target.classList.add('goods-card__btn-list_active');
		$$('.goods-card-list').forEach((item) =>{
			item.classList.add('hidden');
			if(item.classList.contains(`${event.target.dataset.switch}`)) item.classList.remove('hidden');
		});
	}

	function getModaSliderElements(element){
		let images = element.querySelectorAll('img');
		titles = element.querySelectorAll('.decors-decor__sub-title');
		if(titles.length > 0) renderDecorsSlider1(images, titles);
		if(element.closest('.mat')||
			element.closest('.metall')||
			element.closest('.gloss')||
			element.closest('.photoprint')) renderDecorsSlider2(images);
		if(element.closest('.decision')||
			element.closest('.k-style')) renderReadyDecisions(images);
			searchChousenImg(event.target.parentElement.
			querySelector('img').getAttribute('src'), images, event.target);
	}
	function searchChousenImg(compareAtt, img, tar){
		for(let i = 0; i < img.length; i++){
			if(compareAtt == img[i].getAttribute('src')){
				setTimeout(sliderMove, 1, $('.slider-next'), i, tar);
			}
		}
	}
	function renderDecorsSlider1(images, titles){
		$('.decors-slider__track').innerHTML = '';
		for(let i = 0; i < images.length; i++){
		$('.decors-slider__track').insertAdjacentHTML('beforeend',
			`<div class="decors-slider__item slider-item">
					<div class="decors-slider__sup-title">${titles[i].textContent}</div>
					<div class="decors-slider__img">${images[i].outerHTML}</div>
				</div>`);
		}
	}
	function renderDecorsSlider2(images){
		$('.decors-slider__track').innerHTML = '';
		for(let i = 0; i < images.length; i++){
		$('.decors-slider__track').insertAdjacentHTML('beforeend',
			`<div class="decors-slider__item slider-item">
					<div class="decors-slider__img">${images[i].outerHTML}</div>
				</div>`);
		}
	}
	function renderReadyDecisions(images){
		$('.ready-decision__slider_track').innerHTML = '';
		for(let i = 0; i < images.length; i++){
		$('.ready-decision__slider_track').insertAdjacentHTML('beforeend',
			`<div class="ready-decision__slider_item slider-item">${images[i].outerHTML}</div>`
			);
		}
	}
	function renderGoodsCard(element){
		$('.goods-card__slide-container').innerHTML = element.firstElementChild.outerHTML;
		$('.goods-card__title').innerHTML = element.
		querySelector('.models-popular__title').textContent;
		$('.goods-card__price').innerHTML = element.
		querySelector('.models-popular__new').textContent;
		$('.goods-card__old-price').innerHTML = element.
		querySelector('.models-popular__old').textContent;
		$('.goods-card__character').innerHTML =
			element.querySelector('.models-popular__character').innerHTML;
		$('.goods-card__description').innerHTML = element.
		querySelector('.models-popular__description').innerHTML;
		$('.goods-card__slides').innerHTML = element.
		querySelector('.models-popular__slides').innerHTML;
	}

	function renderGoodsCardSend(element){
		$('.call__goods-card').innerHTML = `
		${element.querySelector('img').outerHTML}
		<div class="call__goods-card-block">
		<div class="call__goods-card-title">${element.querySelector('.goods-card__title').textContent}</div>
		<div class="call__goods-card-old">${element.querySelector('.goods-card__old-price').textContent}</div>
		<div class="call__goods-card-price">${element.querySelector('.goods-card__price').textContent}</div>
		</div>
		`;
	}
}

if($$('.filter').length > 0){
function openFilterList(){
	$$('.filter__btn').forEach((item) => item.classList.remove('filter__active'));
	$('.filter__list').classList.toggle('filter__list_active');
	event.target.classList.add('filter__active');
	objectFilter(event.target.dataset.filter);
	showMoreCards();
}

function filter(){
	$$('.filter-el').forEach((item) => {
		item.classList.remove('hidden');
		if(!item.classList.contains(event.target.dataset.filter)&&
			(event.target.dataset.filter != 'all')){
			item.classList.add('hidden');
		}
	});
}}


if($$('.decors-decor').length > 0||
	$$('.k-style').length > 0||
	$$('.photoprn').length > 0) {
		let arr = decors;
	let arrObjects = [],
	arrPathes = [];
	if($$('.k-style').length > 0){
		objectFilter('econom');
	} else objectFilter('all');
function objectFilter(fValue){
	arrObjects = [];
	arrPathes = [];
	for(let key in arr){
		if($$(`.${key}`).length > 0) {
			search(key, arr[key], fValue);
		}
	}
}

function search(key, kValue, fValue){
	$(`.${key}`).innerHTML = '';
	for(let i = 0; i < kValue.length; i++){
		if(kValue[i].filter == fValue) {
		arrObjects.push(kValue[i]);
		arrPathes.push(key);
		} else if(fValue == 'all') {
			arrObjects.push(kValue[i]);
			arrPathes.push(key);
		}
	}
	cardsCounter = 0;
	prevCards = 0;
}
	var prevCards = 0,
	step = 8,
	cardsCounter = 0;
		window.addEventListener("load", showMoreCards)
	function showMoreCards(el){
		cardsCounter++;
		let cards = cardsCounter * step;
		if($$('.show-more-cards').length > 0){
		if(cards >= arrObjects.length) {
			cards = arrObjects.length;
			$('.show-more-cards').classList.add('hidden');
		} else {$('.show-more-cards').classList.remove('hidden');}}
		renderCatalogCards(cards);
		}
		function renderCatalogCards(cards){
			for(let i = prevCards; i < cards; i++){
				chooseRenderOption(arrObjects[i], arrPathes[i]);
			}
			return prevCards = prevCards + step;
		}
	function chooseRenderOption(object, path){
		if(path == 'mat'||
		path == 'metall'||
		path == 'gloss') renderDecorNoTitle(object, path);
		if(path == 'ldsp'||
			path =='arpa'||
			path == 'marshall'||
			path == 'tabletop') renderDecorWithTitle(object, path);
			if(path == 'kstyle') renderKStyle(object, path);
		if(path == 'photoprn') renderPhotoprint(object, path);
		}
}
function renderKStyle(object, path){
	$(`.${path}`).insertAdjacentHTML('beforeend',
	`<div class="k-style__item" id="${object.id}">
			<img src="img/${path}/${object.file}" alt="${object.file}">
			<button class="k-style__btn modal-open" data-modal="ready-decision-modal" type="button"></button>
		</div>`);
}
function renderPhotoprint(object, path){
	$(`.${path}`).insertAdjacentHTML('beforeend',
	`<div class="photoprint__item">
	<span></span>
	<img src="${object.file}" class="modal-open" data-modal="decors-modal" alt="${object.name}">
	</div>`);
}

function renderDecorNoTitle(object, path){
	$(`.${path}`).classList.add('slider-track-src');
	$(`.${path}`).insertAdjacentHTML('beforeend',
			`<div class="decors-decor__item" id="${object.id}">
				<div class="decors-decor__img"><img src="img/decors/mdf/${path}/${object.file}" alt="${object.name}">
				<button class="modal-open" type="button" data-modal="decors-modal"></button></div>
			</div>`);
}
function renderDecorWithTitle(object, path){
	$(`.${path}`).classList.add('slider-track-src');
	$(`.${path}`).insertAdjacentHTML('beforeend',
			`<div class="decors-decor__item" id="${object.id}">
				<div class="decors-decor__img"><img src="img/decors/${path}/${object.file}" alt="${object.name}">
				<button class="modal-open" type="button" data-modal="decors-modal"></button></div>
				<div class="decors-decor__sub-title">${object.name}</div>
			</div>`);
		}

if($$('.models-popular').length > 0){
	let prevCards1 = 0,
	step1 = 6,
	cardsCounter1 = 0;
	function showMoreCards1(){
		cardsCounter1++;
		let cards = cardsCounter1 * step1;
		if(cards >= catalog.length) {
			cards = catalog.length;
			$('.show-more-cards').classList.add('hidden');
		}
		renderCatalogCards(cards);
	}
showMoreCards1();
	function renderCatalogCards(cards){
	for(let i = prevCards1; i < cards; i++){
	$('.models-popular').insertAdjacentHTML("beforeend",
		`
		<div class="models-popular__item" id="${catalog[i].id}">
			<img src="img/catalog/${catalog[i].picture[0]}" alt="popular models">
			<div class="models-popular__about">
				<div class="models-popular__title">${catalog[i].title}</div>
				<div class="models-popular__row">
					<div class="models-popular__colomn">
						<div class="models-popular__old">${catalog[i]?.["old price"]}</div>
						<div class="models-popular__new">${catalog[i].price}</div>
					</div>
					<div class="models-popular__modal-info hidden">
						<div class="models-popular__slides"></div>
						<div class="models-popular__character">${catalog[i].character}</div>
						<div class="models-popular__description">${catalog[i].description}</div>
					</div>
					<div class="models-popular__colomn">
						<button class="models-popular__btn modal-open" data-modal="goods-card-modal" type="button"></button>
					</div>
				</div>
			</div>
		</div>
		`);
		for(let a = 0; a < catalog[i].picture.length; a++){
			$$('.models-popular__slides')[i].insertAdjacentHTML("beforeend",
			`<div class="goods-card__dots"><img src="img/catalog/${catalog[i].picture[a]}" alt="popular models"></div>`);
		}
	}
	if($$('.catalog__text').length > 0) renderCardCount();
	return prevCards1 = prevCards1 + step1;
}
		function renderCardCount(){
			$('.catalog__text b').textContent = $$('.models-popular__item').length;
			$('.catalog__text span').textContent = catalog.length;
		}
		function changeSlide(element){
			$$('.goods-card__dots').forEach((item) => item.classList.remove('goods-card__dots_active'));
			if(window.innerWidth >= 767) {
				$('.goods-card__slide-container img').
				setAttribute('src', element.getAttribute('src'));
				event.target.parentElement.classList.add('goods-card__dots_active');
			} else{
				$('.goods-card__slide-container img').
				setAttribute('src', element.querySelector('img').getAttribute('src'));
				event.target.classList.add('goods-card__dots_active');
			}
		}
	}

function slider(el, index, tar){
	counter = 0;
	return function(el, index, tar){
		let element = el.closest('.slider'),
		sTrack = element.querySelector('.slider-track'),
		sContainerW = element.querySelector('.slider-container').offsetWidth,
		sItemW = element.querySelector('.slider-item').offsetWidth,
		sItemsL = element.querySelectorAll('.slider-item').length,
		slides = sContainerW/sItemW;
		if(el.classList.contains('slider-prev')||
			el.classList.contains('slider-prev-main')) counterMinus();
		if(el.classList.contains('slider-next')||
			el.classList.contains('slider-next-main')) counterPlus();
			if(tar != undefined &&
				tar.classList.contains('modal-open')&&
				counter < index){
			for(let i = counter; i < index; i++){
				counterPlus();
			}
		} else if(tar != undefined &&
				tar.classList.contains('modal-open')&&
				counter >= index-1){
			for(let i = counter; i > index; i--){
				counterMinus();
			}
		}
		function counterPlus(){
			if(counter >= sItemsL - Math.round(slides)) return;
			counter++;
			sliderScroll();
		}
			function counterMinus(){
			if(counter <= 0) return;
			counter--;
			sliderScroll();
		}
		function buttonBlock(){
			element.querySelector('.slider-prev').style.opacity = '1.0';
			element.querySelector('.slider-next').style.opacity = '1.0';
			el.style.opacity = '0.5';
		}
		function sliderScroll(){
			let scroll = (sContainerW * counter)/slides;
			sTrack.style.transform = `translateX(-${scroll}px)`;
		}
	}
}
let sliderMove = slider(),
sliderMoveMain = slider();

if($$('#load').length > 0){
$('[type=file]').addEventListener("change", function(){
$('#load').src = URL.createObjectURL($('[type=file]').files[0]);
});
}

