let activeOwnerId = null;
let activeElement = null;

export const stopVideo = (el) => {
  if (!el) return;
  try {
    el.pause();
    el.muted = true;
    el.volume = 0;
  } catch {
    // ignore teardown errors
  }
};

export const pauseAllVideos = () => {
  document.querySelectorAll('video').forEach((el) => stopVideo(el));
};

const stopOtherVideos = (keep) => {
  document.querySelectorAll('video').forEach((el) => {
    if (el !== keep) stopVideo(el);
  });
};

export const claimHeroVideo = (ownerId, el) => {
  if (activeElement && activeElement !== el) {
    stopVideo(activeElement);
  }
  stopOtherVideos(el);
  activeOwnerId = ownerId;
  activeElement = el;
};

export const releaseHeroVideo = (ownerId, el) => {
  if (activeOwnerId !== ownerId) return;
  stopVideo(el);
  activeOwnerId = null;
  activeElement = null;
};
