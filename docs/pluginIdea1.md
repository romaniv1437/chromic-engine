1.1 Math vizualizer have default scene hyperbolic, this shader incorrcetly takes screen width and height so this why we see shape in left bottom, instead of correct left/middle middle
1.2 when we close and reopen vizualizer, we should restart it correctly from current track and time.
1.3 lyrics we load for tracks, we need to preload or so, so we get lyrics for vizualizer before we open it
1.4 we need to create color pallete from 'image image__lightOutline sc-artwork-4x sc-artwork sc-artwork-placeholder-3 m-loaded', same way as we do in musicplayer.js from our artwork.

2.1 we need to use 'image image__lightOutline sc-artwork-4x sc-artwork sc-artwork-placeholder-3 m-loaded' and 'playbackSoundBadge__titleContextContainer sc-mr-3x' inside of our extension, same way as we have for MusicPlayer.js ( nice layout where image on left side of screen )
2.2 this 'vibe' thing, maybe make some reference to our chromic engine, as its extension from our chromic engine app
2.3 'vibe-launch-btn vibe-floating' this button should be smaller, maybe like half its size, and it not correctly centered, and it should not overlap content, but more like fit inside of 'playControls__soundBadge sc-ml-3x'
2.4 'vibe-debug-badge' vibe debug related stuff should be hidden by default, by activate on some shortcut
2.5 we need to replicate this idle mode, where cursor and some html buttons are hidden, so we only see track artwork + metadata on vizualizer with lyrics ( as now, but vibe-close-btn should go to idle mode for sure )
2.6 we may use 'playControls__elements' not for idle mode, to allow track options while vizualizer is open.