declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare interface Window {
  __isMainApp__: boolean;
  __REACT_ERROR_OVERLAY_GLOBAL_HOOK__: any;
  imgCache: { list: string[] };
  __fatherDom__: any;
}
