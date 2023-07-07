const cacheName = 'cache-v1';

self.addEventListener('install', function() {
    self.skipWaiting().catch((e) => {
        console.error(e);
    });
});
self.addEventListener('activate', function() {
    console.log('Service worker activated');
});

async function fetchAndCache(event) {
    try {
        const response = await fetch(event.request);
        const responseClone = response.clone();
        const cache = await caches.open(cacheName);
        await cache.put(event.request, responseClone);
        return response;
    } catch (e) {
        return e;
    }
}

async function fetchWithCache(event) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(event.request);
    console.log("Using cache first", event.request.url);
    if (!!response) {
        fetchAndCache(event).then((value) => {
            console.log(value);
        });
        return response;
    } else {
        return fetchAndCache(event);
    }
}

async function networkFirst(event){
        const cache = await caches.open(cacheName);
        return fetch(event.request).then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());
            return fetchedResponse;
        }).catch(() => {
            return cache.match(event.request.url);
        });
}

function handleFetch(event) {
    if (event.request.method === 'GET'&&event.request.mode!=="no-cors") {
        if (event.request.headers.get("cache-control") !== "no-cache" && event.request.url.includes("api.github.com")) {
            event.respondWith(fetchWithCache(event));
        }
        else{
            event.respondWith(networkFirst(event));
        }
    }
}

self.addEventListener("fetch", handleFetch);