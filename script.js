const time = document.getElementsByClassName('time')[0];
const settings = document.getElementsByClassName('settings')[0];
const mixer = document.getElementsByClassName('mixer-container')[0];

function openSettings(){
    settings.style.display = "flex";
    settings.style.flexDirection = "column"
    settings.style.justifyContent = "space-between"
    time.style.display = "none";
    mixer.style.display = "none";
}

function openMixer(){
    settings.style.display = "none";
    time.style.display = "none";
    mixer.style.display = "block";
}

const timersBtn = document.getElementById('timers-button');
const timersOptions = document.getElementById('timers-options');
const alertsBtn = document.getElementById('alerts-button')
const alertsOptions = document.getElementById('alerts-options');

function openTimers(){
    timersBtn.style.textDecoration = "underline";
    alertsBtn.style.textDecoration = "none";
    timersOptions.style.display = "flex";
    alertsOptions.style.display= "none";
}

timersBtn.addEventListener('click',openTimers);

function openAlerts(){
    timersBtn.style.textDecoration = "none";
    alertsBtn.style.textDecoration = "underline";
    timersOptions.style.display = "none";
    alertsOptions.style.display= "flex";
}

alertsBtn.addEventListener('click',openAlerts);

function exit(){
    settings.style.display = "none";
    time.style.display = "flex";
    mixer.style.display = "none";
}
const settingClick = document.getElementsByClassName('setting-contianer')[0];
const exitClick = document.querySelectorAll('.exit-container');
const mixerClick = document.getElementsByClassName('mixer')[0];

exitClick.forEach(element => {
    element.addEventListener('click', exit);
});
settingClick.addEventListener('click',openSettings);
mixerClick.addEventListener('click',openMixer)


// on-off toggle //

const toggleButton = document.querySelectorAll('.on-off-toggle')
const birdAudio = document.getElementById('bird-sound')
const keyboardAudio = document.getElementById('keyboard');

toggleButton.forEach(elm => {
    elm.addEventListener('click', button => {
        const currentButton = button.target.closest('.on-off-toggle');
        if(currentButton.classList.contains('active')){
          currentButton.classList.remove('active');
          
        } else {
          currentButton.classList.add('active');  
          
        }
        
        //adding functionality to each button
        if(currentButton.id === 'bird' && currentButton.classList.contains('active')){
          birdAudio.play();
        } else if (currentButton.id === 'bird' && !currentButton.classList.contains('active')){
          birdAudio.pause();
        }

        if(currentButton.id === 'keyboard-button' && currentButton.classList.contains('active')){
          keyboardAudio.play();
        } else if (currentButton.id === 'keyboard-button' && !currentButton.classList.contains('active')) {
          keyboardAudio.pause();
        }
    })
    
})

// ---drop down menu --- //
document.addEventListener('click', e => {
    const isDropDownButton = e.target.matches("[data-dropdown-button]");

    if(!isDropDownButton){
      return
    }

    if (isDropDownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    } else {
      currentDropdown.classList.toggle('active');
    }
    
    

});

const selectDropDown = document.querySelector('.select-btn')
// drop down content //
const dropDownContent = document.querySelectorAll('.dropdown-content')

//alert sounds//
const alarm = document.getElementById('alarm')
const chirp = document.getElementById('chirp')
const chime = document.getElementById('chime')
const bell = document.getElementById('bell')



dropDownContent.forEach((elm) => {
    elm.addEventListener('click', content => {
        const clickedElement = content.target.closest('.dropdown-content'); //activates clicked content div
        clickedElement.classList.add('active');
        const clickedElementId = clickedElement.id;
        selectDropDown.innerHTML = clickedElement.innerHTML;
        switch(clickedElementId){ //plays sound when selected
          case 'dd-alarm':
            alarm.play();
            alertSound = 'alarm'
            break;
          case 'dd-chime':
            chime.play();
            alertSound = 'chime'
            break;
          case 'dd-bell':
            bell.play();
            alertSound = 'bell'
            break;
          case 'dd-chirp':
            chirp.play();
            alertSound = 'chirp'
            break;
        }

        let currentDropDown = content.target.closest('.dropdown-content.active'); //adds background to selected content
        document.querySelectorAll('.dropdown-content.active').forEach(element => {
        if (element === currentDropDown) return; // deselects other content 
        element.classList.remove('active');
        })
    })
})

//--- Music Section -- //
const musicContainer = document.querySelector('.music-container');

musicContainer.addEventListener('click', (event) => {
    const isPopoutClicked = event.target.closest('.popout');
    if (!isPopoutClicked) {
        musicContainer.classList.toggle('active');
        const toggleValue = musicContainer.getAttribute('data-toggle') === 'false' ? 'true' : 'false';
        musicContainer.setAttribute('data-toggle', toggleValue);
    }

    
});

// elements for play & pause button
const playButton = document.getElementById('play');
const bars = document.querySelectorAll('.bar')
const shortBar1 =document.getElementById('short1')
const shortBar2 = document.getElementById('short2')
const lofi = document.getElementById('lofi');

//event listener for play & pause button
playButton.addEventListener('click', play => {
  const button = play.target;
  if(button.classList.contains('play')){
    button.classList.remove('play');
    button.classList.add('pause');

    //plays lofi
    lofi.play();

  } else {
    button.classList.add('play');
    button.classList.remove('pause');
    lofi.pause();
  }


  //For dancing music animation

  //Changes height of bars for animation
  if(shortBar1.classList.contains('short')&&shortBar2.classList.contains('short')){
    shortBar1.classList.remove('short');
    shortBar2.classList.remove('short');
  } else {
    shortBar1.classList.add('short');
    shortBar2.classList.add('short');
  }

  //actually calling animation
  bars.forEach(elm => {
    
    if(elm.classList.contains('animate')){
        elm.classList.remove('animate')
    } else {
        elm.classList.add('animate')
    }
    
  })
})


// --- Volume control and speaker icon interactivity ----
//elements for music sounds
const speakerButton = document.getElementById('speaker');

speakerButton.addEventListener('click', speaker => {
  const button = speaker.target;
  if(button.classList.contains('sound-icon')){ //checks to see if muted or not
    button.classList.remove('sound-icon');
    button.classList.add('mute');
    lofi.volume = 0;
  } else {
    button.classList.add('sound-icon');
    button.classList.remove('mute');
    lofi.volume = parseFloat(musicVolume.value);
  }
  
})





//volume sliders
const volumeSlider = document.querySelectorAll('.volume');

volumeSlider.forEach(elm => {
    elm.addEventListener('mousemove', event => {
        const currentSlider = event.target.closest('.volume');
        let x = currentSlider.value * 100;
        let color = `linear-gradient(90deg, white ${x}%, #B5B5B5 ${x}%)`
        currentSlider.style.background = color;


        //changes volume for their sounds
        if(elm.id === "music-volume-slider"){
          lofi.volume = parseFloat(elm.value)
        }

        if(elm.id === "keyboard-slider"){
          keyboardAudio.volume = parseFloat(elm.value)
        }

        if(elm.id === "bird-slider"){
          lofi.volume = parseFloat(elm.value)
        }

        if(elm.id === "alert-slider"){
          chirp.volume = parseFloat(elm.value)
          alarm.volume = parseFloat(elm.value)
          bell.volume = parseFloat(elm.value)
          chime.volume = parseFloat(elm.value)
        }
    });

    //for mobile
    elm.addEventListener('touchmove', event => {
      const currentSlider = event.target.closest('.volume');
      let x = currentSlider.value * 100;
      let color = `linear-gradient(90deg, white ${x}%, #B5B5B5 ${x}%)`
      currentSlider.style.background = color;

      if(elm.id === "music-volume-slider"){
        lofi.volume = parseFloat(elm.value)
      }

      if(elm.id === "keyboard-slider"){
        keyboardAudio.volume = parseFloat(elm.value)
      }

      if(elm.id === "bird-slider"){
        lofi.volume = parseFloat(elm.value)
      }
  });
});

let alertSound = 'chime'




//timing function
const focusBtn = document.getElementById('focus-btn');
const breakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const minutesDisplay = document.getElementById('minutes') 
const secondsDisplay = document.getElementById('seconds')

let workTime = minutesDisplay.innerHTML
let breakTime = 5
let longBreakTime = 15
let seconds = parseFloat(secondsDisplay.innerHTML)

function updateTimes () {
  if(timersOptions.style.display === 'none') return
  minutesDisplay.innerHTML = parseFloat(document.getElementById('focus-input').value);
  secondsDisplay.innerHTML = "00";
  breakCount = 0;
  startButton.classList.remove('active');
  focusBtn.classList.add('active')
  breakBtn.classList.remove('active')
  longBreakBtn.classList.remove('active')
  clearTimer()
}

let intervalId
let breakCount = 0;
let prevBreakCount = -1;

function playSound (sound){
    if(!alertToggle.classList.contains('active')) return


    switch(sound){
      case 'chime':
        chime.play();
        break;
      case 'alarm':
        alarm.play();
        break;
      case 'bell':
        bell.play();
        break;
      case 'chirp':
        chirp.play();
        break;
    }
}

function start() {

  if(secondsDisplay.innerHTML === "00"){
    seconds = 0;
  }

  if(parseFloat(seconds) == 00){
    seconds = 59;
  } else {
    seconds = parseFloat(secondsDisplay.innerHTML)
  }
  
  workTime = minutesDisplay.innerHTML;
  breakTime = parseFloat(document.getElementById('short-input').value);
  longBreakTime = parseFloat(document.getElementById('long-input').value);
  let workMinutes

  if(parseFloat(workTime) === parseFloat(document.getElementById('long-input').value && breakCount > 0 && breakCount % 6 === 0 )){
    workMinutes = workTime-1;
  } else if(parseFloat(workTime) === parseFloat(document.getElementById('focus-input').value)){
    workMinutes = workTime-1;
  } else {
    workMinutes = workTime;
  }
  
  let breakMinutes = breakTime - 1; 
  let longBreakMinutes = longBreakTime -1;
  

  // countdown
  let timerFunction = () => {
      

      // start
      
      document.getElementById('minutes').innerHTML = workMinutes;
      
      
      if(seconds < 10){
        document.getElementById('seconds').innerHTML = `0${seconds}`;
      } else {
        document.getElementById('seconds').innerHTML = seconds;
      }
      seconds = seconds - 1;
      if (seconds === 0) {
        workMinutes = workMinutes - 1;
        if (workMinutes === -1) {
          if (breakCount > 0 && breakCount % 6 === 0) {
            focusBtn.classList.remove('active');
            longBreakBtn.classList.add('active');
            // start long break on every 4th interval
            workMinutes = longBreakMinutes;
            breakCount++;
            prevBreakCount++;
            // change the panel
            playSound(alertSound)
          } else if (breakCount % 2 === 0) {
            focusBtn.classList.remove('active');
            breakBtn.classList.add('active');
            // start break
            workMinutes = breakMinutes;
            breakCount++;
            prevBreakCount++;
            // change the panel
            playSound(alertSound)
          } else {
            longBreakBtn.classList.remove('active');
            breakBtn.classList.remove('active');
            focusBtn.classList.add('active');
            // continue work
            workMinutes = parseFloat(document.getElementById('focus-input').value) - 1;
            breakCount++;
            prevBreakCount++;
            // change the panel
            playSound(alertSound)
          }
        }
        seconds = 59;
      }
  }

  // start countdown
  intervalId = setInterval(timerFunction, 1000); // 1000 = 1s
 
}

function clearTimer (){
  clearInterval(intervalId)
}
const resetIcon = document.getElementById('reset-icon')

resetIcon.addEventListener('click',() => {
  clearTimer()
  updateTimes()
} );

//reset and start icons

const startButton = document.querySelector('.start');

startButton.addEventListener('click', event => {
  const button = event.target;
  if(button.classList.contains('active')){
    button.classList.toggle('active');
    clearTimer()
  } else {
    button.classList.toggle('active');
    start()
  }
})




//changes time on input of new times in settings 

// function changeDisplayTime(){
//   workTime = parseFloat(document.getElementById('focus-input').value)
//   breakTime = parseFloat(document.getElementById('short-input').value)
//   longBreakTime = 15;
//   document.getElementById('minutes').innerHTML = workTime;
// }

const phaseButtons = document.querySelectorAll('.phase');

// phaseButtons.forEach(elm => {
//   elm.addEventListener('click', event => {
//     const currentButton = event.target.closest('.phase');
//     document.querySelectorAll('.phase.active').forEach( active => { // unactivates other buttons 
//       if(active === currentButton){
//         return 
//       } else {
//         active.classList.remove('active')
//       }
//     });
//     if(!currentButton.classList.contains('active')){
//       currentButton.classList.add('active');
//     }
//     if(currentButton.classList.contains('active') && currentButton.id === "focus-btn"){
//       workTime = parseFloat(document.getElementById('focus-input').value);
//       minutesDisplay.innerHTML = workTime
//     } else if(currentButton.classList.contains('active') && currentButton.id === "short-break-btn"){
//       breakTime = parseFloat(document.getElementById('short-input').value);
//       minutesDisplay.innerHTML = breakTime
//     } else if(currentButton.classList.contains('active') && currentButton.id === "long-break-btn"){
//       longBreakTime = parseFloat(document.getElementById('long-input').value);
//       minutesDisplay.innerHTML = longBreakTime
//     }
//   })

// })

// settings save changes

const alertToggle = document.getElementById('alert-toggle')

//reset button 

function reset (){
  dropDownContent.forEach(elm => {
    elm.classList.remove('active')
  })
  toggleButton.forEach(elm => {
    elm.classList.remove('active')
  })
  alertToggle.classList.add('active')
  const volumes = document.querySelectorAll('input[type="range"')
  volumes.forEach(elm => {
    elm.value = 0.5;
  })


  
}