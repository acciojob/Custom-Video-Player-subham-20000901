/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
	if(video.paused){
		video.play;
	}else{
		video.pause;
	}
}



function updateBtn(){
	const icon = video.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}
function handleProgress(){
	const percent = ((video.currentTime)/(video.duration)) * 100;
	 progressBar.style.flexBasis = `${percent}%`;
}
function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
toggle.addEventListener("click", togglePlay);
 video.addEventListener("play",updateBtn );
 video.addEventListener("pause",updateBtn );

video.addEventListener('timeupdate', handleProgress);

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Volume and playback rate sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Scrub / seek
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Handle video load errors
video.addEventListener('error', () => {
  alert('Video failed to load!');
});



