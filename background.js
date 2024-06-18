chrome.runtime.onMessage.addListener(data => {
    console.log("message arived");
    if (data.type === 'notification') {
      chrome.notifications.create('', data.options);
    }
    if(data.sound){
      chrome.offscreen.createDocument({
        url: chrome.runtime.getURL('audio.html'),
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'notification'
      });
    }
  });