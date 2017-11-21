Fixa RenderTracks
Fixa någon jävla form av anpassbarhet för större skärmar. if screen >= 1200px sätt padding / centrera #root

Plocka ut handleRange() från User-Component för att istället sätta den i state för varje RenderArtist/Track/Album-component. Gör en ny "Config"-component som vardera kan ha för att välja Range och Limit(Hur många items som ska visas i grafen) Göra en egen dropdown istället för <select>?

Se över weeklyFire - verkar inte uppdatera playcount.

Gör en funktion som kollar i recentTracks om [0] är 'isPlaying', isåfall lägg till den låten som "Now playing" i profilen, och slicea av den från recenttracks.


