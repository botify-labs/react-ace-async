import { ACE_CDN } from './config';


export function load(callback) {
  if (typeof ace !== 'undefined') {
    //Already loaded
    callback(null, null);
    return;
  }

  let script = document.createElement('script');
  script.src = ACE_CDN;
  script.addEventListener('load', (e) => {
    callback(null, e);
  });
  document.body.appendChild(script);
}
