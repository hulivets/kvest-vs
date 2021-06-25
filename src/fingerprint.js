import Fingerprint2 from 'fingerprintjs2';

// Note from github repo:
// You should not run fingerprinting
// directly on or after page load.
// Rather, delay it for a few milliseconds
// with setTimeout or requestIdleCallback to
// ensure consistent fingerprints.

export const getFingerprint = async () => {
    const options = {
        excludes: {
            // Exclude audio because of IOS11 behaviour
            audio: true,
            // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
            enumerateDevices: true,
            // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
            pixelRatio: true,
            // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
            doNotTrack: true,
            // uses js fonts already
            fontsFlash: true
        }
    };
    const components = await Fingerprint2.getPromise(options);
    const values = components.map(component => component.value);
    const murmurHash = Fingerprint2.x64hash128(values.join(''), 31);

    return murmurHash;
}