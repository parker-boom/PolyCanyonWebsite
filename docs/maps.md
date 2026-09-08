# Maps and walking directions

On the Info page, the embedded map marks the Entry Arch. The walking-directions link opens Google Maps with campus as the origin, the Entry Arch as the destination, and walking selected. Written directions remain on the page even if Google is unavailable. Individual structure pages continue to show a destination pin and a location link.

Google documents route embedding through the [Maps Embed API’s directions mode](https://developers.google.com/maps/documentation/embed/embedding-map#directions_mode), with an API key, origin, destination, and `mode=walking`. The existing keyless `maps?q=…&output=embed` preview is a destination map; the documented route parameters belong to the Embed API, not that URL. We have not added an API key or a new hosted service to draw a route inside the page.

[Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started#directions-action) support external walking directions without an API key, using `api=1`, `origin`, `destination`, and `travelmode=walking`. Keeping that link makes directions available without adding account configuration to this site. The tradeoff is that visitors open Google Maps to see the walking route. Both the Info copy and the map caption state this explicitly, before and after the destination map loads.

The preview loads only after “Show map” is selected. Route availability and the paths suggested by Google remain controlled by Google; the site does not calculate or guarantee a walking route.
