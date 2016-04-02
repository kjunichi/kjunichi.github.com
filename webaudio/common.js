"use strict"

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

var width = 1023;
var height = 256;

function initialize() {

  const audioElement = document.getElementById("audio");
  const frequencyElement = document.getElementById("frequency");
  const timeDomainElement = document.getElementById("timedomain");
  const frequencyContext = frequencyElement.getContext("2d");
  const timeDomainContext = timeDomainElement.getContext("2d");
  const keyElm = document.getElementById("key");
  const keynameElm = document.getElementById("keyname");

  frequencyElement.width = width;
  frequencyElement.height = height;
  timeDomainElement.width = width;
  timeDomainElement.height = height;
  //audioContext.sampleRate * i / analyser.fftSize = f
  navigator.getUserMedia({
      audio: true
    },
    (stream) => {

      var url = URL.createObjectURL(stream);
      //audioElement.src = url;
      const audioContext = new AudioContext();
      console.log("audioContext.sampleRate = " + audioContext.sampleRate);
      var mediastreamsource = audioContext.createMediaStreamSource(stream);
      var analyser = audioContext.createAnalyser();
      analyser.fftSize = 16384;
      var frequencyData = new Uint8Array(analyser.frequencyBinCount);
      var timeDomainData = new Uint8Array(analyser.frequencyBinCount);
      mediastreamsource.connect(analyser);

      var animation = () => {

        analyser.getByteFrequencyData(frequencyData);
        analyser.getByteTimeDomainData(timeDomainData);

        frequencyContext.clearRect(0, 0, width, height);
        frequencyContext.beginPath();
        frequencyContext.moveTo(0, height - frequencyData[0]);
        let maxFi = 0;
        let maxF = 0;
        for (var i = 1, l = frequencyData.length; i < l; i++) {
          if (maxF < frequencyData[i]) {
            maxF = frequencyData[i];
            maxFi = i;
          }
          frequencyContext.lineTo(i, height - frequencyData[i]);
        }

        function normalF(f) {
          if (f == 0) {
            return;
          }
          while (f > 520) {
            f = f / 2;
          }
          while (f < 250) {
            f = f * 2;
          }
          return f;
        }
        //audioContext.sampleRate * i / analyser.fftSize = f
        const keyFrq = normalF(audioContext.sampleRate * maxFi / analyser.fftSize);

        if (keyFrq > 520 || keyFrq < 250) {
          keyFrq = normalF(keyFrq);
        }
        keyElm.innerHTML = audioContext.sampleRate * maxFi / analyser.fftSize;
        const cmod = Math.abs(keyFrq - 262);
        const dmod = Math.abs(keyFrq - 294);
        const emod = Math.abs(keyFrq - 330);
        const fmod = Math.abs(keyFrq - 349);
        const gmod = Math.abs(keyFrq - 392);
        const amod = Math.abs(keyFrq - 440);
        const bmod = Math.abs(keyFrq - 494);

        if (cmod < dmod && cmod < emod && cmod < fmod && cmod < gmod && cmod < amod && cmod < bmod) {
          keynameElm.innerHTML = "C";
        } else {
          if (dmod < emod && dmod < fmod && dmod < gmod && dmod < amod && dmod < bmod) {
            keynameElm.innerHTML = "D";
          } else {
            if (emod < fmod && emod < gmod && emod < amod && emod < bmod) {
              keynameElm.innerHTML = "E";
            } else {
              if (fmod < gmod && fmod < amod && fmod < bmod) {
                keynameElm.innerHTML = "F";
              } else {
                if (gmod < amod && gmod < bmod) {
                  keynameElm.innerHTML = "G";
                } else {
                  if (gmod < bmod) {
                    keynameElm.innerHTML = "A";
                  } else {
                    keynameElm.innerHTML = "B";
                  }
                }
              }
            }
          }
        }

        frequencyContext.stroke();
        frequencyContext.beginPath();
        frequencyContext.moveTo(maxFi, 0);
        frequencyContext.lineTo(maxFi, height);
        frequencyContext.stroke();

        timeDomainContext.clearRect(0, 0, width, height);
        timeDomainContext.beginPath();
        timeDomainContext.moveTo(0, height - timeDomainData[0]);
        for (var i = 1, l = timeDomainData.length; i < l; i++) {
          timeDomainContext.lineTo(i, height - timeDomainData[i]);
        }
        timeDomainContext.stroke();

        requestAnimationFrame(animation);

      };

      animation();

    },
    function(e) {
      console.log(e);
    }
  );

}

window.addEventListener("load", initialize, false);
