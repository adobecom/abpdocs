import { html } from '../../../../htm-preact/htm-preact.js';

const ACTIVE_PAGE_ICON = html`
  <svg viewBox="0 0 20 20" fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <rect width="16" height="16" id="icon-bound" fill="none"/>
    <path d="M14.706,4.206l-3.913-3.913C10.606,0.106,10.353,0,10.087,0H1v16h14V4.916C15,4.65,14.894,4.394,14.706,4.206z M13,14H3V2h7 v3h3V14z"/> </g>
  </svg>
  
`;

const INACTIVE_PAGE_ICON = html`
  <svg viewBox="0 0 20 20" fill="#d6d1d1" stroke="#d6d1d1" stroke-width="0.00016">
    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <rect width="16" height="16" id="icon-bound" fill="none"/>
    <path d="M14.706,4.206l-3.913-3.913C10.606,0.106,10.353,0,10.087,0H1v16h14V4.916C15,4.65,14.894,4.394,14.706,4.206z M13,14H3V2h7 v3h3V14z"/> </g>
  </svg>
`;

const ACTIVE_PLAY_ICON = html`
<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 38.08 38.08" xml:space="preserve">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <g> <g> <path d="M6.655,36.904V1.177c0-0.461,0.269-0.879,0.687-1.07c0.419-0.191,0.911-0.121,1.26,0.178l22.416,17.568 c0.258,0.223,0.406,0.545,0.41,0.885c0.004,0.326-0.143,0.663-0.396,0.889L8.616,37.784c-0.347,0.31-0.842,0.385-1.265,0.194 C6.927,37.787,6.655,37.368,6.655,36.904z M9.01,3.744v30.535l19.449-15.52L9.01,3.744z"/> </g> </g> </g>
</svg>
`;

const INACTIVE_PLAY_ICON = html`
<svg fill="#d6d1d1" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 38.08 38.08" xml:space="preserve">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <g> <g> <path d="M6.655,36.904V1.177c0-0.461,0.269-0.879,0.687-1.07c0.419-0.191,0.911-0.121,1.26,0.178l22.416,17.568 c0.258,0.223,0.406,0.545,0.41,0.885c0.004,0.326-0.143,0.663-0.396,0.889L8.616,37.784c-0.347,0.31-0.842,0.385-1.265,0.194 C6.927,37.787,6.655,37.368,6.655,36.904z M9.01,3.744v30.535l19.449-15.52L9.01,3.744z"/> </g> </g> </g>
</svg>
`;

const ACTIVE_PLAY_BOOK_ICON = html`
  <svg fill="#000000" viewBox="0 0 32 32" class='hlx-fifty-icon'>
    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <rect width="16" height="16" id="icon-bound" fill="none"/>
    <path d="M26.536 0h-19.937c-1.438 0-2.063 1.063-2.063 2.063v3.979h-1.091c-0.541 0-0.979 0.439-0.979 0.98s0.438 0.98 0.979 0.98h1.091v4.024h-0.998c-0.541 0-0.98 0.438-0.98 0.979s0.438 0.98 0.979 0.98h0.998v4.045h-1.019c-0.541 0-0.979 0.439-0.979 0.98s0.438 0.98 0.979 0.98h1.019v4.014h-1.019c-0.541 0-0.979 0.439-0.979 0.98s0.438 0.98 0.979 0.98h1.019v4.040c0 1.657 1.298 2 2.016 2h19.985c1.657 0 3-1.343 3-3v-26c0-1.657-1.343-3-3-3zM6.535 30l-0-4.040h1.042c0.541 0 0.979-0.439 0.979-0.98s-0.438-0.98-0.979-0.98h-1.042v-4.014h1.042c0.541 0 0.979-0.439 0.979-0.98s-0.438-0.98-0.979-0.98h-1.042v-4.045h1.063c0.541 0 0.98-0.438 0.98-0.98s-0.438-0.979-0.979-0.979h-1.063v-4.024h0.97c0.541 0 0.979-0.439 0.979-0.979s-0.438-0.98-0.979-0.98h-0.97v-3.978c0-0.023 0.002-0.043 0.005-0.060 0.016-0.001 0.035-0.002 0.059-0.002h15.938v28h-16.001zM27.536 29c0 0.552-0.448 1-1 1h-2v-28h2c0.552 0 1 0.448 1 1v26z"/> </g>
  </svg>
`;
const INACTIVE_PLAY_BOOK_ICON = html`
  <svg fill="#d6d1d1" class='hlx-fifty-icon' viewBox="0 0 32 32">
    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="SVGRepo_iconCarrier"> 
    <path d="M26.536 0h-19.937c-1.438 0-2.063 1.063-2.063 2.063v3.979h-1.091c-0.541 0-0.979 0.439-0.979 0.98s0.438 0.98 0.979 0.98h1.091v4.024h-0.998c-0.541 0-0.98 0.438-0.98 0.979s0.438 0.98 0.979 0.98h0.998v4.045h-1.019c-0.541 0-0.979 0.439-0.979 0.98s0.438 0.98 0.979 0.98h1.019v4.014h-1.019c-0.541 0-0.979 0.439-0.979 0.98s0.438 0.98 0.979 0.98h1.019v4.040c0 1.657 1.298 2 2.016 2h19.985c1.657 0 3-1.343 3-3v-26c0-1.657-1.343-3-3-3zM6.535 30l-0-4.040h1.042c0.541 0 0.979-0.439 0.979-0.98s-0.438-0.98-0.979-0.98h-1.042v-4.014h1.042c0.541 0 0.979-0.439 0.979-0.98s-0.438-0.98-0.979-0.98h-1.042v-4.045h1.063c0.541 0 0.98-0.438 0.98-0.98s-0.438-0.979-0.979-0.979h-1.063v-4.024h0.97c0.541 0 0.979-0.439 0.979-0.979s-0.438-0.98-0.979-0.98h-0.97v-3.978c0-0.023 0.002-0.043 0.005-0.060 0.016-0.001 0.035-0.002 0.059-0.002h15.938v28h-16.001zM27.536 29c0 0.552-0.448 1-1 1h-2v-28h2c0.552 0 1 0.448 1 1v26z"/> </g>
  </svg>
`;

const separatorComponent = html`<div className='hlx-scope-border-right'/>`;

function Icons({ handleIconClick, scope, useCaseName }) {
  return html`
    <div className='hlx-icons'>
      <div className=${scope === 'page' ? 'hlx-icon hlx-scope-border-bottom' : 'hlx-icon'} onClick=${() => handleIconClick('page')}>
        <span className='icon'>${(scope === 'page' || scope === '') ? ACTIVE_PAGE_ICON : INACTIVE_PAGE_ICON}</span>
        <span className=${scope === 'page' ? 'hlx-sub-heading hlx-scope-margin' : 'hlx-sub-heading'}> This page </span>
      </div>
      ${(scope === 'page' || scope === 'use-case') && separatorComponent}
      <div className=${scope === 'use-case' ? 'hlx-icon hlx-scope-border-bottom' : 'hlx-icon'} onClick=${() => handleIconClick('use-case')}>
        <span className='icon'>${(scope === 'use-case' || scope === '') ? ACTIVE_PLAY_ICON : INACTIVE_PLAY_ICON}</span>
        <span className=${scope === 'use-case' ? 'hlx-sub-heading hlx-scope-margin' : 'hlx-sub-heading'}>${useCaseName}</span>
      </div>
      ${(scope === 'playbook' || scope === 'use-case') && separatorComponent}
      <div className=${scope === 'playbook' ? 'hlx-icon hlx-scope-border-bottom' : 'hlx-icon'} onClick=${() => handleIconClick('playbook')}>
        <span className='icon'>${(scope === 'playbook' || scope === '') ? ACTIVE_PLAY_BOOK_ICON : INACTIVE_PLAY_BOOK_ICON}</span>
        <span className=${scope === 'playbook' ? 'hlx-sub-heading hlx-playbook-margin hlx-scope-margin' : 'hlx-sub-heading hlx-playbook-margin'}> Playbook Name </span>
      </div>
    </div>
  `;
}

export default Icons;
