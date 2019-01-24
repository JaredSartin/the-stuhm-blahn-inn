// Define
window.Detector = {};
var Detector = window.Detector;

// shortcut for user agent
var ua = navigator.userAgent || navigator.vendor || window.opera;

// ios
Detector.isIpad = !!ua.match(/iPad/i);
Detector.isIphone = !!ua.match(/iPhone/i);
Detector.isIpod = !!ua.match(/iPod/i);
Detector.isIOS = Detector.isIpad || Detector.isIphone || Detector.isIpod;
Detector.isIOS5 = !!ua.match(/OS 5(_\d)+ like Mac OS X/i);
Detector.isIOS6 = !!ua.match(/OS 6(_\d)+ like Mac OS X/i);
Detector.isIOS7 = !!ua.match(/OS 7(_\d)+ like Mac OS X/i);
Detector.isIOS8 = !!ua.match(/OS 8(_\d)+ like Mac OS X/i);
Detector.isIOS9 = !!ua.match(/OS 9(_\d)+ like Mac OS X/i);
Detector.isIOS11 = !!ua.match(/OS 11(_\d)+ like Mac OS X/i);
Detector.isIOS12 = !!ua.match(/OS 12(_\d)+ like Mac OS X/i);
Detector.IOSVersion = (() => {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(v[1], 10);
  } else {
    return false;
  }
})();

// android
Detector.isAndroid = !!ua.match(/Android/i);
Detector.isAndroidOld = !!(
  Detector.isAndroid && parseFloat(ua.slice(ua.indexOf('Android') + 8)) < 4
);
Detector.isAndroidStock = (() => {
  var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
  var resultAppleWebKitRegEx = regExAppleWebKit.exec(ua);
  var appleWebKitVersion =
    resultAppleWebKitRegEx === null
      ? null
      : parseFloat(regExAppleWebKit.exec(ua)[1]);
  var isAndroidBrowser =
    Detector.isAndroid &&
    appleWebKitVersion !== null &&
    appleWebKitVersion < 537;
  return isAndroidBrowser;
})();

// device
Detector.isTabvar =
  (Detector.isAndroid || Detector.isIOS) &&
  // eslint-disable-next-line
  /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(
    ua.toLowerCase()
  ); //eslint-disable-line
Detector.isMobile =
  (Detector.isAndroid || Detector.isIOS) &&
  // eslint-disable-next-line
  /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(
    ua.toLowerCase()
  );
Detector.isDesktop = !Detector.isTabvar && !Detector.isMobile;
Detector.device = Detector.isTabvar
  ? 'tablet'
  : Detector.isMobile ? 'mobile' : 'desktop';

// ie
Detector.IEVersion = (() => {
  var rv = -1;
  var re;
  if (navigator.appName === 'Microsoft Internet Explorer') {
    re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
    if (re.exec(ua) !== null) {
      rv = parseFloat(RegExp.$1);
    }
  } else if (navigator.appName === 'Netscape') {
    re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
    if (re.exec(ua) !== null) {
      rv = parseFloat(RegExp.$1);
    }
  }
  return rv;
})();
Detector.isEdge = /Edge\/\d./i.test(ua);
Detector.isIE = Detector.IEVersion > -1 || Detector.isEdge;
Detector.isIE11 = Detector.IEVersion === 11;
Detector.isIE11Down = Detector.isIE && Detector.IEVersion <= 11;
Detector.isIE11Up = Detector.isIE && Detector.IEVersion >= 11;
Detector.isIE10 = Detector.IEVersion === 10;
Detector.isIE10Down = Detector.isIE && Detector.IEVersion <= 10;
Detector.isIE10Up = Detector.isIE && Detector.IEVersion >= 10;
Detector.isIE9 = Detector.IEVersion === 9;
Detector.isIE9Down = Detector.isIE && Detector.IEVersion <= 9;
Detector.isIE9Up = Detector.isIE && Detector.IEVersion >= 9;
Detector.isIE8 = Detector.IEVersion === 8;
Detector.isIE8Down = Detector.isIE && Detector.IEVersion <= 8;
Detector.isIE8Up = Detector.isIE && Detector.IEVersion >= 8;

// firefox
Detector.isFirefox = ua.toLowerCase().indexOf('firefox') > -1;

// chrome
Detector.isChrome = (() => {
  let isChromium = window.chrome;
  let vendorName = window.navigator.vendor;
  return (
    isChromium !== null &&
    isChromium !== undefined &&
    vendorName === 'Google Inc.'
  );
})();

// safari
Detector.isSafari = /^((?!chrome).)*safari/i.test(ua);

Detector.hasTouch = Boolean(
  'ontouchstart' in window ||
    window.navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0 ||
    (window.DocumentTouch && document instanceof DocumentTouch)
);

Detector.pixelRatio = window.devicePixelRatio || 1;
Detector.isRetina = Detector.pixelRatio > 1;

Detector.webp = Detector.isChrome && !Detector.isSafari;


Detector.hasCanvas = !!window.CanvasRenderingContext2D;
Detector.hasWebgl = (() => {
  try {
    var canvas = document.createElement('canvas');
    return !!(
      !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
})();

export default window.Detector;
