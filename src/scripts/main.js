(() => {
	const loader = document.querySelector('.loader');
	
	window.onload = () => {
		setTimeout(function() {
			loader.classList.add('--disable');
			
		}, 1000);
	}
})();