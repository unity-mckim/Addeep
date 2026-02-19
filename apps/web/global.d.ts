declare global {
  interface Window {
    naver: any;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

export {};
